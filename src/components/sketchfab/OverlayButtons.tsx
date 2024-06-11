import React, { useState, useRef, useEffect } from 'react';
import './Viewer.css';
import outsideViewIcon from '../../assets/front_view.png';
import insideViewIcon from '../../assets/back_view.png';
import OsideViewIcon from '../../assets/oside_view.png';
import IsideViewIcon from '../../assets/iside_view.png';
import disableInteractionIcon from '../../assets/camera.png';
import enableInteractionIcon from '../../assets/camera.png';

interface OverlayButtonsProps {
  handleViewChange: (position: [number, number, number], target: [number, number, number], duration?: number, callback?: (err: any) => void) => void;
  toggleUserInteraction: () => void;
  userInteractionEnabled: boolean;
}

const OverlayButtons: React.FC<OverlayButtonsProps> = ({ handleViewChange, toggleUserInteraction, userInteractionEnabled }) => {
  const [rotating, setRotating] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const angleRef = useRef(0);

  const initialPosition: [number, number, number] = [2.6201731305279115, 1.7391765218021726, 2.246155724912089];
  const target: [number, number, number] = [2.8558404087912743, -7.138095141931465, 2.246155724912087];

  useEffect(() => {
    const dx = initialPosition[0] - target[0];
    const dy = initialPosition[1] - target[1];
    angleRef.current = Math.atan2(dy, dx);
  }, []);

  const handleOutsideView = () => {
    console.log("Setting camera to Outside View");
    handleViewChange(initialPosition, target, 2, (err) => {
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
    handleViewChange(position, target, 2, (err) => {
      if (!err) {
        console.log('Camera moved to Inside View');
      } else {
        console.error('Failed to move camera:', err);
      }
    });
  };

  const handleOSideView = () => {
    console.log("Setting camera to Side View");
    const position: [number, number, number] = [-2.132227227383745, -5.179208100843676, 2.6165936872842366];
    handleViewChange(position, target, 2, (err) => {
      if (!err) {
        console.log('Camera moved to Side View');
      } else {
        console.error('Failed to move camera:', err);
      }
    });
  };

  const handleISideView = () => {
    console.log("Setting camera to Side View");
    const position: [number, number, number] = [7.70293103476822, -9.38076545101763, 2.24615572491208];
    handleViewChange(position, target, 2, (err) => {
      if (!err) {
        console.log('Camera moved to Side View');
      } else {
        console.error('Failed to move camera:', err);
      }
    });
  };

  const rotateCamera = () => {
    const radius = 5; // Set the radius distance from the target

    const x = target[0] + radius * Math.cos(angleRef.current);
    const y = target[1] + radius * Math.sin(angleRef.current);
    const z = target[2]; // Keep z position constant

    const position: [number, number, number] = [x, y, z];

    handleViewChange(position, target, 0.5);
    angleRef.current += Math.PI / 180; // Rotate by 1 degree (Math.PI / 180 radians) each time
  };

  const toggleRotation = () => {
    if (rotating) {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
      setRotating(false);
      setButtonsDisabled(false);
    } else {
      rotationIntervalRef.current = setInterval(rotateCamera, 100);
      setRotating(true);
      setButtonsDisabled(true);
    }
  };

  return (
    <div className="overlay-buttons">
      {/* <button onClick={toggleUserInteraction} className="toggle-button" disabled={buttonsDisabled}>
        <img src={userInteractionEnabled ? disableInteractionIcon : enableInteractionIcon} alt="Toggle Interaction" className="button-icon" />
      </button> */}
      <button onClick={handleOutsideView} className="toggle-button" disabled={buttonsDisabled}>
        <img src={outsideViewIcon} alt="Outside View" className="button-icon" />
      </button>
      <button onClick={handleInsideView} className="toggle-button" disabled={buttonsDisabled}>
        <img src={insideViewIcon} alt="Inside View" className="button-icon" />
      </button>
      <button onClick={handleOSideView} className="toggle-button" disabled={buttonsDisabled}>
        <img src={OsideViewIcon} alt="Side View" className="button-icon" />
      </button>
      <button onClick={handleISideView} className="toggle-button" disabled={buttonsDisabled}>
        <img src={IsideViewIcon} alt="Side View" className="button-icon" />
      </button>
      <button onClick={toggleRotation} className="toggle-button">
      <img src={disableInteractionIcon} alt="Toggle Interaction" className="button-icon" />
      </button>
    </div>
  );
};

export default OverlayButtons;
