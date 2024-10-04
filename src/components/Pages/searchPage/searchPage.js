import React, { useState, useEffect, useRef  } from 'react';
import {Box,Typography,Button, TextField, InputAdornment, Select, FormControl, MenuItem, Slider, Checkbox } from '@mui/material';
import { search } from '../../../store/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import SearchInvestors from './investors';
import SearchCompanies from './companies';

const SearchPage = () => {

  //NAVIGATION
  const [pageIdx, setPageIdx] = useState(0);
  
  return (
    <Box className="search-page">
      <Box className="select-row">
        <Button
          className='button'
          sx={{
            backgroundColor: pageIdx === 0 ? "#D9D9D9" : "#112232",
            color: pageIdx !== 0 ? "#D9D9D9" : "#112232",
            gap: 1 
          }}
          onClick={() => { setPageIdx(0) }}
        >
          <Icon icon="mdi:company"  fontSize={24}/> Companies
        </Button>
        <Button
          className='button'
          sx={{
            backgroundColor: pageIdx === 1 ? "#D9D9D9" : "#112232",
            color: pageIdx !== 1 ? "#D9D9D9" : "#112232",
            gap: 1 
          }}
          onClick={() => { setPageIdx(1) }}
        >
          <Icon icon="rivet-icons:money"  fontSize={24}/> Investors
        </Button>
        <Button
          className='button'
          sx={{
            backgroundColor: pageIdx === 2 ? "#D9D9D9" : "#112232",
            color: pageIdx !== 2 ? "#D9D9D9" : "#112232",
            gap: 1 
          }}
          onClick={() => { setPageIdx(2) }}
        >
          <Icon icon="mdi:deal" fontSize={24}/> Transactions
        </Button>
        
      </Box>
      {pageIdx === 0 &&
        <SearchCompanies></SearchCompanies>
      }
      {pageIdx === 1 &&
        <SearchInvestors></SearchInvestors>
      }
    </Box>
  );
};

export default SearchPage;