import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'mango', label: 'Mango' },
  { value: 'grape', label: 'Grape' },
];

const SearchableSelectBox = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div style={{ width: '300px' }}>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isSearchable
        placeholder="Select a fruit"
      />
      {selectedOption && (
        <div style={{ marginTop: '10px' }}>
          <strong>Selected Option: </strong> {selectedOption.label}
        </div>
      )}
    </div>
  );
};

export default SearchableSelectBox;
