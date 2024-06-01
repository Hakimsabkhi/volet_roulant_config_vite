import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { setManoeuvreType, setManualType, setMotoriseType, setTelecommandeType, setCommandeType, setInterrupteurType, setSortieDeCableType } from '../../features/voletSlice'
import ManualSelector from './Manoeuvre/ManualSelector'
import MotoriseSelector from './Manoeuvre/MotoriseSelector'
import TelecommandeSelector from './Manoeuvre/TelecommandeSelector'
import CommandeSelector from './Manoeuvre/CommandeSelector'
import InterrupteurSelector from './Manoeuvre/InterrupteurSelector'
import SortieDeCableSelector from './Manoeuvre/SortieDeCableSelector'
import OptionSelector from './Manoeuvre/OptionSelector'
import './manoeuvre.css'
import { controlOptions, manoeuvreConfig } from '../../assets/Data'

interface ManoeuvreProps {
  enableNextButton: (isEnabled: boolean) => void
}

const Manoeuvre: React.FC<ManoeuvreProps> = ({ enableNextButton }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { ManoeuvreType, ManualType, MotoriseType, TelecommandeType, CommandeType, InterrupteurType, SortieDeCableType } = useSelector((state: RootState) => state.volet)

  useEffect(() => {
    let isEnabled = false
    if (ManoeuvreType === 'Manuel') {
      isEnabled = ManualType !== ''
    } else if (ManoeuvreType === 'Motorisé') {
      if (MotoriseType) {
        if (MotoriseType === 'Radio') {
          isEnabled = TelecommandeType !== ''
        } else if (MotoriseType === 'Filaire') {
          isEnabled = InterrupteurType !== '' && SortieDeCableType !== ''
        }
      }
    }
    enableNextButton(isEnabled)
  }, [ManoeuvreType, ManualType, MotoriseType, TelecommandeType, InterrupteurType, SortieDeCableType, enableNextButton])

  const handleChange = (setType: (type: string) => { type: string, payload: string }) => (option: { label: string }) => {
    dispatch(setType(option.label))
  }

  return (
    <div className="ma-containerG">
      <OptionSelector options={controlOptions} selectedOption={ManoeuvreType} handleChange={handleChange(setManoeuvreType)} type="choice" />
      {ManoeuvreType === 'Manuel' && (
        <div className="ManoeuvreSection">
          <h2 className="text">{manoeuvreConfig[0]}</h2>
          <ManualSelector selectedOption={ManualType} handleChange={handleChange(setManualType)} />
        </div>
      )}
      {ManoeuvreType === 'Motorisé' && (
        <>
          <div className="ManoeuvreSectionG">
            <div className="ManoeuvreSection">
              <h2 className="text">{manoeuvreConfig[1]}</h2>
              <MotoriseSelector selectedOption={MotoriseType} handleChange={handleChange(setMotoriseType)} />
            </div>
            {MotoriseType === 'Radio' && (
              <>
                <div className="ManoeuvreSection">
                  <h2 className="text">{manoeuvreConfig[2]}</h2>
                  <TelecommandeSelector selectedOption={TelecommandeType} handleChange={handleChange(setTelecommandeType)} />
                </div>
              </>
            )}
            {MotoriseType === 'Filaire' && (
              <>
                <div className="ManoeuvreSection">
                  <h2 className="text">{manoeuvreConfig[3]}</h2>
                  <InterrupteurSelector selectedOption={InterrupteurType} handleChange={handleChange(setInterrupteurType)} />
                </div>
                <div className="ManoeuvreSection">
                  <h2 className="text">{manoeuvreConfig[4]}</h2>
                  <SortieDeCableSelector selectedOption={SortieDeCableType} handleChange={handleChange(setSortieDeCableType)} />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Manoeuvre
