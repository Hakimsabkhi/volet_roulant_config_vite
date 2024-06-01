import React, { useState } from 'react';
import CameraPosition from './components/sketchfab/CameraPosition';
import Viewer from './components/sketchfab/Viewer';
import MultiStepMenu from './components/MultiStepMenu';
import './styles.css';

const App: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const handleSelectionsChange = (selections: any) => {
    console.log('Selections changed:', selections);
  };

  return (
    <div className='MainStyle' style={{ display: 'flex' }}>
      <MultiStepMenu onSelectionsChange={handleSelectionsChange} />
      <Viewer setPosition={setPosition} setTarget={setTarget} />
      {/* Uncomment the following line if you need to use CameraPosition */}
      {/* <CameraPosition position={position} setPosition={setPosition} target={target} setTarget={setTarget} /> */}
    </div>
  );
}

export default App;

/* Position (-11.275731704365285, 8.560231150026695, 1.9859704541419265) */
/* Target (-6.300441369773406, 2.1153088691086257, 1.9888712489808216) */
