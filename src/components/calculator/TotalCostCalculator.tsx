import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './TotalCostCalculator.css';
import Information from '../formulaire/info';
import DimensionCostCalculator from './dimensionCostCalculator';
import { productDetails } from "../../interfaces";

import {
  optionsMotorisations,
  optionsInterrupteur,
  optionsTelecomande,
  optionCommandeManuel,
  sortieDeCable,
  optionManoeuvre,
  poseOptions,
  lameChoices
} from '../../assets/Data';

// Import selectors
import {
  selectDimensions,
  selectposeInstalled,
  selectManoeuvre,
  selectManual,
  selectMotorise,
  selectTelecommande,
  selectInterrupteur,
  selectSortieDeCable,
  selectlameSelected
} from '../../features/voletSlice';


// Helper function to get the price of a selected option
const getPrice = (options: productDetails[], selectedOption: string): number => {
  const option = options.find(option => option.label === selectedOption);
  return option ? option.price : 0;
};

const TotalCostCalculateur: React.FC = () => {
  const dimensions = useSelector(selectDimensions);
  const poseInstalled = useSelector(selectposeInstalled);
  const manoeuvreSelected = useSelector(selectManoeuvre);
  const commandeManualSelected = useSelector(selectManual);
  const optionMotorisationSelected = useSelector(selectMotorise);
  const optionTelecomandeSelected = useSelector(selectTelecommande);
  const optionInterrupteurSelected = useSelector(selectInterrupteur);
  const sortieDeCableSelected = useSelector(selectSortieDeCable);
  const lameSelected = useSelector(selectlameSelected);

  const [costHT, setCostHT] = useState(''); // Cost excluding VAT
  const [costTTC, setCostTTC] = useState(''); // Cost including VAT
  const [costTotalTTC, setCostTotalTTC] = useState(''); // Total cost including VAT
  const [multiplier, setMultiplier] = useState(1);
  const [showInformation, setShowInformation] = useState(false); // State to control the display of Information component
  const [dimensionCost, setDimensionCost] = useState(0);

  useEffect(() => {
    const calculateCosts = () => {
      const lameSelectedPrice = getPrice(lameChoices, lameSelected);
      const poseInstalledPrice = getPrice(poseOptions, poseInstalled);
      const manoeuvreSelectedPrice = getPrice(optionManoeuvre, manoeuvreSelected);
      const optionMotorisationSelectedPrice = getPrice(optionsMotorisations, optionMotorisationSelected);
      const telecommandePrice = getPrice(optionsTelecomande, optionTelecomandeSelected);
      const interrupteurPrice = getPrice(optionsInterrupteur, optionInterrupteurSelected);
      const sortieDeCablePrice = getPrice(sortieDeCable, sortieDeCableSelected);
      const commandeManualSelectedPrice = getPrice(optionCommandeManuel, commandeManualSelected);

      const additionalCosts = lameSelectedPrice + poseInstalledPrice + manoeuvreSelectedPrice + optionMotorisationSelectedPrice + telecommandePrice + interrupteurPrice + sortieDeCablePrice + commandeManualSelectedPrice;

      const costHT = dimensionCost + additionalCosts;
      const costTTC = costHT * 1.2; // Add 20% VAT to the HT price
      const costTotalTTC = costTTC * multiplier; // Corrected to multiply the total cost including VAT

      setCostHT(costHT.toFixed(2));
      setCostTTC(costTTC.toFixed(2));
      setCostTotalTTC(costTotalTTC.toFixed(2));
    };

    calculateCosts();
  }, [dimensions, multiplier, manoeuvreSelected, dimensionCost, poseInstalled, optionMotorisationSelected, optionTelecomandeSelected, optionInterrupteurSelected, sortieDeCableSelected, lameSelected, commandeManualSelected]);

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
