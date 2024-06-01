import React, { useState, useEffect, useCallback } from 'react';
import StepNavigator from './stepNavigator';
import Manoeuvre from './steps/manoeuvre';
import LameEtDimension from './steps/LameEtdimension';
import CouleurVolet from './steps/couleurVolet';
import TypeDePose from './steps/typeDePose';
import MultiStepInfoDisplay from './MultiStepInfoDisplay';
import DimensionCostCalculator from './calculator/dimensionCostCalculator';
import Information from './formulaire/info';

interface MultiStepMenuProps {
  onSelectionsChange: (selections: any) => void;
}

interface Selections {
  step1: Record<string, any>;
  step2: Record<string, any>;
  step3: Record<string, any>;
  step4: Record<string, any>;
}

interface EnabledSteps {
  [key: number]: boolean;
}

const MultiStepMenu: React.FC<MultiStepMenuProps> = ({ onSelectionsChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState<Selections>({
    step1: {},
    step2: {},
    step3: {},
    step4: {}
  });
  const [showInformation, setShowInformation] = useState(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [enabledSteps, setEnabledSteps] = useState<EnabledSteps>({ 1: true });

  useEffect(() => {
    onSelectionsChange(selections);
  }, [selections, onSelectionsChange]);

  const steps = [
    { id: 1, title: 'Lame et Dimension', Component: LameEtDimension },
    { id: 2, title: 'Type de pose', Component: TypeDePose },
    { id: 3, title: 'Couleurs', Component: CouleurVolet },
    { id: 4, title: 'Manoeuvre', Component: Manoeuvre },
    { id: 5, title: 'Recap de votre produit', Component: MultiStepInfoDisplay }
  ];

  const enableNextButton = useCallback((isEnabled: boolean) => {
    setIsNextButtonEnabled(isEnabled);
    setEnabledSteps(prev => ({
      ...prev,
      [currentStep + 1]: isEnabled
    }));
  }, [currentStep]);

  const enhancedSetCurrentStep = (step: number) => {
    if (enabledSteps[step]) {
      setCurrentStep(step);
      setShowInformation(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length && isNextButtonEnabled) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const modifyProduct = () => {
    setCurrentStep(1);
    setShowInformation(false);
  };

  const toggleInformationDisplay = () => {
    setShowInformation(!showInformation);
  };

  const renderCurrentStep = () => {
    const current = steps.find(step => step.id === currentStep);
    if (current) {
      const StepComponent = current.Component;
      return <StepComponent setSelections={setSelections} selections={selections} enableNextButton={enableNextButton} />;
    }
    return null;
  };

  const stepsForNavigator = steps.filter(step => step.id !== 5);

  return (
    <div className="MenuGroupe">
      <div className="steps-menu">
        <h1 className="menu-title">Volet roulant rénovation sur mesure</h1>
        <StepNavigator
          currentStep={currentStep}
          setCurrentStep={enhancedSetCurrentStep}
          totalSteps={stepsForNavigator.length}
          titles={stepsForNavigator.reduce((acc, step) => ({ ...acc, [step.id]: step.title }), {})}
          enabledSteps={enabledSteps}
        />
      </div>
      <div className="multi-step-menu">
        <div className='StepStyleManoeuvre'>
          <h2>{steps.find(step => step.id === currentStep)?.title}</h2>
          {renderCurrentStep()}
        </div>
        <div className="NavBtnContainer">
          {currentStep > 1 && currentStep < steps.length && (
            <button onClick={previousStep} className="nav-btn previous">
              Étape Précédente
            </button>
          )}
          {currentStep < steps.length && (
            <button onClick={nextStep} className="nav-btn" disabled={!isNextButtonEnabled}>
              {currentStep === steps.length - 1 ? 'Finaliser' : 'Étape Suivante'}
            </button>
          )}
          {currentStep === steps.length && (
            <>
              <button onClick={modifyProduct} className="nav-btn">
                Modifier mon produit
              </button>
              <button onClick={toggleInformationDisplay} className="nav-btn">
                Recevoir mon devis
              </button>
            </>
          )}
        </div>
      </div>
      {showInformation && <Information onClose={toggleInformationDisplay} />}
      <DimensionCostCalculator />
    </div>
  );
}

export default MultiStepMenu;
