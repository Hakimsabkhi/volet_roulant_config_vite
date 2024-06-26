import React from 'react';
import '../styles.css';
import { StepNavigatorProps} from "../interfaces"

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
