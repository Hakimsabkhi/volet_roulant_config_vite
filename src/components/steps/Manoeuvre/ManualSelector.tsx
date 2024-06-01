import React from 'react';
import OptionSelector, { Option } from './OptionSelector';
import { manualOptions } from '../../../assets/Data';

interface ManualSelectorProps {
  selectedOption: string;
  handleChange: (option: Option) => void;
}

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
