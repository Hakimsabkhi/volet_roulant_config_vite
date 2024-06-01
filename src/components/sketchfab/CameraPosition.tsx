import React from 'react';

interface CameraPositionProps {
  position: { x: number; y: number; z: number };
  setPosition: (position: { x: number; y: number; z: number }) => void;
  target: { x: number; y: number; z: number };
  setTarget: (target: { x: number; y: number; z: number }) => void;
}

const CameraPosition: React.FC<CameraPositionProps> = ({ position, setPosition, target, setTarget }) => {
  return (
    <div className='overlay-Camera' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        Camera Position: 
        X: <input 
          type="number" 
          value={position.x} 
          id="positionX" 
          name="positionX" 
          onChange={(e) => setPosition({ ...position, x: parseFloat(e.target.value) })} 
        />
        Y: <input 
          type="number" 
          value={position.y} 
          id="positionY" 
          name="positionY" 
          onChange={(e) => setPosition({ ...position, y: parseFloat(e.target.value) })} 
        />
        Z: <input 
          type="number" 
          value={position.z} 
          id="positionZ" 
          name="positionZ" 
          onChange={(e) => setPosition({ ...position, z: parseFloat(e.target.value) })} 
        />
      </div>
      <div>
        Camera Target:
        X: <input 
          type="number" 
          value={target.x} 
          id="targetX" 
          name="targetX" 
          onChange={(e) => setTarget({ ...target, x: parseFloat(e.target.value) })} 
        />
        Y: <input 
          type="number" 
          value={target.y} 
          id="targetY" 
          name="targetY" 
          onChange={(e) => setTarget({ ...target, y: parseFloat(e.target.value) })} 
        />
        Z: <input 
          type="number" 
          value={target.z} 
          id="targetZ" 
          name="targetZ" 
          onChange={(e) => setTarget({ ...target, z: parseFloat(e.target.value) })} 
        />
      </div>
    </div>
  );
}

export default CameraPosition;
