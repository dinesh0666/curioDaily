import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, User, UserProgress, Challenge, InterestCategory } from '../types';
import { storageUtils } from '../utils/storage';
import { getRandomChallenge } from '../data/challenges';
import { generateUUID } from '../utils/uuid';

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_PROGRESS'; payload: UserProgress }
  | { type: 'SET_TODAYS_CHALLENGE'; payload: Challenge }
  | { type: 'COMPLETE_CHALLENGE'; payload: { challengeId: string; skipped: boolean; notes?: string } }
  | { type: 'SET_ONBOARDED'; payload: boolean }
  | { type: 'GENERATE_NEW_CHALLENGE' }
  | { type: 'LOAD_INITIAL_STATE' };

const initialState: AppState = {
  user: null,
  progress: {
    currentStreak: 0,
    longestStreak: 0,
    totalChallengesCompleted: 0,
    totalChallengesSkipped: 0,
    completedChallenges: [],
    lastChallengeDate: '',
    completedChallengeIds: [],
    difficultyPreference: 'adaptive' as const,
    streakMilestones: [],
    weeklyStats: []
  },
  todaysChallenge: null,
  isOnboarded: false
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    
    case 'SET_TODAYS_CHALLENGE':
      return { ...state, todaysChallenge: action.payload };
    
    case 'COMPLETE_CHALLENGE':
      if (!state.todaysChallenge) return state;
      
      storageUtils.completeChallenge(
        action.payload.challengeId,
        action.payload.skipped,
        action.payload.notes
      );
      
      const updatedProgress = storageUtils.getProgress();
      return { ...state, progress: updatedProgress };
    
    case 'SET_ONBOARDED':
      return { ...state, isOnboarded: action.payload };
    
    case 'GENERATE_NEW_CHALLENGE':
      if (!state.user) return state;
      
      const newChallenge = getRandomChallenge(state.user.interests);
      storageUtils.saveTodaysChallenge(newChallenge);
      return { ...state, todaysChallenge: newChallenge };
    
    case 'LOAD_INITIAL_STATE':
      const user = storageUtils.getUser();
      const progress = storageUtils.getProgress();
      const todaysChallenge = storageUtils.getTodaysChallenge();
      const isOnboarded = storageUtils.isOnboarded();
      
      return {
        user,
        progress,
        todaysChallenge,
        isOnboarded
      };
    
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    setUser: (user: User) => void;
    completeChallenge: (challengeId: string, skipped?: boolean, notes?: string) => void;
    generateNewChallenge: () => void;
    setOnboarded: (status: boolean) => void;
    createUser: (name: string, interests: InterestCategory[], preferredTime: string) => void;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOAD_INITIAL_STATE' });
  }, []);

  // Generate today's challenge if user exists but no challenge is set
  useEffect(() => {
    if (state.user && !state.todaysChallenge && state.isOnboarded) {
      dispatch({ type: 'GENERATE_NEW_CHALLENGE' });
    }
  }, [state.user, state.todaysChallenge, state.isOnboarded]);

  const actions = {
    setUser: (user: User) => {
      storageUtils.saveUser(user);
      dispatch({ type: 'SET_USER', payload: user });
    },

    completeChallenge: (challengeId: string, skipped: boolean = false, notes?: string) => {
      dispatch({ type: 'COMPLETE_CHALLENGE', payload: { challengeId, skipped, notes } });
    },

    generateNewChallenge: () => {
      dispatch({ type: 'GENERATE_NEW_CHALLENGE' });
    },

    setOnboarded: (status: boolean) => {
      storageUtils.setOnboarded(status);
      dispatch({ type: 'SET_ONBOARDED', payload: status });
    },

    createUser: (name: string, interests: InterestCategory[], preferredTime: string) => {
      const newUser: User = {
        id: generateUUID(),
        name,
        interests,
        preferredChallengeTime: preferredTime,
        createdAt: new Date().toISOString()
      };
      
      storageUtils.saveUser(newUser);
      storageUtils.setOnboarded(true);
      
      dispatch({ type: 'SET_USER', payload: newUser });
      dispatch({ type: 'SET_ONBOARDED', payload: true });
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
