import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  Copy, 
  Check, 
  X, 
  Twitter, 
  MessageCircle,
  Mail
} from 'lucide-react';
import { Challenge } from '../types';

interface ShareChallengeProps {
  isVisible: boolean;
  challenge: Challenge;
  streak: number;
  onClose: () => void;
}

const ShareChallenge: React.FC<ShareChallengeProps> = ({
  isVisible,
  challenge,
  streak,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  const shareText = `🌟 Just completed "${challenge.title}" on CurioDaily! ${streak > 1 ? `Day ${streak} of my curiosity streak! ` : ''}Transforming scrolling time into learning time. #CurioDaily #DailyLearning #Curiosity`;

  const shareUrl = window.location.origin;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('Check out my CurioDaily challenge!');
    const body = encodeURIComponent(`${shareText}\n\nCheck out CurioDaily: ${shareUrl}`);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    
    // Create a temporary link element to trigger email client
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Share Your Achievement
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Challenge Preview */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(challenge.type)}`}>
                  {challenge.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {challenge.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {challenge.category} • {challenge.estimatedTime}
              </p>
              {streak > 1 && (
                <div className="flex items-center gap-1 text-sm text-orange-600">
                  <span className="font-medium">Day {streak} streak! 🔥</span>
                </div>
              )}
            </div>

            {/* Share Text Preview */}
            <div className="bg-primary-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                {shareText}
              </p>
            </div>

            {/* Share Options */}
            <div className="space-y-3">
              {/* Copy Link */}
              <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-500" />
                )}
                <span className="font-medium text-gray-900">
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </span>
              </button>

              {/* Social Media Options */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={handleTwitterShare}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-blue-500" />
                  <span className="text-xs font-medium text-blue-700">Twitter</span>
                </button>

                <button
                  onClick={handleWhatsAppShare}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <span className="text-xs font-medium text-green-700">WhatsApp</span>
                </button>

                <button
                  onClick={handleEmailShare}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-xs font-medium text-gray-700">Email</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Inspire others to transform their scrolling time into learning time!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareChallenge;
