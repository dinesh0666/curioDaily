export interface User {
  id: string;
  name: string;
  interests: InterestCategory[];
  preferredChallengeTime: string;
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: InterestCategory;
  type: ChallengeType;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  steps?: string[];
}

export interface CompletedChallenge {
  challengeId: string;
  completedAt: string;
  skipped: boolean;
  notes?: string;
}

export interface UserProgress {
  currentStreak: number;
  longestStreak: number;
  totalChallengesCompleted: number;
  totalChallengesSkipped: number;
  completedChallenges: CompletedChallenge[];
  lastChallengeDate: string;
  completedChallengeIds: string[];
  difficultyPreference: 'adaptive' | 'easy' | 'medium' | 'hard';
  streakMilestones: number[];
  weeklyStats: WeeklyStats[];
}

export interface WeeklyStats {
  weekStart: string;
  completed: number;
  skipped: number;
  categories: Record<InterestCategory, number>;
  difficulties: Record<'easy' | 'medium' | 'hard', number>;
}

export type InterestCategory = 
  | 'Photography'
  | 'Languages'
  | 'Cooking'
  | 'Fitness'
  | 'Art'
  | 'Science'
  | 'Music'
  | 'Writing'
  | 'Travel'
  | 'Technology';

export type ChallengeType = 
  | 'Learn Something New'
  | 'Try This'
  | 'Create'
  | 'Explore';

export interface AppState {
  user: User | null;
  progress: UserProgress;
  todaysChallenge: Challenge | null;
  isOnboarded: boolean;
}
