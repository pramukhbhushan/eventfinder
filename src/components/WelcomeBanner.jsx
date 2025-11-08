import { useState, useEffect } from 'react';
import '../styles/WelcomeBanner.css';

const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has previously dismissed the banner
    const dismissed = localStorage.getItem('welcomeBannerDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('welcomeBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="welcome-banner">
      <div className="welcome-content">
        <h3>Welcome to TerpFinder</h3>
        <p>You can add an event by clicking the + button or explore live events on the map. Filter events by type using the sidebar checkboxes.</p>
      </div>
      <button className="welcome-close" onClick={handleDismiss} aria-label="Close welcome banner">
        ×
      </button>
    </div>
  );
};

export default WelcomeBanner;
