import React from 'react';
import OptionSelector from './OptionSelector';
import { manualOptions } from '../../../assets/Data';
import { ManualSelectorProps } from "../../../interfaces";


const ManualSelector: React.FC<ManualSelectorProps> = ({ selectedOption, handleChange }) => {
  return (
    <OptionSelector
      options={manualOptions}
      selectedOption={selectedOption}
      handleChange={handleChange}
      type="manual"
    />
  );
}
export default ManualSelector;
