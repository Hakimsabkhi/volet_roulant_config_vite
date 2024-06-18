import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './MultiStepInfoDisplay.css';
import DimensionCostCalculator from './calculator/DimensionCostCalculator';
import { motoriseOptions, interrupteurOptions, telecommandeOptions, commandeOptions, manualOptions, sortieDeCableOptions, controlOptions, poseOptions, lameChoices } from '../assets/Data';

// Define types for your state
interface Dimensions {
  Largeur: number;
  Hauteur: number;
}

interface Colors {
  coulisse: string;
  tablier: string;
  lameFinale: string;
}

interface VoletState {
  selectedColor: Colors;
  lameSelection: string;
  dimensions: Dimensions;
  installationType: string;
  ManoeuvreType: string;
  ManualType: string;
  MotoriseType: string;
  TelecommandeType: string;
  InterrupteurType: string;
  SortieDeCableType: string;
}

interface RootState {
  volet: VoletState;
}

// Helper function to get the price of a selected option
const getPrice = (options: any[], selectedOption: string) => {
  const option = options.find(option => option.label === selectedOption);
  return option ? option.price : 0;
};

const MultiStepInfoDisplay: React.FC = () => {
  const [dimensionCost, setDimensionCost] = useState(0);

  const selectedCoulisseColor = useSelector((state: RootState) => state.volet.selectedColor.coulisse);
  const selectedTablierColor = useSelector((state: RootState) => state.volet.selectedColor.tablier);
  const selectedLameFinaleColor = useSelector((state: RootState) => state.volet.selectedColor.lameFinale);
  const lameSelection = useSelector((state: RootState) => state.volet.lameSelection);
  const dimensions = useSelector((state: RootState) => state.volet.dimensions);
  const installationType = useSelector((state: RootState) => state.volet.installationType);
  const ManoeuvreType = useSelector((state: RootState) => state.volet.ManoeuvreType);
  const ManualType = useSelector((state: RootState) => state.volet.ManualType);
  const MotoriseType = useSelector((state: RootState) => state.volet.MotoriseType);
  const TelecommandeType = useSelector((state: RootState) => state.volet.TelecommandeType);
  const InterrupteurType = useSelector((state: RootState) => state.volet.InterrupteurType);
  const SortieDeCableType = useSelector((state: RootState) => state.volet.SortieDeCableType);

  const lameSelectionPrice = getPrice(lameChoices, lameSelection);
  const installationTypePrice = getPrice(poseOptions, installationType);
  const motoriseTypePrice = getPrice(motoriseOptions, MotoriseType);
  const telecommandePrice = getPrice(telecommandeOptions, TelecommandeType);
  const interrupteurPrice = getPrice(interrupteurOptions, InterrupteurType);
  const sortieDeCablePrice = getPrice(sortieDeCableOptions, SortieDeCableType);

  // Simplistic total price calculation for demonstration
  const totalPrice = lameSelectionPrice + installationTypePrice + motoriseTypePrice + telecommandePrice + interrupteurPrice + sortieDeCablePrice + dimensionCost;

  return (
    <div className="info-display">
      <table>
        <tbody>
          <tr>
            <th>Type de Lame</th>
            <td>{lameSelection}</td>
            <td className="price">{lameSelectionPrice}€</td>
          </tr>
          <tr>
            <th>Dimensions</th>
            <td>
              Largeur: {dimensions.Largeur} mm, Hauteur: {dimensions.Hauteur} mm
            </td>
            <td className="price"><DimensionCostCalculator dimensions={dimensions} onCostCalculated={setDimensionCost} /></td>
          </tr>
          <tr>
            <th>Type d'Installation</th>
            <td>{installationType}</td>
            <td className="price">{installationTypePrice}€</td>
          </tr>
          <tr>
            <th>Couleurs</th>
            <td>
              Coulisse: {selectedCoulisseColor} / Tablier: {selectedTablierColor} / Lame Finale: {selectedLameFinaleColor}
            </td>
            <td className="price">30€</td>
          </tr>
          <tr>
            <th>Type de Manoeuvre</th>
            <td>{ManoeuvreType}</td>
            <td className="price">{ManoeuvreType === 'Motorisé' ? motoriseTypePrice : 0}€</td>
          </tr>
          {ManoeuvreType === 'Manuel' && (
            <tr>
              <th>Outil de commande</th>
              <td>{ManualType}</td>
              <td className="price">{getPrice(manualOptions, ManualType)}€</td>
            </tr>
          )}
          {ManoeuvreType === 'Motorisé' && (
            <>
              <tr>
                <th>Type de motorisation</th>
                <td>{MotoriseType}</td>
                <td className="price">{motoriseTypePrice}€</td>
              </tr>
              {MotoriseType === 'Radio' && (
                <tr>
                  <th>Télécommande</th>
                  <td>{TelecommandeType}</td>
                  <td className="price">{telecommandePrice}€</td>
                </tr>
              )}
              {MotoriseType === 'Filaire' && (
                <>
                  <tr>
                    <th>Interrupteur</th>
                    <td>{InterrupteurType}</td>
                    <td className="price">{interrupteurPrice}€</td>
                  </tr>
                  <tr>
                    <th>Sortie de cable</th>
                    <td>{SortieDeCableType}</td>
                    <td className="price">{sortieDeCablePrice}€</td>
                  </tr>
                </>
              )}
            </>
          )}
        </tbody>
      </table>
      <table style={{ width: '205px', textAlign: 'right', marginLeft: 'auto', marginRight: '0' }}>
        <tbody>
          <tr>
            <th>Total HT</th>
            <td className="price">{totalPrice.toFixed(2)}€</td>
          </tr>
          <tr>
            <th>Total TTC</th>
            <td className="price">{totalPrice.toFixed(2)}€</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MultiStepInfoDisplay;
