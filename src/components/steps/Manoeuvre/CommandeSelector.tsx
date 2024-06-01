import React from 'react';
import OptionSelector, { Option } from './OptionSelector';
import { commandeOptions } from '../../../assets/Data';

interface CommandeSelectorProps {
  selectedOption: string;
  handleChange: (option: Option) => void; 
}

const CommandeSelector: React.FC<CommandeSelectorProps> = ({ selectedOption, handleChange }) => {
  return (
    <OptionSelector
      options={commandeOptions}
      selectedOption={selectedOption}
      handleChange={handleChange}
      type="commande"
    />
  );
}

export default CommandeSelector;
