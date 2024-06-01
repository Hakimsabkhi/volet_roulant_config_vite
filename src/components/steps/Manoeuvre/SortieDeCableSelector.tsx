import React from 'react';
import OptionSelector, { Option } from './OptionSelector';
import { sortieDeCableOptions } from '../../../assets/Data';

interface SortieDeCableSelectorProps {
  selectedOption: string;
  handleChange: (option: Option) => void;
}

const SortieDeCableSelector: React.FC<SortieDeCableSelectorProps> = ({ selectedOption, handleChange }) => {
  return (
    <OptionSelector
      options={sortieDeCableOptions}
      selectedOption={selectedOption}
      handleChange={handleChange}
      type="sortieDeCable"
    />
  );
}

export default SortieDeCableSelector;
