import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Sparkles, 
  Star, 
  Crown, 
  Zap, 
  Heart,
  Share2,
  X
} from 'lucide-react';

interface CelebrationModalProps {
  isVisible: boolean;
  milestone: number;
  onClose: () => void;
  onShare?: () => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isVisible,
  milestone,
  onClose,
  onShare
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const getMilestoneData = (milestone: number) => {
    if (milestone >= 365) return {
      icon: <Crown className="w-16 h-16" />,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      title: 'Curiosity Legend!',
      message: 'A full year of daily learning! You\'re absolutely incredible!',
      emoji: '👑'
    };
    if (milestone >= 100) return {
      icon: <Trophy className="w-16 h-16" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      title: 'Century Master!',
      message: '100 days of curiosity! You\'re building an amazing habit!',
      emoji: '🏆'
    };
    if (milestone >= 50) return {
      icon: <Star className="w-16 h-16" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      title: 'Curiosity Champion!',
      message: '50 days strong! Your dedication is truly inspiring!',
      emoji: '⭐'
    };
    if (milestone >= 30) return {
      icon: <Zap className="w-16 h-16" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      title: 'Monthly Master!',
      message: 'A full month of learning! You\'re on fire!',
      emoji: '⚡'
    };
    if (milestone >= 14) return {
      icon: <Heart className="w-16 h-16" />,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      title: 'Two Week Wonder!',
      message: '14 days of curiosity! You\'re building something beautiful!',
      emoji: '❤️'
    };
    if (milestone >= 7) return {
      icon: <Sparkles className="w-16 h-16" />,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      title: 'Week Warrior!',
      message: 'Your first week! This is where habits are born!',
      emoji: '✨'
    };
    return {
      icon: <Trophy className="w-16 h-16" />,
      color: 'text-primary-500',
      bgColor: 'bg-primary-100',
      title: 'Great Start!',
      message: 'You\'re building momentum! Keep going!',
      emoji: '🎉'
    };
  };

  const milestoneData = getMilestoneData(milestone);

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    x: Math.random() * 100,
    rotation: Math.random() * 360,
    color: ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#f97316'][Math.floor(Math.random() * 5)]
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
          onClick={onClose}
        >
          {/* Confetti */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              {confettiPieces.map((piece) => (
                <motion.div
                  key={piece.id}
                  initial={{ 
                    y: -20, 
                    x: `${piece.x}vw`,
                    rotate: 0,
                    opacity: 1
                  }}
                  animate={{ 
                    y: '100vh',
                    rotate: piece.rotation,
                    opacity: 0
                  }}
                  transition={{
                    duration: 3,
                    delay: piece.delay,
                    ease: 'easeOut'
                  }}
                  className="absolute w-3 h-3 rounded-full"
                  style={{ backgroundColor: piece.color }}
                />
              ))}
            </div>
          )}

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 15 }}
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${milestoneData.bgColor} ${milestoneData.color}`}
            >
              {milestoneData.icon}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              {milestoneData.title}
            </motion.h2>

            {/* Milestone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="text-4xl font-bold text-primary-600 mb-4"
            >
              {milestone} Day{milestone !== 1 ? 's' : ''}!
            </motion.div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-600 mb-8 leading-relaxed"
            >
              {milestoneData.message}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className={`flex ${onShare ? 'gap-3' : 'justify-center'}`}
            >
              {onShare && (
                <button
                  onClick={onShare}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 min-w-0"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              )}
              <button
                onClick={onClose}
                className={`${onShare ? 'flex-1' : 'w-full max-w-xs'} bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 min-w-0`}
              >
                <Zap className="w-4 h-4" />
                Continue
              </button>
            </motion.div>

            {/* Fun Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 pt-6 border-t border-gray-100"
            >
              <p className="text-xs text-gray-500">
                {milestone >= 30 
                  ? `That's ${Math.floor(milestone * 12.5)} minutes of learning!`
                  : milestone >= 7
                  ? `You've spent ~${milestone * 12} minutes exploring!`
                  : 'Every day counts! Keep building your habit!'
                }
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationModal;
