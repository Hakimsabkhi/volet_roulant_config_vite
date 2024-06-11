import React, { useState } from 'react';
import CameraPosition from './components/sketchfab/CameraPosition';
import Viewer from './components/sketchfab/Viewer';
import MultiStepMenu from './components/MultiStepMenu';
import './styles.css';

const App: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const handleSelectionsChange = (selections: any) => { };

  return (
    <div className='MainStyle' style={{ display: 'flex' }}>
      <MultiStepMenu onSelectionsChange={handleSelectionsChange} />
      <Viewer setPosition={setPosition} setTarget={setTarget} />
    {/*   <CameraPosition position={position} setPosition={setPosition} target={target} setTarget={setTarget} /> */}
    </div>
  );
}

export default App;

