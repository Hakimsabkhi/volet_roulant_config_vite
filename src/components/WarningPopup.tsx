import React from 'react';
import './WarningPopup.css'; // Make sure to create and import the CSS file for styling
import exitIcon from '../assets/exit.png';

interface WarningPopupProps {
  message: string;
  onClose: () => void;
}

const WarningPopup: React.FC<WarningPopupProps> = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <button onClick={onClose} className="close-button" ><img src={exitIcon} alt="Outside View" className="button-close" /></button>
        <h3>Notification</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default WarningPopup;
