import React from 'react';
import '../styles.css';

interface StepNavigatorProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  titles: { [key: number]: string };
  enabledSteps: { [key: number]: boolean };
}

const StepNavigator: React.FC<StepNavigatorProps> = ({ currentStep, setCurrentStep, totalSteps, titles, enabledSteps }) => {
  return (
    <div className="step-navigator">
      {[...Array(totalSteps)].map((_, index) => {
        const stepNumber = index + 1;
        // Determine if the step is enabled from the enabledSteps object
        const isStepEnabled = enabledSteps[stepNumber];
        return (
          <button
            key={stepNumber}
            className={`step-button ${currentStep === stepNumber ? 'active' : ''} ${!isStepEnabled ? 'disabled' : ''}`}
            onClick={() => isStepEnabled && setCurrentStep(stepNumber)}
            disabled={!isStepEnabled} // Disable button if step is not enabled
          >
            {titles[stepNumber]}
          </button>
        );
      })}
    </div>
  );
}

export default StepNavigator;
