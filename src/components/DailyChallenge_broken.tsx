import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  SkipForward, 
  Clock, 
  Sparkles, 
  RefreshCw,
  Trophy,
  Flame,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import CelebrationModal from './CelebrationModal';
import ShareChallenge from './ShareChallenge';
import { getStreakMilestones } from '../utils/challengeRotation';

const DailyChallenge: React.FC = () => {
  const { state, actions } = useApp();
  const [notes, setNotes] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [celebrationMilestone, setCelebrationMilestone] = useState<number | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  const { user, todaysChallenge, progress } = state;

  const handleComplete = () => {
    if (todaysChallenge) {
      actions.completeChallenge(todaysChallenge.id, false, notes);
      setChallengeCompleted(true);
      
      // Check for streak milestones
      const newStreak = progress.currentStreak + 1;
      const milestones = getStreakMilestones();
      const milestone = milestones.find(m => m === newStreak);
      
      if (milestone) {
        setCelebrationMilestone(milestone);
        setShowCelebration(true);
      }
    }
  };

  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  const handleSkipChallenge = () => {
    if (!todaysChallenge) return;
    
    actions.completeChallenge(todaysChallenge.id, true);
    setChallengeCompleted(true);
  };

  const handleNewChallenge = () => {
    actions.generateNewChallenge();
    setChallengeCompleted(false);
    setNotes('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Learn Something New': return 'text-blue-600 bg-blue-100';
      case 'Try This': return 'text-purple-600 bg-purple-100';
      case 'Create': return 'text-pink-600 bg-pink-100';
      case 'Explore': return 'text-teal-600 bg-teal-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!user || !todaysChallenge) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your challenge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 px-4 py-6 safe-area-top">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-7 h-7 text-indigo-500" />
              </motion.div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Hello, {user.name}!
              </h1>
            </div>
            
            {/* Streak Display */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <motion.div 
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Flame className="w-4 h-4" />
                <span className="font-semibold text-sm">{progress.currentStreak} day streak</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trophy className="w-4 h-4" />
                <span className="font-semibold text-sm">{progress.completedChallenges} completed</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Challenge Card */}
              </div>

              {/* Challenge Description */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {todaysChallenge.description}
                </p>
              </div>

              {/* Notes Section */}
              {!challengeCompleted && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Jot down thoughts, learnings, or reflections..."
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
              )}

              {/* Action Buttons */}
              {!challengeCompleted ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleComplete}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Complete Challenge
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-4 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center shadow-lg"
                    title="Share Challenge"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSkipChallenge}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <SkipForward className="w-5 h-5" />
                    Skip
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4 p-4 bg-green-50 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-green-800 font-medium">Challenge completed!</p>
                    <p className="text-green-600 text-sm">Come back tomorrow for a new challenge</p>
                  </div>
                  <button
                    onClick={handleNewChallenge}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Another Challenge
                  </button>
                </div>
              )}
            </motion.div>

            {/* Today's Date */}
            <div className="text-center text-sm text-gray-500 mt-6">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white rounded-2xl p-8 mx-4 text-center max-w-sm"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Awesome work!
              </h3>
              <p className="text-gray-600 mb-4">
                You've completed today's challenge and maintained your {progress.currentStreak} day streak!
              </p>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-500 mx-1" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Celebration Modal */}
      <CelebrationModal
        isVisible={showCelebration}
        milestone={celebrationMilestone || 0}
        onClose={() => {
          setShowCelebration(false);
          setCelebrationMilestone(null);
        }}
        onShare={() => {
          setShowCelebration(false);
          setShowShareModal(true);
        }}
      />
      
      {/* Share Modal */}
      <ShareChallenge
        isVisible={showShareModal}
        challenge={todaysChallenge!}
        streak={progress.currentStreak}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
};

export default DailyChallenge;
