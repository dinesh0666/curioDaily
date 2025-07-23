import { User, UserProgress, Challenge, CompletedChallenge } from '../types';

const STORAGE_KEYS = {
  USER: 'curio-daily-user',
  PROGRESS: 'curio-daily-progress',
  TODAYS_CHALLENGE: 'curio-daily-todays-challenge',
  LAST_CHALLENGE_DATE: 'curio-daily-last-challenge-date',
  IS_ONBOARDED: 'curio-daily-onboarded'
};

export const storageUtils = {
  // User management
  saveUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  },

  // Progress management
  saveProgress: (progress: UserProgress): void => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },

  getProgress: (): UserProgress => {
    const progressData = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (progressData) {
      return JSON.parse(progressData);
    }
    
    // Default progress for new users
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalChallengesCompleted: 0,
      totalChallengesSkipped: 0,
      completedChallenges: [],
      lastChallengeDate: ''
    };
  },

  // Challenge management
  saveTodaysChallenge: (challenge: Challenge): void => {
    localStorage.setItem(STORAGE_KEYS.TODAYS_CHALLENGE, JSON.stringify(challenge));
    localStorage.setItem(STORAGE_KEYS.LAST_CHALLENGE_DATE, new Date().toDateString());
  },

  getTodaysChallenge: (): Challenge | null => {
    const lastChallengeDate = localStorage.getItem(STORAGE_KEYS.LAST_CHALLENGE_DATE);
    const today = new Date().toDateString();
    
    // If it's a new day, return null to generate a new challenge
    if (lastChallengeDate !== today) {
      return null;
    }
    
    const challengeData = localStorage.getItem(STORAGE_KEYS.TODAYS_CHALLENGE);
    return challengeData ? JSON.parse(challengeData) : null;
  },

  // Onboarding status
  setOnboarded: (status: boolean): void => {
    localStorage.setItem(STORAGE_KEYS.IS_ONBOARDED, JSON.stringify(status));
  },

  isOnboarded: (): boolean => {
    const onboardedData = localStorage.getItem(STORAGE_KEYS.IS_ONBOARDED);
    return onboardedData ? JSON.parse(onboardedData) : false;
  },

  // Complete challenge
  completeChallenge: (challengeId: string, skipped: boolean = false, notes?: string): void => {
    const progress = storageUtils.getProgress();
    const today = new Date().toISOString().split('T')[0];
    
    const completedChallenge: CompletedChallenge = {
      challengeId,
      completedAt: new Date().toISOString(),
      skipped,
      notes
    };
    
    // Add to completed challenges
    progress.completedChallenges.push(completedChallenge);
    
    // Update stats
    if (skipped) {
      progress.totalChallengesSkipped++;
      // Reset streak if skipped
      progress.currentStreak = 0;
    } else {
      progress.totalChallengesCompleted++;
      
      // Update streak
      const lastChallengeDate = progress.lastChallengeDate;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];
      
      if (!lastChallengeDate || lastChallengeDate === yesterdayString) {
        progress.currentStreak++;
      } else {
        progress.currentStreak = 1;
      }
      
      // Update longest streak
      if (progress.currentStreak > progress.longestStreak) {
        progress.longestStreak = progress.currentStreak;
      }
    }
    
    progress.lastChallengeDate = today;
    storageUtils.saveProgress(progress);
  },

  // Get weekly progress
  getWeeklyProgress: (): { completed: number; skipped: number; total: number } => {
    const progress = storageUtils.getProgress();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weekChallenges = progress.completedChallenges.filter(
      challenge => new Date(challenge.completedAt) >= oneWeekAgo
    );
    
    const completed = weekChallenges.filter(c => !c.skipped).length;
    const skipped = weekChallenges.filter(c => c.skipped).length;
    
    return {
      completed,
      skipped,
      total: completed + skipped
    };
  },

  // Clear all data (for testing/reset)
  clearAllData: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};
