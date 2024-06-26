import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../../features/voletSlice';
import './couleurVolet.css';
import { ColorImages } from '../../assets/Data';
import { RootState } from '../../store'; 
import useMediaQuery from './useMediaQuery';
import { SelectedColor, CouleurVoletProps } from "../../interfaces";

const CouleurVolet: React.FC<CouleurVoletProps> = ({ enableNextButton, setIsMobileConfigured }) => {
  const dispatch = useDispatch(); 
  const selectedColors: SelectedColor = useSelector((state: RootState) => state.volet.selectedColor);
  const isMobile = useMediaQuery('(max-width: 1050px)');
  const [loading, setLoading] = useState(false);
  const [visibleSection, setVisibleSection] = useState<keyof SelectedColor>('coulisse');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const allSelected = Object.keys(ColorImages).every(
      (category) => selectedColors[category as keyof SelectedColor] && selectedColors[category as keyof SelectedColor] !== ''
    );
    enableNextButton(allSelected);

    if (isMobile && allSelected) {
      setIsConfigured(true);
      setIsMobileConfigured(true); 
    } else {
      setIsConfigured(false);
      setIsMobileConfigured(false); 
    }
  }, [selectedColors, enableNextButton, isMobile, setIsMobileConfigured]);

  const handleColorSelection = (colorName: string, category: keyof SelectedColor) => {
    if (isMobile) {
      setLoading(true);
      setTimeout(() => {
        dispatch(setColor({ color: colorName, category }));
        setLoading(false);
        if (category === 'coulisse') setVisibleSection('tablier');
        if (category === 'tablier') setVisibleSection('lameFinale');
        if (category === 'lameFinale') setIsConfigured(true);
      }, 1000); // Simulate loading delay
    } else {
      dispatch(setColor({ color: colorName, category }));
      if (category === 'coulisse') setVisibleSection('tablier');
      if (category === 'tablier') setVisibleSection('lameFinale');
      if (category === 'lameFinale') setIsConfigured(true);
    }
  };

  const handleReconfigure = () => {
    setIsConfigured(false);
    setIsMobileConfigured(false); 
    setVisibleSection('coulisse');
    // Optionally reset selected colors
    dispatch(setColor({ color: '', category: 'coulisse' }));
    dispatch(setColor({ color: '', category: 'tablier' }));
    dispatch(setColor({ color: '', category: 'lameFinale' }));
  };

  const renderColorChoices = (category: keyof SelectedColor) => {
    const colors = ColorImages[category] || {};
    return Object.entries(colors).map(([colorName, colorCode]) => (
      <div
        key={`${category}-${colorName}`}
        className={`color-choice ${colorName === selectedColors[category] ? 'selected' : ''}`}
        onClick={() => handleColorSelection(colorName, category)}
        style={{ cursor: 'pointer', textAlign: 'center' }}
      >
        <input
          type="checkbox"
          id={`label-${colorName}-${category}`}
          name={`color-${category}`}
          value={colorName}
          checked={colorName === selectedColors[category]}
          onChange={() => {}} 
          aria-labelledby={`label-${colorName}-${category}`}
          className="ColorInput"
          required
        />
        <div>
          <span>{colorName.replace(/-/g, ' ')}</span>
        </div>
      </div>
    ));
  };

  const renderSection = (section: keyof SelectedColor, title: string) => (
    <div className="ManoeuvreSection">
      <h2 className="text">{title}</h2>
      <div className="OptionSection">
        {loading ? (
          <div className="loading-circle"></div>
        ) : (
          <div className="colors-row">{renderColorChoices(section)}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="ma-containerG">
      {isMobile && isConfigured ? (
        <div className="completion-box">
          <p className="completion-message">Votre volet est bien colorisé</p>
          <button onClick={handleReconfigure} className="nav-btn">Recoloriser</button>
        </div>
      ) : (
        <>
          {(!isMobile || visibleSection === 'coulisse') && renderSection('coulisse', 'Couleurs de Coffre et Coulisse')}
          {(!isMobile || visibleSection === 'tablier') && renderSection('tablier', 'Couleurs de Tablier')}
          {(!isMobile || visibleSection === 'lameFinale') && renderSection('lameFinale', 'Couleurs de Lame Finale')}
        </>
      )}
    </div>
  );
};

export default CouleurVolet;
