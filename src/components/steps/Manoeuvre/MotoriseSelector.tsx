import React from 'react';
import OptionSelector, { Option } from './OptionSelector';
import { motoriseOptions } from '../../../assets/Data'; 

interface MotoriseSelectorProps {
  selectedOption: string;
  handleChange: (option: Option) => void;
}

const MotoriseSelector: React.FC<MotoriseSelectorProps> = ({ selectedOption, handleChange }) => {
  return (
    <OptionSelector
      options={motoriseOptions}
      selectedOption={selectedOption}
      handleChange={handleChange}
      type="motorise"
    />
  );
}

export default MotoriseSelector;
