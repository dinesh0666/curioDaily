import { Challenge, InterestCategory } from '../types';

export const challengeDatabase: Challenge[] = [
  // Photography Challenges
  {
    id: 'photo-1',
    title: 'Golden Hour Magic',
    description: 'Take a photo using only natural light during the golden hour (1 hour before sunset). Focus on how the warm light transforms your subject.',
    category: 'Photography',
    type: 'Try This',
    estimatedTime: '15 minutes',
    difficulty: 'easy'
  },
  {
    id: 'photo-2',
    title: 'Macro World Discovery',
    description: 'Use your phone to capture extreme close-ups of everyday objects. Try flowers, textures, or water droplets.',
    category: 'Photography',
    type: 'Explore',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  },
  {
    id: 'photo-3',
    title: 'Shadow Play',
    description: 'Create an artistic photo using shadows as the main subject. Experiment with different light sources and angles.',
    category: 'Photography',
    type: 'Create',
    estimatedTime: '12 minutes',
    difficulty: 'medium'
  },
  {
    id: 'photo-4',
    title: 'Street Photography Ethics',
    description: 'Learn about the ethics of street photography and practice taking candid photos respectfully in public spaces.',
    category: 'Photography',
    type: 'Learn Something New',
    estimatedTime: '15 minutes',
    difficulty: 'medium'
  },
  {
    id: 'photo-5',
    title: 'Rule of Thirds Practice',
    description: 'Take 5 photos deliberately using the rule of thirds. Turn on your camera grid and place subjects along the lines.',
    category: 'Photography',
    type: 'Try This',
    estimatedTime: '8 minutes',
    difficulty: 'easy'
  },

  // Languages Challenges
  {
    id: 'lang-1',
    title: 'Daily Vocabulary Builder',
    description: 'Learn 5 new words in a language you\'re interested in. Use them in sentences and practice pronunciation.',
    category: 'Languages',
    type: 'Learn Something New',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  },
  {
    id: 'lang-2',
    title: 'Accent Challenge',
    description: 'Practice pronunciation by mimicking a native speaker for 10 minutes. Use YouTube videos or language apps.',
    category: 'Languages',
    type: 'Try This',
    estimatedTime: '10 minutes',
    difficulty: 'medium'
  },
  {
    id: 'lang-3',
    title: 'Cultural Greeting Explorer',
    description: 'Learn how to say "hello" and "thank you" in 3 different languages, plus one cultural greeting custom.',
    category: 'Languages',
    type: 'Explore',
    estimatedTime: '8 minutes',
    difficulty: 'easy'
  },
  {
    id: 'lang-4',
    title: 'Language Exchange Prep',
    description: 'Write a 2-minute self-introduction in a target language. Practice it out loud until you\'re comfortable.',
    category: 'Languages',
    type: 'Create',
    estimatedTime: '15 minutes',
    difficulty: 'medium'
  },
  {
    id: 'lang-5',
    title: 'Etymology Detective',
    description: 'Pick 3 English words and discover their origins. How many languages influenced these words?',
    category: 'Languages',
    type: 'Learn Something New',
    estimatedTime: '12 minutes',
    difficulty: 'easy'
  },

  // Cooking Challenges
  {
    id: 'cook-1',
    title: 'Global Flavor Adventure',
    description: 'Try a 15-minute recipe from a cuisine you\'ve never cooked before. Focus on learning one new cooking technique.',
    category: 'Cooking',
    type: 'Try This',
    estimatedTime: '15 minutes',
    difficulty: 'medium'
  },
  {
    id: 'cook-2',
    title: 'Knife Skills Mastery',
    description: 'Learn and practice one professional knife technique: julienne, brunoise, or chiffonade. Use vegetables you have at home.',
    category: 'Cooking',
    type: 'Learn Something New',
    estimatedTime: '10 minutes',
    difficulty: 'medium'
  },
  {
    id: 'cook-3',
    title: 'Spice Blend Creator',
    description: 'Create your own spice blend using 4-5 spices. Test it on a simple dish and give your blend a creative name.',
    category: 'Cooking',
    type: 'Create',
    estimatedTime: '12 minutes',
    difficulty: 'easy'
  },
  {
    id: 'cook-4',
    title: 'Food Science Explorer',
    description: 'Learn why onions make you cry and try one technique to prevent it while cooking. Understand the science behind it.',
    category: 'Cooking',
    type: 'Explore',
    estimatedTime: '8 minutes',
    difficulty: 'easy'
  },
  {
    id: 'cook-5',
    title: 'Leftover Transformation',
    description: 'Transform yesterday\'s leftovers into something completely new. Challenge yourself to use at least 3 different ingredients.',
    category: 'Cooking',
    type: 'Create',
    estimatedTime: '15 minutes',
    difficulty: 'medium'
  },

  // Fitness Challenges
  {
    id: 'fit-1',
    title: 'Mindful Movement',
    description: 'Do 10 minutes of gentle stretching while focusing entirely on how your body feels. No distractions allowed.',
    category: 'Fitness',
    type: 'Try This',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  },
  {
    id: 'fit-2',
    title: 'Stair Climbing Power',
    description: 'Find a staircase and do interval training: walk up slowly, run down quickly. Repeat for 8 minutes.',
    category: 'Fitness',
    type: 'Try This',
    estimatedTime: '8 minutes',
    difficulty: 'medium'
  },
  {
    id: 'fit-3',
    title: 'Balance Challenge',
    description: 'Learn about proprioception and practice balance exercises. Try standing on one foot with eyes closed.',
    category: 'Fitness',
    type: 'Learn Something New',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  },
  {
    id: 'fit-4',
    title: 'Desk Warrior Routine',
    description: 'Create a 5-minute routine to counteract sitting all day. Include neck, shoulder, and hip movements.',
    category: 'Fitness',
    type: 'Create',
    estimatedTime: '12 minutes',
    difficulty: 'easy'
  },
  {
    id: 'fit-5',
    title: 'Nature Workout',
    description: 'Go outside and use natural elements for exercise: tree branches for pull-ups, rocks for weights, hills for cardio.',
    category: 'Fitness',
    type: 'Explore',
    estimatedTime: '15 minutes',
    difficulty: 'medium'
  },

  // Art Challenges
  {
    id: 'art-1',
    title: 'One-Line Drawing',
    description: 'Draw a portrait or object without lifting your pen from the paper. Focus on capturing the essence, not perfection.',
    category: 'Art',
    type: 'Try This',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  },
  {
    id: 'art-2',
    title: 'Color Psychology Study',
    description: 'Learn how different colors affect emotions. Create a small color palette that represents your current mood.',
    category: 'Art',
    type: 'Learn Something New',
    estimatedTime: '12 minutes',
    difficulty: 'easy'
  },
  {
    id: 'art-3',
    title: 'Texture Treasure Hunt',
    description: 'Find 5 different textures around you and create rubbings with paper and pencil. Combine them into one artwork.',
    category: 'Art',
    type: 'Explore',
    estimatedTime: '15 minutes',
    difficulty: 'easy'
  },
  {
    id: 'art-4',
    title: 'Minimalist Masterpiece',
    description: 'Create art using only 3 colors and simple shapes. Challenge yourself to convey a complex emotion simply.',
    category: 'Art',
    type: 'Create',
    estimatedTime: '15 minutes',
    difficulty: 'medium'
  },
  {
    id: 'art-5',
    title: 'Light and Shadow Study',
    description: 'Set up a simple still life with dramatic lighting. Sketch focusing only on the shadows and highlights.',
    category: 'Art',
    type: 'Try This',
    estimatedTime: '12 minutes',
    difficulty: 'medium'
  },

  // Science Challenges
  {
    id: 'sci-1',
    title: 'Kitchen Chemistry',
    description: 'Explore the science behind baking soda and vinegar reactions. Try 3 different ratios and observe the differences.',
    category: 'Science',
    type: 'Explore',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  },
  {
    id: 'sci-2',
    title: 'Astronomy Minute',
    description: 'Learn about one constellation visible tonight. Use a stargazing app to locate it and understand its mythology.',
    category: 'Science',
    type: 'Learn Something New',
    estimatedTime: '12 minutes',
    difficulty: 'easy'
  },
  {
    id: 'sci-3',
    title: 'Plant Growth Experiment',
    description: 'Start a simple experiment: grow the same plant in different conditions (light, water, soil). Document day 1.',
    category: 'Science',
    type: 'Create',
    estimatedTime: '15 minutes',
    difficulty: 'easy'
  },
  {
    id: 'sci-4',
    title: 'Physics in Motion',
    description: 'Explore pendulum physics using household items. Try different weights and lengths, time the swings.',
    category: 'Science',
    type: 'Try This',
    estimatedTime: '10 minutes',
    difficulty: 'medium'
  },
  {
    id: 'sci-5',
    title: 'Weather Pattern Detective',
    description: 'Learn to read cloud types and predict weather. Observe the sky and make a 24-hour weather prediction.',
    category: 'Science',
    type: 'Learn Something New',
    estimatedTime: '8 minutes',
    difficulty: 'easy'
  },

  // Music Challenges
  {
    id: 'music-1',
    title: 'Rhythm of Life',
    description: 'Create a 2-minute rhythm using only objects around you. Record it and try to identify the time signature.',
    category: 'Music',
    type: 'Create',
    estimatedTime: '12 minutes',
    difficulty: 'easy'
  },
  {
    id: 'music-2',
    title: 'Genre Time Travel',
    description: 'Listen to music from a decade you weren\'t alive in. Learn about 3 artists and how they influenced modern music.',
    category: 'Music',
    type: 'Explore',
    estimatedTime: '15 minutes',
    difficulty: 'easy'
  },
  {
    id: 'music-3',
    title: 'Perfect Pitch Practice',
    description: 'Learn about relative pitch and try to identify intervals between notes using a piano app or online tool.',
    category: 'Music',
    type: 'Learn Something New',
    estimatedTime: '10 minutes',
    difficulty: 'medium'
  },
  {
    id: 'music-4',
    title: 'Soundscape Creation',
    description: 'Record the ambient sounds around you for 5 minutes. Layer them to create a unique soundscape composition.',
    category: 'Music',
    type: 'Create',
    estimatedTime: '15 minutes',
    difficulty: 'medium'
  },
  {
    id: 'music-5',
    title: 'Instrument Exploration',
    description: 'Try playing a simple melody on an instrument you\'ve never touched, even if it\'s a virtual one on your phone.',
    category: 'Music',
    type: 'Try This',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  },

  // Writing Challenges
  {
    id: 'write-1',
    title: 'Six-Word Story',
    description: 'Write a complete story in exactly six words. Make every word count to convey emotion and narrative.',
    category: 'Writing',
    type: 'Create',
    estimatedTime: '8 minutes',
    difficulty: 'easy'
  },
  {
    id: 'write-2',
    title: 'Stream of Consciousness',
    description: 'Write continuously for 10 minutes without stopping or editing. Let your thoughts flow freely onto paper.',
    category: 'Writing',
    type: 'Try This',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  },
  {
    id: 'write-3',
    title: 'Character Voice Study',
    description: 'Learn about different narrative voices. Write the same scene from three different character perspectives.',
    category: 'Writing',
    type: 'Learn Something New',
    estimatedTime: '15 minutes',
    difficulty: 'medium'
  },
  {
    id: 'write-4',
    title: 'Sensory Scene Builder',
    description: 'Describe a familiar place using only sounds, smells, and textures. No visual descriptions allowed.',
    category: 'Writing',
    type: 'Create',
    estimatedTime: '12 minutes',
    difficulty: 'medium'
  },
  {
    id: 'write-5',
    title: 'Poetry Form Explorer',
    description: 'Learn about haiku structure and write 3 haikus about your current surroundings. Focus on nature imagery.',
    category: 'Writing',
    type: 'Explore',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  },

  // Travel Challenges
  {
    id: 'travel-1',
    title: 'Local Tourist Adventure',
    description: 'Explore your own neighborhood like a tourist. Find 3 things you\'ve never noticed before and research their history.',
    category: 'Travel',
    type: 'Explore',
    estimatedTime: '15 minutes',
    difficulty: 'easy'
  },
  {
    id: 'travel-2',
    title: 'Cultural Etiquette Study',
    description: 'Learn about dining etiquette in a country you want to visit. Practice the customs with your next meal.',
    category: 'Travel',
    type: 'Learn Something New',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  },
  {
    id: 'travel-3',
    title: 'Virtual Journey',
    description: 'Take a virtual tour of a famous landmark. Learn 5 facts about it and imagine yourself there.',
    category: 'Travel',
    type: 'Try This',
    estimatedTime: '12 minutes',
    difficulty: 'easy'
  },
  {
    id: 'travel-4',
    title: 'Travel Journal Start',
    description: 'Create a travel journal entry for today, even if you didn\'t travel. Describe your "journey" through your daily routine.',
    category: 'Travel',
    type: 'Create',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  },
  {
    id: 'travel-5',
    title: 'Currency Explorer',
    description: 'Learn about the currency of 3 different countries. Understand exchange rates and what things cost there.',
    category: 'Travel',
    type: 'Explore',
    estimatedTime: '8 minutes',
    difficulty: 'easy'
  },

  // Technology Challenges
  {
    id: 'tech-1',
    title: 'Keyboard Shortcut Master',
    description: 'Learn 5 new keyboard shortcuts for an app you use daily. Practice them until they become muscle memory.',
    category: 'Technology',
    type: 'Learn Something New',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  },
  {
    id: 'tech-2',
    title: 'Digital Declutter',
    description: 'Organize one digital space: desktop, downloads folder, or photo gallery. Delete what you don\'t need.',
    category: 'Technology',
    type: 'Try This',
    estimatedTime: '15 minutes',
    difficulty: 'easy'
  },
  {
    id: 'tech-3',
    title: 'Code Logic Puzzle',
    description: 'Solve a simple coding problem or logic puzzle online. Focus on understanding the problem-solving process.',
    category: 'Technology',
    type: 'Explore',
    estimatedTime: '12 minutes',
    difficulty: 'medium'
  },
  {
    id: 'tech-4',
    title: 'App Automation',
    description: 'Create a simple automation on your phone: auto-reply, scheduled message, or workflow shortcut.',
    category: 'Technology',
    type: 'Create',
    estimatedTime: '15 minutes',
    difficulty: 'medium'
  },
  {
    id: 'tech-5',
    title: 'Privacy Audit',
    description: 'Review privacy settings on one social media platform. Understand what data is being collected and adjust settings.',
    category: 'Technology',
    type: 'Learn Something New',
    estimatedTime: '10 minutes',
    difficulty: 'easy'
  }
];

export const getChallengesByCategory = (category: InterestCategory): Challenge[] => {
  return challengeDatabase.filter(challenge => challenge.category === category);
};

export const getRandomChallenge = (interests: InterestCategory[]): Challenge => {
  const availableChallenges = challengeDatabase.filter(
    challenge => interests.includes(challenge.category)
  );
  
  if (availableChallenges.length === 0) {
    // Fallback to all challenges if no interests match
    return challengeDatabase[Math.floor(Math.random() * challengeDatabase.length)];
  }
  
  return availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
};
