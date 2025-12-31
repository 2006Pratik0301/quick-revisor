import React, { useState, useEffect } from 'react';
import './InstallPrompt.css';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return; // App is already installed
    }

    // Check if user dismissed recently (within 7 days)
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return; // Don't show if dismissed within last 7 days
      }
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      // Clear dismissal if user installed
      localStorage.removeItem('installPromptDismissed');
    } else {
      console.log('User dismissed the install prompt');
      // Store dismissal timestamp
      localStorage.setItem('installPromptDismissed', Date.now().toString());
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Store dismissal timestamp
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="install-prompt-overlay">
      <div className="install-prompt-card">
        <div className="install-prompt-content">
          <div className="install-prompt-icon">📱</div>
          <h3>Install Quick Revisor</h3>
          <p>Install this application on your device for a better experience.</p>
          <div className="install-prompt-actions">
            <button
              className="btn btn-secondary"
              onClick={handleDismiss}
            >
              Not Now
            </button>
            <button
              className="btn btn-primary"
              onClick={handleInstallClick}
            >
              Install App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;

