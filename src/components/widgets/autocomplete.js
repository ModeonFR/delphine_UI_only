import React, { useState, useCallback } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import debounce from 'lodash/debounce';

const CustomAutocomplete = ({ data }) => {

  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(data.slice(0, 50)); // Initial display of first 50 options

    // Create a debounced version of the filter function
    const debouncedFilter = useCallback(
        debounce((value) => {
        if (value) {
            const filtered = data.filter(option =>
            option.label.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered.slice(0, 50)); // Display first 50 filtered results
        } else {
            setFilteredOptions(data.slice(0, 50));
        }
        }, 300), // Debounce delay in milliseconds
        [data] // Recreate debounce function if `data` changes
    );

    const handleInputChange = (event, value) => {
        setInputValue(value);
        debouncedFilter(value); // Call the debounced function
    };

  return (
    <Autocomplete
      disablePortal
      options={filteredOptions}
      getOptionLabel={(option) => option.label} 
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
      onInputChange={handleInputChange}
      inputValue={inputValue}
    />
  );
};

export default CustomAutocomplete;
