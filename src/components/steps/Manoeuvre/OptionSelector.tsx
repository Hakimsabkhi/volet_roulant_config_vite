import React, { useState, useRef } from 'react';
import '../manoeuvre.css';

export interface Option {
  label: string;
  image?: string;
  description?: string;
}

interface OptionSelectorProps {
  options: Option[];
  selectedOption: string;
  handleChange: (option: Option) => void;
  type: string;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({ options, selectedOption, handleChange, type }) => {
  const [hoveredChoice, setHoveredChoice] = useState<Option | null>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLLabelElement>, option: Option) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      setPopupPosition({ top: containerRect.top + window.scrollY, left: containerRect.right });
    }
    setHoveredChoice(option);
  };

  return (
    <div className="Main-container">
      <div ref={containerRef} className="ma-container">
        {options.map((option, index) => (
          <label
            key={index}
            onClick={() => handleChange(option)}
            className={`ma-btn ${option.label === selectedOption ? 'selected' : ''}`}
            onMouseEnter={(e) => handleMouseEnter(e, option)}
            onMouseLeave={() => setHoveredChoice(null)}
          >
            <div className="details">
              <div className="ma-sous-details">
                <h2 className="choice-label">{option.label}</h2>
                <input
                  type="checkbox"
                  id={`checkbox-${option.label}-${type}`}
                  name={`checkbox-${option.label}-${type}`}
                  checked={option.label === selectedOption}
                  onChange={() => {}} // This is intentionally left empty
                  className="choice-checkbox"
                />
              </div>
            </div>
          </label>
        ))}
      </div>
      {hoveredChoice && (
        <div className="popup-info" style={{ top: `${popupPosition.top}px`, left: `${popupPosition.left}px` }}>
          <h2 className="choice-label">{hoveredChoice.label}</h2>
          {hoveredChoice.image && <img className="popup-image" src={hoveredChoice.image} alt={hoveredChoice.label} />}
          <p>{hoveredChoice.description}</p>
        </div>
      )}
    </div>
  );
};

export default OptionSelector;
