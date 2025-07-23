import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, AlertCircle } from 'lucide-react';
import { useNetworkStatus } from '../hooks/usePWA';

interface OfflineIndicatorProps {
  className?: string;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ className = '' }) => {
  const isOnline = useNetworkStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-20 left-4 right-4 z-50 ${className}`}
        >
          <motion.div
            className="bg-amber-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 max-w-sm mx-auto"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <WifiOff className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">You're offline</p>
              <p className="text-xs opacity-90">Some features may be limited</p>
            </div>
            <AlertCircle className="w-4 h-4 flex-shrink-0 opacity-75" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Connection status component for settings/debug
export const ConnectionStatus: React.FC = () => {
  const isOnline = useNetworkStatus();

  return (
    <div className="flex items-center gap-2 text-sm">
      {isOnline ? (
        <>
          <Wifi className="w-4 h-4 text-green-500" />
          <span className="text-green-600 font-medium">Online</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-amber-500" />
          <span className="text-amber-600 font-medium">Offline</span>
        </>
      )}
    </div>
  );
};

export default OfflineIndicator;
