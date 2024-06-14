import React from 'react'
import { useSelector } from 'react-redux'
import './MultiStepInfoDisplay.css'

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

const MultiStepInfoDisplay: React.FC = () => {
  const prices = {
    lameSelection: 0.0, // Example price
    dimensions: 0.0, // Example base price for dimensions
    installationType: 0.0,
    selectedColors: 0.0, // Flat rate for any color selection
    ManoeuvreType: 0.0 // Example price for ManoeuvreType
  }

  const selectedCoulisseColor = useSelector((state: RootState) => state.volet.selectedColor.coulisse)
  const selectedTablierColor = useSelector((state: RootState) => state.volet.selectedColor.tablier)
  const selectedLameFinaleColor = useSelector((state: RootState) => state.volet.selectedColor.lameFinale)
  const lameSelection = useSelector((state: RootState) => state.volet.lameSelection)
  const dimensions = useSelector((state: RootState) => state.volet.dimensions)
  const installationType = useSelector((state: RootState) => state.volet.installationType)
  const ManoeuvreType = useSelector((state: RootState) => state.volet.ManoeuvreType)
  const ManualType = useSelector((state: RootState) => state.volet.ManualType)
  const MotoriseType = useSelector((state: RootState) => state.volet.MotoriseType)
  const TelecommandeType = useSelector((state: RootState) => state.volet.TelecommandeType)
  const InterrupteurType = useSelector((state: RootState) => state.volet.InterrupteurType)
  const SortieDeCableType = useSelector((state: RootState) => state.volet.SortieDeCableType)

  // Simplistic total price calculation for demonstration
  const totalPrice = prices.lameSelection + prices.dimensions + prices.installationType + prices.selectedColors + prices.ManoeuvreType

  return (
    <div className="info-display">
      <table>
        <tbody>
          <tr>
            <th>Type de Lame</th>
            <td>{lameSelection}</td>
            <td className="price">{prices.lameSelection}€</td>
          </tr>
          <tr>
            <th>Dimensions</th>
            <td>
              Largeur: {dimensions.Largeur} mm, Hauteur: {dimensions.Hauteur} mm
            </td>
            <td className="price">{prices.dimensions}€</td>
          </tr>
          <tr>
            <th>Type d'Installation</th>
            <td>{installationType}</td>
            <td className="price">{prices.installationType}€</td>
          </tr>
          <tr>
            <th>Couleurs</th>
            <td>
              Coulisse: {selectedCoulisseColor} / Tablier: {selectedTablierColor} / Lame Finale: {selectedLameFinaleColor}          
            </td>
            <td className="price">{prices.selectedColors}€</td>
          </tr>
          <tr>
            <th>Type de Manoeuvre</th>
            <td>{ManoeuvreType}</td>
            <td className="price">{prices.ManoeuvreType}€</td>
          </tr>
          {ManoeuvreType === 'Manuel' && (
            <tr>
              <th>Outil de commande</th>
              <td>{ManualType}</td>
              <td className="price">150€</td>
            </tr>
          )}
          {ManoeuvreType === 'Motorisé' && (
            <>
              <tr>
                <th>Type de motorisation</th>
                <td>{MotoriseType}</td>
                <td className="price">220€</td>
              </tr>

              {MotoriseType === 'Radio' && (
                <tr>
                  <th>Télécomande</th>
                  <td>{TelecommandeType}</td>
                  <td className="price">50€</td>
                </tr>
              )}
              {MotoriseType === 'Filaire' && (
                <>
                  <tr>
                    <th>Interrepteur</th>
                    <td>{InterrupteurType}</td>
                    <td className="price">20€</td>
                  </tr>
                  <tr>
                    <th>Sortie de cable</th>
                    <td>{SortieDeCableType}</td>
                    <td className="price">25€</td>
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
            <td className="price">{totalPrice}€</td>
          </tr>
          <tr>
            <th>Total TTC</th>
            <td className="price">{totalPrice}€</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MultiStepInfoDisplay
