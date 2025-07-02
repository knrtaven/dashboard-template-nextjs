import { useState, useEffect } from 'react';
import { 
  PWAHookReturn, 
  OfflineStorageHookReturn, 
  BackgroundSyncHookReturn,
  OfflineData,
  OfflineAnswer
} from '../types';

// Custom hook for PWA functionality
export function usePWA(): PWAHookReturn {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Check if app is already installed
    if (
      (window.navigator as any).standalone || 
      window.matchMedia('(display-mode: standalone)').matches
    ) {
      setIsInstalled(true);
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg: ServiceWorkerRegistration) => {
          console.log('Service Worker registered successfully');
          setRegistration(reg);
          
          // Check for updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available
                  if (confirm('New version available! Reload to update?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error: Error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    // Listen for app installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    // Online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const installApp = async (): Promise<boolean> => {
    if (!installPrompt) return false;

    try {
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        setInstallPrompt(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error installing app:', error);
      return false;
    }
  };

  return {
    isOnline,
    installPrompt,
    isInstalled,
    registration,
    installApp,
    canInstall: !!installPrompt && !isInstalled
  };
}

// Hook for offline storage with TypeScript
export function useOfflineStorage(): OfflineStorageHookReturn {
  const [offlineData, setOfflineData] = useState<Record<string, any>>({});

  const saveOfflineData = (key: string, data: any): void => {
    try {
      const updatedData = { ...offlineData, [key]: data };
      setOfflineData(updatedData);
      localStorage.setItem('offline_data', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Failed to save offline data:', error);
    }
  };

  const getOfflineData = (key: string): any => {
    return offlineData[key] || null;
  };

  const clearOfflineData = (key: string): void => {
    try {
      const updatedData = { ...offlineData };
      delete updatedData[key];
      setOfflineData(updatedData);
      localStorage.setItem('offline_data', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Failed to clear offline data:', error);
    }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('offline_data');
      if (stored) {
        setOfflineData(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load offline data:', error);
    }
  }, []);

  return {
    saveOfflineData,
    getOfflineData,
    clearOfflineData,
    offlineData
  };
}

// Hook for background sync with TypeScript
export function useBackgroundSync(): BackgroundSyncHookReturn {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg: ServiceWorkerRegistration) => {
        setRegistration(reg);
      });
    }
  }, []);

  const requestSync = (tag: string): Promise<void> => {
    if (registration && 'sync' in registration) {
      return (registration as any).sync.register(tag);
    }
    return Promise.reject(new Error('Background sync not supported'));
  };

  return { requestSync };
}

// Hook for managing offline answers with proper typing
export function useOfflineAnswers() {
  const { saveOfflineData, getOfflineData, clearOfflineData } = useOfflineStorage();

  const saveAnswer = (questionId: number, answer: OfflineAnswer): void => {
    const answers = getOfflineAnswers();
    const existingIndex = answers.findIndex(a => a.questionId === questionId);
    
    if (existingIndex >= 0) {
      answers[existingIndex] = answer;
    } else {
      answers.push(answer);
    }
    
    saveOfflineData('answers', answers);
  };

  const getOfflineAnswers = (): OfflineAnswer[] => {
    return getOfflineData('answers') || [];
  };

  const clearAnswers = (): void => {
    clearOfflineData('answers');
  };

  const markAnswersSynced = (questionIds: number[]): void => {
    const answers = getOfflineAnswers();
    const updatedAnswers = answers.map(answer => 
      questionIds.includes(answer.questionId) 
        ? { ...answer, synced: true }
        : answer
    );
    saveOfflineData('answers', updatedAnswers);
  };

  const getUnsyncedAnswers = (): OfflineAnswer[] => {
    return getOfflineAnswers().filter(answer => !answer.synced);
  };

  return {
    saveAnswer,
    getOfflineAnswers,
    clearAnswers,
    markAnswersSynced,
    getUnsyncedAnswers
  };
}

// Hook for notification management
export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async (): Promise<NotificationPermission> => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    }
    return 'denied';
  };

  const showNotification = (title: string, options?: NotificationOptions): void => {
    if (permission === 'granted' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, {
          body: options?.body || '',
          icon: options?.icon || '/icons/icon-192x192.png',
          badge: options?.badge || '/icons/icon-72x72.png',
          ...options
        });
      });
    }
  };

  return {
    permission,
    requestPermission,
    showNotification,
    canNotify: permission === 'granted'
  };
}