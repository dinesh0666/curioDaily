import { Challenge, InterestCategory, UserProgress } from '../types';
import { challengeDatabase } from '../data/challenges';

export interface SmartChallengeOptions {
  interests: InterestCategory[];
  completedChallengeIds: string[];
  difficultyPreference: 'adaptive' | 'easy' | 'medium' | 'hard';
  currentStreak: number;
  totalCompleted: number;
}

export const getSmartChallenge = (options: SmartChallengeOptions): Challenge => {
  const { interests, completedChallengeIds, difficultyPreference, currentStreak, totalCompleted } = options;
  
  // Filter challenges by user interests
  let availableChallenges = challengeDatabase.filter(
    challenge => interests.includes(challenge.category)
  );

  // Remove recently completed challenges (avoid repetition)
  const recentlyCompleted = completedChallengeIds.slice(-Math.min(20, Math.floor(challengeDatabase.length * 0.3)));
  availableChallenges = availableChallenges.filter(
    challenge => !recentlyCompleted.includes(challenge.id)
  );

  // If we've exhausted non-repeated challenges, allow older ones
  if (availableChallenges.length === 0) {
    availableChallenges = challengeDatabase.filter(
      challenge => interests.includes(challenge.category)
    );
  }

  // Apply difficulty filtering based on preference
  let difficultyFiltered = availableChallenges;
  
  if (difficultyPreference === 'adaptive') {
    // Adaptive difficulty based on user progress
    const adaptiveDifficulty = getAdaptiveDifficulty(currentStreak, totalCompleted);
    difficultyFiltered = availableChallenges.filter(
      challenge => challenge.difficulty === adaptiveDifficulty
    );
    
    // Fallback if no challenges match adaptive difficulty
    if (difficultyFiltered.length === 0) {
      difficultyFiltered = availableChallenges;
    }
  } else if (difficultyPreference !== 'adaptive') {
    const filtered = availableChallenges.filter(
      challenge => challenge.difficulty === difficultyPreference
    );
    if (filtered.length > 0) {
      difficultyFiltered = filtered;
    }
  }

  // Ensure variety in challenge types
  const challengeTypes = ['Learn Something New', 'Try This', 'Create', 'Explore'];
  const recentTypes = getRecentChallengeTypes(completedChallengeIds.slice(-5));
  const underrepresentedTypes = challengeTypes.filter(type => !recentTypes.includes(type));
  
  if (underrepresentedTypes.length > 0) {
    const typeFiltered = difficultyFiltered.filter(
      challenge => underrepresentedTypes.includes(challenge.type)
    );
    if (typeFiltered.length > 0) {
      difficultyFiltered = typeFiltered;
    }
  }

  // Ensure category variety
  const recentCategories = getRecentChallengeCategories(completedChallengeIds.slice(-3));
  const underrepresentedCategories = interests.filter(category => !recentCategories.includes(category));
  
  if (underrepresentedCategories.length > 0) {
    const categoryFiltered = difficultyFiltered.filter(
      challenge => underrepresentedCategories.includes(challenge.category)
    );
    if (categoryFiltered.length > 0) {
      difficultyFiltered = categoryFiltered;
    }
  }

  // Select random challenge from filtered options
  const selectedChallenge = difficultyFiltered[Math.floor(Math.random() * difficultyFiltered.length)];
  
  return selectedChallenge || challengeDatabase[Math.floor(Math.random() * challengeDatabase.length)];
};

const getAdaptiveDifficulty = (currentStreak: number, totalCompleted: number): 'easy' | 'medium' | 'hard' => {
  // Start with easy challenges for new users
  if (totalCompleted < 5) return 'easy';
  
  // Progress to medium after some experience
  if (totalCompleted < 15 || currentStreak < 7) return 'medium';
  
  // Introduce hard challenges for experienced users
  if (currentStreak >= 14 || totalCompleted >= 30) {
    // Mix of medium and hard for experienced users
    return Math.random() > 0.3 ? 'hard' : 'medium';
  }
  
  return 'medium';
};

const getRecentChallengeTypes = (recentChallengeIds: string[]): string[] => {
  return recentChallengeIds
    .map(id => challengeDatabase.find(c => c.id === id)?.type)
    .filter(Boolean) as string[];
};

const getRecentChallengeCategories = (recentChallengeIds: string[]): InterestCategory[] => {
  return recentChallengeIds
    .map(id => challengeDatabase.find(c => c.id === id)?.category)
    .filter(Boolean) as InterestCategory[];
};

export const getChallengeVarietyScore = (completedChallengeIds: string[]): {
  categoryVariety: number;
  typeVariety: number;
  difficultyVariety: number;
} => {
  const completed = completedChallengeIds
    .map(id => challengeDatabase.find(c => c.id === id))
    .filter(Boolean) as Challenge[];

  const uniqueCategories = new Set(completed.map(c => c.category)).size;
  const uniqueTypes = new Set(completed.map(c => c.type)).size;
  const uniqueDifficulties = new Set(completed.map(c => c.difficulty)).size;

  return {
    categoryVariety: Math.min(uniqueCategories / 10, 1), // Max 10 categories
    typeVariety: Math.min(uniqueTypes / 4, 1), // Max 4 types
    difficultyVariety: Math.min(uniqueDifficulties / 3, 1), // Max 3 difficulties
  };
};

export const getStreakMilestones = (): number[] => {
  return [3, 7, 14, 21, 30, 50, 75, 100, 150, 200, 365];
};

export const getNextMilestone = (currentStreak: number): number | null => {
  const milestones = getStreakMilestones();
  return milestones.find(milestone => milestone > currentStreak) || null;
};

export const getNextChallenge = (interests: InterestCategory[], progress: UserProgress): Challenge | null => {
  console.log('getNextChallenge called with:', { interests, progress });
  
  if (interests.length === 0) {
    console.log('No interests provided, returning null');
    return null;
  }

  const options: SmartChallengeOptions = {
    interests,
    completedChallengeIds: progress.completedChallengeIds || [],
    difficultyPreference: progress.difficultyPreference || 'adaptive',
    currentStreak: progress.currentStreak,
    totalCompleted: progress.totalChallengesCompleted
  };

  console.log('Smart challenge options:', options);

  try {
    const challenge = getSmartChallenge(options);
    console.log('Generated challenge:', challenge);
    return challenge;
  } catch (error) {
    console.error('Error getting next challenge:', error);
    return null;
  }
};
