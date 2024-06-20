import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './TotalCostCalculator.css';
import Information from '../formulaire/info';
import DimensionCostCalculator from './dimensionCostCalculator';
import {
  motoriseOptions,
  interrupteurOptions,
  telecommandeOptions,
  commandeOptions,
  manualOptions,
  sortieDeCableOptions,
  controlOptions,
  poseOptions,
  lameChoices
} from '../../assets/Data';

// Import selectors
import {
  selectDimensions,
  selectInstallationType,
  selectSelectedColor,
  selectManoeuvre,
  selectManual,
  selectMotorise,
  selectTelecommande,
  selectCommande,
  selectInterrupteur,
  selectSortieDeCable,
  selectLameSelection
} from '../../features/voletSlice';

interface Option {
  label: string;
  description: string;
  image: string;
  price: number;
}

// Helper function to get the price of a selected option
const getPrice = (options: Option[], selectedOption: string): number => {
  const option = options.find(option => option.label === selectedOption);
  return option ? option.price : 0;
};

const TotalCostCalculateur: React.FC = () => {
  const dimensions = useSelector(selectDimensions);
  const installationType = useSelector(selectInstallationType);
  const selectedColor = useSelector(selectSelectedColor);
  const manoeuvreType = useSelector(selectManoeuvre);
  const manualType = useSelector(selectManual);
  const motoriseType = useSelector(selectMotorise);
  const telecommandeType = useSelector(selectTelecommande);
  const commandeType = useSelector(selectCommande);
  const interrupteurType = useSelector(selectInterrupteur);
  const sortieDeCableType = useSelector(selectSortieDeCable);
  const lameSelection = useSelector(selectLameSelection);

  const [costHT, setCostHT] = useState(''); // Cost excluding VAT
  const [costTTC, setCostTTC] = useState(''); // Cost including VAT
  const [costTotalTTC, setCostTotalTTC] = useState(''); // Total cost including VAT
  const [multiplier, setMultiplier] = useState(1);
  const [showInformation, setShowInformation] = useState(false); // State to control the display of Information component
  const [dimensionCost, setDimensionCost] = useState(0);

  useEffect(() => {
    const calculateCosts = () => {
      const lameSelectionPrice = getPrice(lameChoices, lameSelection);
      const installationTypePrice = getPrice(poseOptions, installationType);
      const manoeuvreTypePrice = getPrice(controlOptions, manoeuvreType);
      const motoriseTypePrice = getPrice(motoriseOptions, motoriseType);
      const telecommandePrice = getPrice(telecommandeOptions, telecommandeType);
      const interrupteurPrice = getPrice(interrupteurOptions, interrupteurType);
      const sortieDeCablePrice = getPrice(sortieDeCableOptions, sortieDeCableType);
      const manualTypePrice = getPrice(manualOptions, manualType);

      const additionalCosts = lameSelectionPrice + installationTypePrice + manoeuvreTypePrice + motoriseTypePrice + telecommandePrice + interrupteurPrice + sortieDeCablePrice + manualTypePrice;

      const costHT = dimensionCost + additionalCosts;
      const costTTC = costHT * 1.2; // Add 20% VAT to the HT price
      const costTotalTTC = costTTC * multiplier; // Corrected to multiply the total cost including VAT

      setCostHT(costHT.toFixed(2));
      setCostTTC(costTTC.toFixed(2));
      setCostTotalTTC(costTotalTTC.toFixed(2));
    };

    calculateCosts();
  }, [dimensions, multiplier, manoeuvreType, dimensionCost, installationType, motoriseType, telecommandeType, interrupteurType, sortieDeCableType, lameSelection, manualType]);

  const handleIncrement = () => setMultiplier(prev => prev + 1);
  const handleDecrement = () => setMultiplier(prev => Math.max(1, prev - 1));
  const handleCloseInformation = () => setShowInformation(false); // Function to handle closing Information component

  return (
    <div className="cost-calculator-container">
      <div className="total-cost">
        <h3 className="cost-calculator-cost">Prix Total TTC: {costTotalTTC} €</h3>
      </div>    
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

      <DimensionCostCalculator dimensions={dimensions} onCostCalculated={setDimensionCost} />

      {showInformation && <Information onClose={handleCloseInformation} />} 
    </div>
  );
}

export default TotalCostCalculateur;
