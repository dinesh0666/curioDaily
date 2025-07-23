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

      <div className="relative z-10 px-4 py-6">
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
                <span className="font-semibold text-sm">{progress.totalChallengesCompleted} completed</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Challenge Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 mb-6"
          >
            {/* Challenge Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(todaysChallenge.type)}`}>
                    {todaysChallenge.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(todaysChallenge.difficulty)}`}>
                    {todaysChallenge.difficulty}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {todaysChallenge.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{todaysChallenge.estimatedTime} minutes</span>
                  <span className="mx-2">•</span>
                  <span className="text-indigo-600 font-medium capitalize">{todaysChallenge.category}</span>
                </div>
              </div>
            </div>

            {/* Challenge Description */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed text-base">
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
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-base"
                  rows={3}
                />
              </div>
            )}

            {/* Action Buttons */}
            {!challengeCompleted ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                <motion.button
                  onClick={handleComplete}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle className="w-5 h-5" />
                  Complete Challenge
                </motion.button>
                <div className="flex gap-3 sm:w-auto">
                  <motion.button
                    onClick={() => setShowShareModal(true)}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-4 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center shadow-lg"
                    title="Share Challenge"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={handleSkipChallenge}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkipForward className="w-5 h-5" />
                    Skip
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <motion.div 
                  className="mb-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  </motion.div>
                  <p className="text-green-800 font-semibold text-lg mb-1">Challenge completed!</p>
                  <p className="text-green-600 text-sm">Come back tomorrow for a new challenge</p>
                </motion.div>
                <motion.button
                  onClick={handleNewChallenge}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Another Challenge
                </motion.button>
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
              className="bg-white rounded-3xl p-8 mx-4 text-center max-w-sm shadow-2xl"
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
