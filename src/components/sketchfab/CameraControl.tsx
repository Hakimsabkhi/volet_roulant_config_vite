import React from 'react';

interface CameraControlProps {
  handleViewChange: (position: { x: number; y: number; z: number }, target: { x: number; y: number; z: number }) => void;
  toggleUserInteraction: () => void;
  userInteractionEnabled: boolean;
}

const CameraControl: React.FC<CameraControlProps> = ({ handleViewChange, toggleUserInteraction, userInteractionEnabled }) => {
  return (
    <div className="overlay-buttons">
      <button className="InteractionButton" onClick={() => handleViewChange({ x: -10.7206, y: 7.83963, z: 1.6895 }, { x: -4.6246, y: -0.74928, z: 1.57804 })}>
        Outside View
      </button>
      <button className="InteractionButton" onClick={() => handleViewChange({ x: -0.20124, y: -3.4002, z: 1.5615 }, { x: -5.12, y: 3.01, z: 1.56 })}>
        Inside View
      </button>
      <button className="InteractionButton" onClick={toggleUserInteraction}>
        {userInteractionEnabled ? 'Disable Interaction' : 'Enable Interaction'}
      </button>
    </div>
  );
};

export default CameraControl;
