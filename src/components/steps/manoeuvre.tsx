import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setManoeuvreType, setManualType, setMotoriseType, setTelecommandeType, setInterrupteurType, setSortieDeCableType } from '../../features/voletSlice';
import ManualSelector from './Manoeuvre/ManualSelector';
import MotoriseSelector from './Manoeuvre/MotoriseSelector';
import TelecommandeSelector from './Manoeuvre/TelecommandeSelector';
import InterrupteurSelector from './Manoeuvre/InterrupteurSelector';
import SortieDeCableSelector from './Manoeuvre/SortieDeCableSelector';
import OptionSelector from './Manoeuvre/OptionSelector';
import './manoeuvre.css';
import { controlOptions, manoeuvreConfig } from '../../assets/Data';
import useMediaQuery from './useMediaQuery';

interface ManoeuvreProps {
  enableNextButton: (isEnabled: boolean) => void;
}

const Manoeuvre: React.FC<ManoeuvreProps> = ({ enableNextButton }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { ManoeuvreType, ManualType, MotoriseType, TelecommandeType, InterrupteurType, SortieDeCableType } = useSelector((state: RootState) => state.volet);
  const isMobile = useMediaQuery('(max-width: 1050px)');
  const [loading, setLoading] = useState(false);
  const [visibleSection, setVisibleSection] = useState<'Manoeuvre' | 'Manual' | 'Motorise' | 'Telecommande' | 'Interrupteur' | 'SortieDeCable'>('Manoeuvre');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    let isEnabled = false;
    if (ManoeuvreType === 'Manuel') {
      isEnabled = ManualType !== '';
      dispatch(setTelecommandeType(''));
      dispatch(setInterrupteurType(''));
      dispatch(setSortieDeCableType(''));
    } else if (ManoeuvreType === 'Motorisé') {
      if (MotoriseType) {
        if (MotoriseType === 'Radio') {
          isEnabled = TelecommandeType !== '';
        } else if (MotoriseType === 'Filaire') {
          isEnabled = InterrupteurType !== '' && SortieDeCableType !== '';
        }
      }
    }
    enableNextButton(isEnabled);

    if (
      isMobile &&
      (
        (ManoeuvreType === 'Manuel' && ManualType !== '') ||
        (ManoeuvreType === 'Motorisé' && (
          (MotoriseType === 'Radio' && TelecommandeType !== '') ||
          (MotoriseType === 'Filaire' && InterrupteurType !== '' && SortieDeCableType !== '')
        ))
      )
    ) {
      setIsConfigured(true);
    } else {
      setIsConfigured(false);
    }
  }, [ManoeuvreType, ManualType, MotoriseType, TelecommandeType, InterrupteurType, SortieDeCableType, enableNextButton, dispatch, isMobile]);

  const handleChange = (setType: (type: string) => { type: string, payload: string }) => (option: { label: string }) => {
    if (isMobile) {
      setLoading(true);
      setTimeout(() => {
        dispatch(setType(option.label));
        setLoading(false);
        if (setType === setManoeuvreType) {
          setVisibleSection(option.label === 'Manuel' ? 'Manual' : 'Motorise');
          if (option.label === 'Manuel') {
            dispatch(setMotoriseType(''));
            dispatch(setTelecommandeType(''));
            dispatch(setInterrupteurType(''));
            dispatch(setSortieDeCableType(''));
          }
        } else if (setType === setMotoriseType) {
          setVisibleSection(option.label === 'Radio' ? 'Telecommande' : 'Interrupteur');
        } else if (setType === setInterrupteurType) {
          setVisibleSection('SortieDeCable');
        }
      }, 1000); // Simulate loading delay
    } else {
      dispatch(setType(option.label));
      if (setType === setManoeuvreType) {
        setVisibleSection(option.label === 'Manuel' ? 'Manual' : 'Motorise');
        if (option.label === 'Manuel') {
          dispatch(setMotoriseType(''));
          dispatch(setTelecommandeType(''));
          dispatch(setInterrupteurType(''));
          dispatch(setSortieDeCableType(''));
        }
      } else if (setType === setMotoriseType) {
        setVisibleSection(option.label === 'Radio' ? 'Telecommande' : 'Interrupteur');
      } else if (setType === setInterrupteurType) {
        setVisibleSection('SortieDeCable');
      }
    }
  };

  const handleReconfigure = () => {
    setIsConfigured(false);
    setVisibleSection('Manoeuvre');
  };

  return (
    <div className="ma-containerG">
      {isMobile && isConfigured ? (
        <div className="completion-box">
          <p className="completion-message">Votre volet est bien configuré</p>
          <button onClick={handleReconfigure} className="nav-btn" >Reconfigure</button>
        </div>
      ) : (
        <>
          {(!isMobile || visibleSection === 'Manoeuvre') && !loading && (
            <OptionSelector options={controlOptions} selectedOption={ManoeuvreType} handleChange={handleChange(setManoeuvreType)} type="choice" />
          )}
          {(!isMobile || visibleSection === 'Manual') && ManoeuvreType === 'Manuel' && !loading && (
            <div className="ManoeuvreSection">
              <h2 className="text">{manoeuvreConfig[0]}</h2>
              <div className="OptionSection">
                <ManualSelector selectedOption={ManualType} handleChange={handleChange(setManualType)} />
              </div>
            </div>
          )}
          {(!isMobile || visibleSection === 'Motorise') && ManoeuvreType === 'Motorisé' && !loading && (
            <div className="ManoeuvreSectionG">
              <div className="ManoeuvreSection">
                <div><h2 className="text">{manoeuvreConfig[1]}</h2> </div>
                <div className="OptionSection">
                  <MotoriseSelector selectedOption={MotoriseType} handleChange={handleChange(setMotoriseType)} />
                </div>
              </div>
            </div>
          )}
          {(!isMobile || visibleSection === 'Telecommande') && MotoriseType === 'Radio' && !loading && (
            <div className="ManoeuvreSection">
              <div><h2 className="text">{manoeuvreConfig[2]}</h2></div>
              <div className="OptionSection">
                <TelecommandeSelector selectedOption={TelecommandeType} handleChange={handleChange(setTelecommandeType)} />
              </div>
            </div>
          )}
          {(!isMobile || visibleSection === 'Interrupteur') && MotoriseType === 'Filaire' && !loading && (
            <div className="ManoeuvreSection">
              <h2 className="text">{manoeuvreConfig[3]}</h2>
              <div className="OptionSection">
                <InterrupteurSelector selectedOption={InterrupteurType} handleChange={handleChange(setInterrupteurType)} />
              </div>
            </div>
          )}
          {(!isMobile || visibleSection === 'SortieDeCable') && MotoriseType === 'Filaire' && !loading && (
            <div className="ManoeuvreSection">
              <h2 className="text">{manoeuvreConfig[4]}</h2>
              <div className="OptionSection">
                <SortieDeCableSelector selectedOption={SortieDeCableType} handleChange={handleChange(setSortieDeCableType)} />
              </div>
            </div>
          )}
          {loading && <div className="loading-circle"></div>}
        </>
      )}
    </div>
  );
};

export default Manoeuvre;
