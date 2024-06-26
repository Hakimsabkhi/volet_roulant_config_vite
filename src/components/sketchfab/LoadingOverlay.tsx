// LoadingOverlay.tsx
import React from 'react';
import logo from '../../assets/logo.svg';
import './LoadingOverlay.css';
import { LoadingOverlayProps } from "../../interfaces";

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isBlurred, progress }) => {
  return isBlurred ? (
    <div className="loading-Viewer">
      <img src={logo} alt="Loading..." />
      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  ) : null;
};

export default LoadingOverlay;
