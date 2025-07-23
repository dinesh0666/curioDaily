import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Generic loading spinner
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className={`${sizeClasses[size]} text-indigo-500`} />
    </motion.div>
  );
};

// Skeleton loader for text
export const SkeletonText: React.FC<{ 
  lines?: number; 
  className?: string;
  animate?: boolean;
}> = ({ lines = 1, className = '', animate = true }) => {
  const skeletonAnimation = animate ? {
    animate: { opacity: [0.5, 1, 0.5] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
  } : {};

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className={`h-4 bg-gray-200 rounded ${
            index === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
          }`}
          {...skeletonAnimation}
        />
      ))}
    </div>
  );
};

// Skeleton loader for challenge cards
export const SkeletonChallengeCard: React.FC = () => {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <motion.div
          className="w-16 h-6 bg-gray-200 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="w-12 h-6 bg-gray-200 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
      </div>
      
      <motion.div
        className="h-8 bg-gray-200 rounded mb-3"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      />
      
      <SkeletonText lines={3} className="mb-4" />
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <motion.div
          className="w-20 h-4 bg-gray-200 rounded"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />
        <motion.div
          className="w-16 h-4 bg-gray-200 rounded"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
        />
      </div>
      
      <div className="flex gap-3">
        <motion.div
          className="flex-1 h-12 bg-gray-200 rounded-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="flex-1 h-12 bg-gray-200 rounded-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}
        />
      </div>
    </motion.div>
  );
};

// Full page loading screen
export const FullPageLoading: React.FC<{ message?: string }> = ({ 
  message = "Loading your challenges..." 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <LoadingSpinner size="lg" />
        </motion.div>
        
        <motion.h2
          className="text-xl font-semibold text-gray-900 mb-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.h2>
        
        <motion.div
          className="flex justify-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-indigo-400 rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Loading overlay for modals
export const LoadingOverlay: React.FC<{ message?: string }> = ({ 
  message = "Loading..." 
}) => {
  return (
    <motion.div
      className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600 mt-3 font-medium">{message}</p>
      </div>
    </motion.div>
  );
};

// Inline loading state for buttons
export const ButtonLoading: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => {
  return (
    <div className="flex items-center gap-2">
      <LoadingSpinner size={size} />
      <span>Loading...</span>
    </div>
  );
};
