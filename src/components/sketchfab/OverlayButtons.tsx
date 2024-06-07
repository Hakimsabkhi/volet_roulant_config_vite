import React from 'react';
import './Viewer.css';

interface OverlayButtonsProps {
  handleViewChange: (position: [number, number, number], target: [number, number, number], duration?: number, callback?: (err: any) => void) => void;
  toggleUserInteraction: () => void;
  userInteractionEnabled: boolean;
}

const OverlayButtons: React.FC<OverlayButtonsProps> = ({ handleViewChange, toggleUserInteraction, userInteractionEnabled }) => {
  const handleOutsideView = () => {
    console.log("Setting camera to Outside View");
    const position: [number, number, number] = [2.6201731305279115, 1.7391765218021726, 2.246155724912089];
    const target: [number, number, number] = [2.8558404087912743, -7.138095141931465, 2.246155724912087];
    console.log("Position:", position, "Target:", target);
    handleViewChange(position, target, 2, (err) => {
      if (!err) {
        console.log('Camera moved to Outside View');
      } else {
        console.error('Failed to move camera:', err);
      }
    });
  };

  const handleInsideView = () => {
    console.log("Setting camera to Inside View");
    const position: [number, number, number] = [1.982156799332056, -13.283465458296892, 2.2461557249120934];
    const target: [number, number, number] = [2.8558404087912743, -7.138095141931465, 2.246155724912087];
    console.log("Position:", position, "Target:", target);
    handleViewChange(position, target, 2, (err) => {
      if (!err) {
        console.log('Camera moved to Inside View');
      } else {
        console.error('Failed to move camera:', err);
      }
    });
  };

  return (
    <div className="overlay-buttons">
      <button className="InteractionButton" onClick={handleOutsideView}>
        Outside View
      </button>
      <button className="InteractionButton" onClick={handleInsideView}>
        Inside View
      </button>
      <button className="InteractionButton" onClick={toggleUserInteraction}>
        {userInteractionEnabled ? 'Disable Interaction' : 'Enable Interaction'}
      </button>
    </div>
  );
};

export default OverlayButtons;
