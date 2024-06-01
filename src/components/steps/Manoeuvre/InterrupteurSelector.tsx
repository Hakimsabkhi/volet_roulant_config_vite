import React from 'react';
import OptionSelector, { Option } from './OptionSelector';
import { interrupteurOptions } from '../../../assets/Data';

interface InterrupteurSelectorProps {
  selectedOption: string;
  handleChange: (option: Option) => void;
}

const InterrupteurSelector: React.FC<InterrupteurSelectorProps> = ({ selectedOption, handleChange }) => {
  return (
    <OptionSelector
      options={interrupteurOptions}
      selectedOption={selectedOption}
      handleChange={handleChange}
      type="interrupteur"
    />
  );
}

export default InterrupteurSelector;
