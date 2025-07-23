import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';
import { useAppUpdate } from '../hooks/usePWA';

const UpdateNotification: React.FC = () => {
  const { updateAvailable, isUpdating, applyUpdate } = useAppUpdate();

  if (!updateAvailable) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-4 left-4 right-4 z-50"
      >
        <motion.div
          className="bg-indigo-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 max-w-sm mx-auto"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <RefreshCw className={`w-5 h-5 flex-shrink-0 ${isUpdating ? 'animate-spin' : ''}`} />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm">Update Available</p>
            <p className="text-xs opacity-90">New features and improvements</p>
          </div>
          <button
            onClick={applyUpdate}
            disabled={isUpdating}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateNotification;
