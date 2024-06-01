import React from 'react';
import OptionSelector, { Option } from './OptionSelector';
import { telecommandeOptions } from '../../../assets/Data';

interface TelecommandeSelectorProps {
  selectedOption: string;
  handleChange: (option: Option) => void;
}

const TelecommandeSelector: React.FC<TelecommandeSelectorProps> = ({ selectedOption, handleChange }) => {
  return (
    <OptionSelector
      options={telecommandeOptions}
      selectedOption={selectedOption}
      handleChange={handleChange}
      type="telecommande"
    />
  );
}

export default TelecommandeSelector;
