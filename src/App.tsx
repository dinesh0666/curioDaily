import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import { FullPageLoading } from './components/LoadingStates';
import OfflineIndicator from './components/OfflineIndicator';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import UpdateNotification from './components/UpdateNotification';
import Layout from './components/Layout';
import { observePerformance, loadCriticalResources } from './utils/performance';

// Lazy load components for better performance
const Welcome = lazy(() => import('./components/Welcome'));
const InterestSelection = lazy(() => import('./components/InterestSelection'));
const DailyChallenge = lazy(() => import('./components/DailyChallenge'));
const ChallengeFeed = lazy(() => import('./components/ChallengeFeed'));
const ProgressDashboard = lazy(() => import('./components/ProgressDashboard'));
const Settings = lazy(() => import('./components/Settings'));

const AppRoutes: React.FC = () => {
  const { state } = useApp();

  // If not onboarded, always show welcome flow
  if (!state.isOnboarded) {
    return (
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<FullPageLoading message="Loading welcome..." />}>
              <Welcome />
            </Suspense>
          } />
          <Route path="/interests" element={
            <Suspense fallback={<FullPageLoading message="Loading interests..." />}>
              <InterestSelection />
            </Suspense>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    );
  }

  // If onboarded, show main app
  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<FullPageLoading message="Loading today's challenge..." />}>
              <DailyChallenge />
            </Suspense>
          } />
          <Route path="/feed" element={
            <Suspense fallback={<FullPageLoading message="Loading challenge feed..." />}>
              <ChallengeFeed />
            </Suspense>
          } />
          <Route path="/progress" element={
            <Suspense fallback={<FullPageLoading message="Loading your progress..." />}>
              <ProgressDashboard />
            </Suspense>
          } />
          <Route path="/settings" element={
            <Suspense fallback={<FullPageLoading message="Loading settings..." />}>
              <Settings />
            </Suspense>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // Initialize performance monitoring
    observePerformance();
    
    // Preload critical resources
    loadCriticalResources().catch(error => 
      console.warn('Failed to preload critical resources:', error)
    );
  }, []);

  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <UpdateNotification />
          <OfflineIndicator />
          <Suspense fallback={<FullPageLoading message="Loading CurioDaily..." />}>
            <AppRoutes />
          </Suspense>
          <PWAInstallPrompt />
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
