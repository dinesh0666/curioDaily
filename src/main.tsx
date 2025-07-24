import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { registerServiceWorker } from './utils/pwa'
import { observePerformance } from './utils/performance'

// Initialize PWA features
registerServiceWorker().catch(error => 
  console.warn('Service worker registration failed:', error)
);

// Initialize performance monitoring
observePerformance();

// Handle app update notifications
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // Show update notification to user
    console.log('App has been updated! Please refresh.');
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/curioDaily">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
