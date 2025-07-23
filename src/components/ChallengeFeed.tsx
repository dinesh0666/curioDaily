/** @jsxImportSource react */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  MessageCircle,
  ChevronDown, 
  ChevronUp, 
  Play, 
  Clock, 
  Trophy,
  CheckCircle,
  SkipForward,
  Sparkles,
  ArrowUp,
  RefreshCw
} from 'lucide-react';
import { Challenge } from '../types';
import { useApp } from '../context/AppContext';
import { getNextChallenge } from '../utils/challengeRotation';
import ShareChallenge from './ShareChallenge';
import ChallengeComments from './ChallengeComments';

interface ChallengeFeedProps {}

interface ChallengeCardProps {
  challenge: Challenge;
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
  onLike: () => void;
  onShare: () => void;
  liked: boolean;
}

interface ProgressDotsProps {
  total: number;
  current: number;
}

interface LoadingStateProps {}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'text-green-400';
    case 'medium': return 'text-yellow-400';
    case 'hard': return 'text-red-400';
    default: return 'text-gray-400';
  }
};

const ChallengeFeed: React.FC<ChallengeFeedProps> = () => {
  const { state, actions } = useApp();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedChallenges, setLikedChallenges] = useState<Set<string>>(new Set());
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareChallenge, setShareChallenge] = useState<Challenge | null>(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentsChallenge, setCommentsChallenge] = useState<Challenge | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock comments data - in real app, this would come from backend
  const mockComments = [
    {
      id: '1',
      userId: 'user456',
      userName: 'Sarah Johnson',
      userAvatar: undefined,
      content: 'This challenge really helped me start my day with intention! Thanks for sharing.',
      createdAt: '2024-01-20T10:30:00Z',
      likes: 5,
      liked: false,
      replies: [
        {
          id: '2',
          userId: 'user123',
          userName: 'John Doe',
          userAvatar: undefined,
          content: 'Glad it helped! I found it really grounding too.',
          createdAt: '2024-01-20T11:15:00Z',
          likes: 2,
          liked: true
        }
      ]
    },
    {
      id: '3',
      userId: 'user789',
      userName: 'Mike Chen',
      userAvatar: undefined,
      content: 'Love the step-by-step approach. Made it so much easier to follow!',
      createdAt: '2024-01-20T14:22:00Z',
      likes: 3,
      liked: true
    }
  ];

  // Load initial challenges
  useEffect(() => {
    loadMoreChallenges();
  }, []);

  const loadMoreChallenges = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    const newChallenges: Challenge[] = [];
    
    console.log('Loading challenges with user:', state.user);
    console.log('User interests:', state.user?.interests);
    console.log('Progress:', state.progress);
    
    try {
      for (let i = 0; i < 5; i++) {
        const challenge = getNextChallenge(state.user?.interests || [], state.progress);
        if (challenge) {
          // Add steps for better UX
          const enhancedChallenge = {
            ...challenge,
            steps: challenge.steps || [
              "Take a moment to prepare yourself",
              "Follow the challenge description carefully",
              "Take your time and enjoy the process",
              "Reflect on what you learned"
            ]
          };
          newChallenges.push(enhancedChallenge);
        }
      }
      
      // Fallback: Add sample challenges if none were generated
      if (newChallenges.length === 0) {
        console.log('No challenges generated, adding sample challenges');
        const sampleChallenges = [
          {
            id: 'sample-1',
            title: 'Take 5 Deep Breaths',
            description: 'Practice mindful breathing to center yourself and reduce stress.',
            category: 'wellness' as any,
            difficulty: 'easy' as any,
            type: 'quick_action' as any,
            estimatedTime: '2',
            steps: [
              'Find a comfortable seated position',
              'Close your eyes or soften your gaze',
              'Inhale slowly through your nose for 4 counts',
              'Hold your breath for 2 counts',
              'Exhale slowly through your mouth for 6 counts',
              'Repeat 5 times'
            ]
          },
          {
            id: 'sample-2',
            title: 'Write Down 3 Things You\'re Grateful For',
            description: 'Practice gratitude by reflecting on positive aspects of your life.',
            category: 'personal_growth' as any,
            difficulty: 'easy' as any,
            type: 'reflection' as any,
            estimatedTime: '5',
            steps: [
              'Get a piece of paper or open a notes app',
              'Think about your day so far',
              'Write down one thing that made you smile',
              'Write down one person you appreciate',
              'Write down one thing about yourself you\'re proud of',
              'Take a moment to feel the gratitude'
            ]
          },
          {
            id: 'sample-3',
            title: 'Do 10 Jumping Jacks',
            description: 'Get your blood flowing with a quick burst of physical activity.',
            category: 'fitness' as any,
            difficulty: 'easy' as any,
            type: 'physical' as any,
            estimatedTime: '1',
            steps: [
              'Stand with feet together, arms at your sides',
              'Jump while spreading your legs shoulder-width apart',
              'Simultaneously raise your arms overhead',
              'Jump back to starting position',
              'Repeat 10 times at your own pace',
              'Take a moment to notice how you feel'
            ]
          }
        ];
        newChallenges.push(...sampleChallenges);
      }
      
      console.log('Generated challenges:', newChallenges);
      setChallenges((prev: Challenge[]) => [...prev, ...newChallenges]);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentChallenge = challenges[currentIndex];

  const handleSwipe = (direction: 'up' | 'down') => {
    console.log('Handling swipe:', direction, 'currentIndex:', currentIndex, 'total:', challenges.length);
    
    if (direction === 'up' && currentIndex < challenges.length - 1) {
      setCurrentIndex((prev: number) => prev + 1);
      
      // Load more challenges when near the end
      if (currentIndex >= challenges.length - 3) {
        loadMoreChallenges();
      }
    } else if (direction === 'down' && currentIndex > 0) {
      setCurrentIndex((prev: number) => prev - 1);
    } else if (direction === 'up' && currentIndex === challenges.length - 1) {
      // At the end, load more challenges
      loadMoreChallenges();
    }
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    const velocityThreshold = 300;
    
    console.log('Pan ended:', { 
      offset: info.offset.y, 
      velocity: info.velocity.y, 
      threshold,
      velocityThreshold 
    });
    
    // Swipe up (next challenge) - negative Y values
    if (info.offset.y < -threshold || (info.velocity.y < -velocityThreshold && info.offset.y < -10)) {
      console.log('Swiping up - next challenge');
      handleSwipe('up');
    } 
    // Swipe down (previous challenge) - positive Y values
    else if (info.offset.y > threshold || (info.velocity.y > velocityThreshold && info.offset.y > 10)) {
      console.log('Swiping down - previous challenge');
      handleSwipe('down');
    }
  };

  const handleComplete = () => {
    if (currentChallenge) {
      actions.completeChallenge(currentChallenge.id, false);
      setTimeout(() => {
        handleSwipe('up');
      }, 1500);
    }
  };

  const handleSkip = () => {
    if (currentChallenge) {
      actions.completeChallenge(currentChallenge.id, true);
      handleSwipe('up');
    }
  };

  const handleLike = () => {
    if (currentChallenge) {
      setLikedChallenges((prev: Set<string>) => {
        const newSet = new Set(prev);
        if (newSet.has(currentChallenge.id)) {
          newSet.delete(currentChallenge.id);
        } else {
          newSet.add(currentChallenge.id);
        }
        return newSet;
      });
    }
  };

  const handleShare = () => {
    const currentChallenge = challenges[currentIndex];
    if (currentChallenge) {
      setShareChallenge(currentChallenge);
      setShowShareModal(true);
    }
  };

  const handleComments = () => {
    const currentChallenge = challenges[currentIndex];
    if (currentChallenge) {
      setCommentsChallenge(currentChallenge);
      setShowCommentsModal(true);
    }
  };

  // Show onboarding prompt if user hasn't completed onboarding
  if (!state.user || !state.isOnboarded) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500">
        <div className="text-center p-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-auto mb-6"
          >
            <Sparkles className="w-16 h-16 text-white mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-4">Welcome to Challenge Feed!</h2>
          <p className="text-white/80 mb-6">Complete your profile setup first to start discovering amazing challenges.</p>
          <motion.button
            onClick={() => window.location.href = '/'}
            className="bg-white text-primary-600 px-6 py-3 rounded-xl font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Setup
          </motion.button>
        </div>
      </div>
    );
  }

  if (!currentChallenge && challenges.length === 0) {
    return <LoadingState />;
  }

  if (!currentChallenge) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500">
        <div className="text-center p-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-4"
          >
            <RefreshCw className="w-12 h-12 text-white" />
          </motion.div>
          <p className="text-white text-lg font-medium mb-4">No challenges available</p>
          <motion.button
            onClick={loadMoreChallenges}
            className="bg-white text-primary-600 px-6 py-3 rounded-xl font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative overflow-hidden flex flex-col">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500"
        animate={{
          background: [
            'linear-gradient(45deg, #6366F1, #EC4899, #F59E0B)',
            'linear-gradient(135deg, #EC4899, #F59E0B, #6366F1)',
            'linear-gradient(225deg, #F59E0B, #6366F1, #EC4899)',
            'linear-gradient(315deg, #6366F1, #EC4899, #F59E0B)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
            }}
            animate={{
              y: -10,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
      
      {/* Morphing Blobs */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-10 w-40 h-40 bg-white/15 rounded-full blur-xl"
          animate={{
            scale: [1, 0.8, 1.2, 1],
            x: [0, -40, 20, 0],
            y: [0, 20, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 0.9, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>

      {/* Header */}
      <motion.div 
        className="flex justify-between items-center p-4 pt-12 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <span className="text-white font-bold text-lg">Challenge Feed</span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{currentIndex + 1} of {challenges.length}</span>
        </div>
      </motion.div>

      {/* Main Challenge Area - Full Screen Vertical Feed */}
      <div className="flex-1 relative overflow-hidden" ref={containerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handlePanEnd}
            whileDrag={{ scale: 0.98 }}
          >
            {/* Full Screen Challenge Container */}
            <div className="w-full h-full flex flex-col relative">
              {/* Challenge Content */}
              <div className="flex-1 flex items-center justify-center p-4">
                <ChallengeCard
                  challenge={currentChallenge}
                  isActive={true}
                  onComplete={handleComplete}
                  onSkip={handleSkip}
                  onLike={handleLike}
                  onShare={handleShare}
                  liked={likedChallenges.has(currentChallenge.id)}
                />
              </div>
              
              {/* Side Actions - TikTok Style */}
              <div className="absolute right-4 bottom-32 flex flex-col gap-4">
                <motion.button
                  onClick={handleLike}
                  className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    backgroundColor: likedChallenges.has(currentChallenge.id) ? 'rgba(239, 68, 68, 0.9)' : 'rgba(255, 255, 255, 0.9)'
                  }}
                >
                  <motion.div
                    animate={{ 
                      scale: likedChallenges.has(currentChallenge.id) ? [1, 1.3, 1] : 1,
                      color: likedChallenges.has(currentChallenge.id) ? '#ffffff' : '#6b7280'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart className={`w-6 h-6 ${likedChallenges.has(currentChallenge.id) ? 'fill-current' : ''}`} />
                  </motion.div>
                </motion.button>

                <motion.button
                  onClick={handleComments}
                  className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MessageCircle className="w-6 h-6 text-gray-600" />
                </motion.button>

                <motion.button
                  onClick={handleShare}
                  className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots */}
      <ProgressDots total={Math.min(challenges.length, 10)} current={currentIndex} />

      {/* Navigation Hints */}
      <motion.div 
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.div>
        <span className="text-xs">Swipe up for next challenge</span>
      </motion.div>

      {/* Share Modal */}
      {shareChallenge && (
        <ShareChallenge
          isVisible={showShareModal}
          challenge={shareChallenge}
          streak={state.progress.currentStreak}
          onClose={() => {
            setShowShareModal(false);
            setShareChallenge(null);
          }}
        />
      )}

      {/* Comments Modal */}
      {commentsChallenge && (
        <ChallengeComments
          challengeId={commentsChallenge.id}
          comments={mockComments}
          onAddComment={(content, parentId) => {
            console.log('Adding comment:', content, parentId);
            // In real app, this would add comment to backend
          }}
          onLikeComment={(commentId) => {
            console.log('Liking comment:', commentId);
            // In real app, this would toggle like on backend
          }}
          onDeleteComment={(commentId) => {
            console.log('Deleting comment:', commentId);
            // In real app, this would delete comment from backend
          }}
          onEditComment={(commentId, content) => {
            console.log('Editing comment:', commentId, content);
            // In real app, this would edit comment on backend
          }}
          onReportComment={(commentId) => {
            console.log('Reporting comment:', commentId);
            // In real app, this would report comment to backend
          }}
          currentUserId="user123"
          isVisible={showCommentsModal}
          onClose={() => {
            setShowCommentsModal(false);
            setCommentsChallenge(null);
          }}
        />
      )}
    </div>
  );
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  isActive,
  onComplete,
  onSkip,
  onLike,
  onShare,
  liked
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 border-red-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <motion.div 
      className="w-full max-w-sm mx-auto"
      layout
      transition={{ duration: 0.3 }}
    >
      {/* Challenge Card */}
      <motion.div 
        className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyBg(challenge.difficulty)}`}
            whileHover={{ scale: 1.05 }}
          >
            <span className={getDifficultyColor(challenge.difficulty)}>
              {challenge.difficulty.toUpperCase()}
            </span>
          </motion.div>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{challenge.estimatedTime || '5'} min</span>
          </div>
        </div>

        {/* Title */}
        <motion.h2 
          className="text-2xl font-bold text-gray-900 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {challenge.title}
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="text-gray-600 mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {challenge.description}
        </motion.p>

        {/* Steps Section */}
        {challenge.steps && challenge.steps.length > 0 && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => setShowSteps(!showSteps)}
              className="flex items-center gap-2 text-primary-600 font-medium mb-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Steps to complete</span>
              <motion.div
                animate={{ rotate: showSteps ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {showSteps && (
                <motion.ul 
                  className="space-y-2 text-sm text-gray-600"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {challenge.steps.map((step, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="w-5 h-5 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={handleComplete}
            disabled={isCompleted}
            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg disabled:opacity-50"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {isCompleted ? (
              <motion.div 
                className="flex items-center justify-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <CheckCircle className="w-5 h-5" />
                <span>Completed!</span>
              </motion.div>
            ) : (
              <span>Complete</span>
            )}
          </motion.button>

          <motion.button
            onClick={onSkip}
            className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SkipForward className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProgressDots: React.FC<ProgressDotsProps> = ({ total, current }) => {
  return (
    <div className="flex justify-center gap-2 p-4 z-10">
      {[...Array(total)].map((_, index) => (
        <motion.div
          key={index}
          className={`w-2 h-2 rounded-full ${
            index === current ? 'bg-white' : 'bg-white/30'
          }`}
          animate={{
            scale: index === current ? 1.5 : 1,
            opacity: index === current ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
};

const LoadingState: React.FC<LoadingStateProps> = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto mb-4"
        >
          <RefreshCw className="w-12 h-12 text-white" />
        </motion.div>
        <p className="text-white text-lg font-medium">Loading amazing challenges...</p>
      </div>
    </div>
  );
};

export default ChallengeFeed;
