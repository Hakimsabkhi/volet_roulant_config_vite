import React, { useState, useEffect } from 'react';
import logo from './assets/logo.svg';
import './styles.css';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => (prevProgress >= 100 ? 100 : prevProgress + 5));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-overlay">
        <div className="loading-content">
          <img src={logo} alt="Logo" className="logo-animation" />
          <div className="loading-bar">
            <div className="loading-progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="loading-message">Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
