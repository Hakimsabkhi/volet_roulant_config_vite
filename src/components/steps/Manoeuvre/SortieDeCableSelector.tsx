import React from 'react';
import OptionSelector from './OptionSelector';
import { sortieDeCableOptions } from '../../../assets/Data';
import { SortieDeCableSelectorProps } from "../../../interfaces";

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
