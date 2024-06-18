import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDimensions } from '../../features/voletSlice';
import './TotalCostCalculator.css';
// Import the Information component, adjust the path as necessary
import Information from '../formulaire/info';

function DimensionCostCalculator() {
  const dimensions = useSelector(selectDimensions);
  const [costHT, setCostHT] = useState(''); // Cost excluding VAT
  const [costTTC, setCostTTC] = useState(''); // Cost including VAT
  const [costTotalTTC, setCostTotalTTC] = useState(''); // Total cost including VAT
  const [multiplier, setMultiplier] = useState(1);
  const [showInformation, setShowInformation] = useState(false); // State to control the display of Information component

  useEffect(() => {
    const calculateCosts = () => {
      const area = dimensions.Largeur * dimensions.Hauteur;
      const baseCost = 0.00018 * area + 256.04298;
      const costHT = baseCost;
      const costTTC = costHT * 1.2; // Add 20% VAT to the HT price
      const costTotalTTC = costTTC * multiplier; // Corrected to multiply the total cost including VAT
      setCostHT(costHT.toFixed(2));
      setCostTTC(costTTC.toFixed(2));
      setCostTotalTTC(costTotalTTC.toFixed(2));
    };

    calculateCosts();
  }, [dimensions, multiplier]);

  const handleIncrement = () => setMultiplier((prev) => prev + 1);
  const handleDecrement = () => setMultiplier((prev) => Math.max(1, prev - 1));
  const handleCloseInformation = () => setShowInformation(false); // Function to handle closing Information component

  return (
    <div className="cost-calculator-container">
      <div className="total-cost"><h3 className="cost-calculator-cost">Prix Total TTC: {costTotalTTC} €</h3></div>    
      <div className="presouscost">
        <div className='PrixUnitaire'>
          <h2 className="cost-calculator-detail">Prix unitaire HT : {costHT} €</h2>
          <h2 className="cost-calculator-detail">Prix unitaire TTC : {costTTC} €</h2>
        </div>
        <div className="multiplier-controls">
          <h2>Quantité</h2>
          <div className="spaceBtn">
            <button title="Decrease quantity" onClick={handleDecrement}>
              -
            </button>
            <span>{multiplier}</span>
            <button title="Increase quantity" onClick={handleIncrement}>
              +
            </button>
          </div>
        </div>
      </div>
    
      {showInformation && <Information onClose={handleCloseInformation} />} 
    </div>
  );
}

export default DimensionCostCalculator;
