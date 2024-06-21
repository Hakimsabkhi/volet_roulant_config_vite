import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setColor } from '../../features/voletSlice'
import './couleurVolet.css'
import { ColorImages } from '../../assets/Data'
import { RootState } from '../../store'; // Assuming you have a RootState type defined in your store file
import useMediaQuery from './useMediaQuery'; // Adjust the path as necessary

interface SelectedColor {
  coulisse: string;
  tablier: string;
  lameFinale: string;
}

interface CouleurVoletProps {
  enableNextButton: (isEnabled: boolean) => void;
}

const CouleurVolet: React.FC<CouleurVoletProps> = ({ enableNextButton }) => {
  const dispatch = useDispatch();
  const selectedColors: SelectedColor = useSelector((state: RootState) => state.volet.selectedColor);
  const [currentSection, setCurrentSection] = useState<keyof SelectedColor>('coulisse');
  const [loading, setLoading] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 1050px)');

  useEffect(() => {
    const allSelected = Object.keys(ColorImages).every(
      (category) => selectedColors[category as keyof SelectedColor] && selectedColors[category as keyof SelectedColor] !== ''
    );
    enableNextButton(allSelected);
  }, [selectedColors, enableNextButton]);

  const handleColorSelection = (colorName: string, category: keyof SelectedColor) => {
    dispatch(setColor({ color: colorName, category }));
    if (isSmallScreen) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (category === 'coulisse') setCurrentSection('tablier');
        if (category === 'tablier') setCurrentSection('lameFinale');
      }, 1000); // 1 second delay
    }
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
          onChange={() => {}} // No action needed on change as the click handler takes care of it
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
    <div>
      <h2>{title}</h2>
      {loading ? (
        <div className="loading-circle"></div>
      ) : (
        <div className="colors-row">{renderColorChoices(section)}</div>
      )}
    </div>
  );

  return (
    <div className="ColorBox">
      {(!isSmallScreen || currentSection === 'coulisse') && renderSection('coulisse', 'Couleurs de Coffre et Coulisse')}
      {(!isSmallScreen || currentSection === 'tablier') && renderSection('tablier', 'Couleurs de Tablier')}
      {(!isSmallScreen || currentSection === 'lameFinale') && renderSection('lameFinale', 'Couleurs de Lame Finale')}
    </div>
  );
};

export default CouleurVolet;
