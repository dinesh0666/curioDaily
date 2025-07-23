import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Zap, Bell } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

interface PWAInstallPromptProps {
  onDismiss?: () => void;
  autoShow?: boolean;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ 
  onDismiss,
  autoShow = true 
}) => {
  const { isInstallable, install, requestNotifications, notificationPermission } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await install();
      if (success) {
        setIsDismissed(true);
        onDismiss?.();
      }
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const handleEnableNotifications = async () => {
    await requestNotifications();
  };

  if (!autoShow || !isInstallable || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-20 left-4 right-4 z-50"
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-sm mx-auto"
          layoutId="install-prompt"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Install CurioDaily</h3>
                <p className="text-sm opacity-90">Get the full app experience</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="p-1 bg-green-100 rounded-full">
                <Zap className="w-3 h-3 text-green-600" />
              </div>
              <span>Faster loading and offline access</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="p-1 bg-blue-100 rounded-full">
                <Bell className="w-3 h-3 text-blue-600" />
              </div>
              <span>Daily challenge reminders</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="p-1 bg-purple-100 rounded-full">
                <Smartphone className="w-3 h-3 text-purple-600" />
              </div>
              <span>Native app-like experience</span>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 pt-0 space-y-2">
            <motion.button
              onClick={handleInstall}
              disabled={isInstalling}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isInstalling ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Download className="w-4 h-4" />
                </motion.div>
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isInstalling ? 'Installing...' : 'Install App'}
            </motion.button>

            {notificationPermission === 'default' && (
              <button
                onClick={handleEnableNotifications}
                className="w-full py-2 px-4 text-indigo-600 border border-indigo-200 rounded-xl font-medium hover:bg-indigo-50 transition-colors text-sm"
              >
                Enable Notifications
              </button>
            )}
            
            <button
              onClick={handleDismiss}
              className="w-full py-2 px-4 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors text-sm"
            >
              Maybe Later
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Compact install button for header/settings
export const InstallButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isInstallable, install } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);

  if (!isInstallable) return null;

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      await install();
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <motion.button
      onClick={handleInstall}
      disabled={isInstalling}
      className={`flex items-center gap-2 px-3 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 disabled:opacity-50 transition-colors ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isInstalling ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Download className="w-4 h-4" />
        </motion.div>
      ) : (
        <Download className="w-4 h-4" />
      )}
      <span className="text-sm">
        {isInstalling ? 'Installing...' : 'Install'}
      </span>
    </motion.button>
  );
};

export default PWAInstallPrompt;
