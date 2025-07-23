import { useState, useEffect, useCallback } from 'react';
import {
  BeforeInstallPromptEvent,
  registerServiceWorker,
  requestNotificationPermission,
  subscribeToPushNotifications,
  promptInstall,
  isOnline,
  isPWA,
  canInstallPWA
} from '../utils/pwa';

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  canInstall: boolean;
  notificationPermission: NotificationPermission;
  isLoading: boolean;
  error: string | null;
}

interface PWAActions {
  install: () => Promise<boolean>;
  requestNotifications: () => Promise<NotificationPermission>;
  clearError: () => void;
}

export const usePWA = (): PWAState & PWAActions => {
  const [state, setState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: isPWA(),
    isOnline: isOnline(),
    canInstall: canInstallPWA(),
    notificationPermission: 'default',
    isLoading: true,
    error: null
  });

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  // Initialize PWA
  useEffect(() => {
    const initializePWA = async () => {
      try {
        // Register service worker
        await registerServiceWorker();
        
        // Check notification permission
        const permission = Notification.permission;
        
        setState(prev => ({
          ...prev,
          notificationPermission: permission,
          isLoading: false
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Failed to initialize PWA',
          isLoading: false
        }));
      }
    };

    initializePWA();
  }, []);

  // Listen for install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
      setState(prev => ({ ...prev, isInstallable: true }));
    };

    const handleAppInstalled = () => {
      setState(prev => ({
        ...prev,
        isInstalled: true,
        isInstallable: false
      }));
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Listen for online/offline status
  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Install app
  const install = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      setState(prev => ({ ...prev, error: 'Installation not available' }));
      return false;
    }

    try {
      const result = await promptInstall(deferredPrompt);
      if (result) {
        setDeferredPrompt(null);
        setState(prev => ({
          ...prev,
          isInstallable: false,
          isInstalled: true
        }));
      }
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Installation failed'
      }));
      return false;
    }
  }, [deferredPrompt]);

  // Request notification permission
  const requestNotifications = useCallback(async (): Promise<NotificationPermission> => {
    try {
      const permission = await requestNotificationPermission();
      setState(prev => ({ ...prev, notificationPermission: permission }));
      
      // Subscribe to push notifications if granted
      if (permission === 'granted' && 'serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        await subscribeToPushNotifications(registration);
      }
      
      return permission;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Notification request failed'
      }));
      return 'denied';
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    install,
    requestNotifications,
    clearError
  };
};

// Hook for network status
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// Hook for app update detection
export const useAppUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setUpdateAvailable(true);
      });

      // Check for updates periodically
      const checkForUpdates = () => {
        navigator.serviceWorker.ready.then(registration => {
          registration.update();
        });
      };

      // Check for updates every 30 minutes
      const interval = setInterval(checkForUpdates, 30 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, []);

  const applyUpdate = useCallback(() => {
    setIsUpdating(true);
    window.location.reload();
  }, []);

  return {
    updateAvailable,
    isUpdating,
    applyUpdate
  };
};
