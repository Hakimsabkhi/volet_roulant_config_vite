import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setColor } from '../../features/voletSlice'
import './couleurVolet.css'
import { ColorImages } from '../../assets/Data'
import { RootState } from '../../store'; // Assuming you have a RootState type defined in your store file

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

  useEffect(() => {
    const allSelected = Object.keys(ColorImages).every(
      (category) => selectedColors[category as keyof SelectedColor] && selectedColors[category as keyof SelectedColor] !== ''
    );
    enableNextButton(allSelected);
  }, [selectedColors, enableNextButton]); // Temporarily remove enableNextButton

  const handleColorSelection = (colorName: string, category: keyof SelectedColor) => {
    dispatch(setColor({ color: colorName, category }));
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

  return (
    <div className="ColorBox">
      <div>
        <h2>Couleur coffre et Coulisse</h2>
        <div className="colors-row">{renderColorChoices('coulisse')}</div>
      </div>
      <div>
        <h2>Couleur Tablier</h2>
        <div className="colors-row">{renderColorChoices('tablier')}</div>
      </div>
      <div>
        <h2>Couleur Lame Finale</h2>
        <div className="colors-row">{renderColorChoices('lameFinale')}</div>
      </div>
    </div>
  );
};

export default CouleurVolet;
