import React, { useState } from "react";
import CameraPosition from "./components/sketchfab/CameraPosition";
import Viewer from "./components/sketchfab/Viewer";
import MultiStepMenu from "./components/MultiStepMenu";
import "./styles.css";
import ConfigIconIcon from './assets/ConfigIcon.png';

const App: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSelectionsChange = (selections: any) => {};

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="MainStyle">
      <div className="boxConfig">
      <button className="Menu-button" onClick={toggleMenu}>
      <img src={ConfigIconIcon} alt="Outside View" className="button-icon" />
      </button>
      <h2>configurer mon volet</h2>
      </div>
      {menuVisible && (
        <div className="absolute-div">
          <MultiStepMenu onSelectionsChange={handleSelectionsChange} />
        </div>
      )}
      <Viewer setPosition={setPosition} setTarget={setTarget} />
      {/* <CameraPosition position={position} setPosition={setPosition} target={target} setTarget={setTarget} /> */}
    </div>
  );
};

export default App;
