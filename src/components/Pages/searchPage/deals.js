import React, { useState, useEffect, useRef  } from 'react';
import {Box,Typography,Button, TextField, InputAdornment, Select, FormControl, MenuItem, Slider, Checkbox } from '@mui/material';
import { search } from '../../../store/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import Geography from '../../widgets/geography';

const Deals = () => {
  const dispatch = useDispatch();

  //SEARCH VARIABLES
  const [query, setQuery] = useState("");
  const [investortype, setInvestortype] = useState("");
  const [geography, setGeography] = useState([]);
  const [investmentstructure, setInvestmentstructure] = useState("");
  const [size, setSize] = useState("");

  //DATA
  const data = useSelector((state) => state.data);

  const investorChoice = ["Any", "Private equity", "Family office", "Sovereign Wealth Fund", "Venture Capital", "Corporate", "Other"]
  const sizeChoice = ["Any", "< $250M", "$250M - $500M", " > $500M"]
  const investmentStructureChoice = ["Any", "Majority", "Minority", "Joint Venture", "Other"]

  useEffect(() => {
    //initial search
      dispatch(search({query:""}))
      
  }, []);

  useEffect(() => {
      console.log(data.data)
  }, [data]);

  
  return (
          <Box className="search-container">
            <Box className="filter-box">
              <Typography className='search-title'>Filters</Typography>
              <Box className='section-title-box'><Icon icon="flowbite:edit-solid" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Sector</Typography></Box>
              <TextField 
                value={query}
                onChange={(e)=>{setQuery(e.target.value)}}
                placeholder='Banks, insurances, large companies...'
                fullWidth
                InputProps={{
                  sx: {
                    height: '37px', 
                    color: '#D9D9D9',
                  },
                }}
                sx={{
                  '.MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#D9D9D9', 
                    },
                    '&:hover fieldset': {
                      borderColor: '#D9D9D9',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#D9D9D9', 
                    },
                  },
                  input: {
                    color: '#D9D9D9', 
                  },
                }}
              />
              <Box className='section-title-box'><Icon icon="ic:baseline-help-center" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Investor type</Typography></Box>
              <FormControl fullWidth>
                <Select
                  value={investortype || ''}
                  label=""
                  onChange={(e)=>{setInvestortype(e.target.value)}}
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return <Typography sx={{opacity:0.4}}>Select investor type</Typography>;
                    }
                    const displayValue = value.length > 30 ? `${value.substring(0, 30)}...` : value;
                    return displayValue;
                  }}
                  sx={{
                    height: '37px',
                    color: 'white',
                    '& .MuiSelect-select': {
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                    },
                    '& .MuiSelect-icon': {
                      color: '#D9D9D9',
                      fontSize: '36px',
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D9D9D9'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D9D9D9',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D9D9D9'
                    },
                    '.MuiSvgIcon-root ': {
                      fill: "white !important",
                    }
                  }}
                >
                  {investorChoice.map((s, index) => (
                    <MenuItem key={index} value={s} sx={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      maxWidth:"315px"
                    }}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box className='section-title-box'><Icon icon="fluent:location-12-filled" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Geography</Typography></Box>
              <Geography values={geography} setValues={setGeography}></Geography>
              
              
              <Box className='section-title-box'><Icon icon="rivet-icons:money" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Deal size</Typography></Box>
              <FormControl fullWidth>
                <Select
                  value={size || ''}
                  label=""
                  onChange={(e)=>{setSize(e.target.value)}}
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return <Typography sx={{opacity:0.4}}>Select an investment tranche</Typography>;
                    }
                    return value;
                  }}
                  sx={{
                    height: '37px',
                    color: 'white',
                    '& .MuiSelect-select': {
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                    },
                    '& .MuiSelect-icon': {
                      color: '#D9D9D9',
                      fontSize: '36px',
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D9D9D9'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D9D9D9',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D9D9D9'
                    },
                    '.MuiSvgIcon-root ': {
                      fill: "white !important",
                    }
                  }}
                >
                  {sizeChoice.map((s, index) => (
                    <MenuItem key={index} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box className='section-title-box'><Icon icon="mdi:company" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Example of company owned</Typography></Box>
              <TextField 
                placeholder='Add a company to improve results'
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon icon="ion:search" fontSize={24} color='#D9D9D9'/>
                    </InputAdornment>
                  ),
                  sx: {
                    height: '37px', 
                    color: '#D9D9D9',
                  },
                }}
                sx={{
                  '.MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#D9D9D9', 
                    },
                    '&:hover fieldset': {
                      borderColor: '#D9D9D9',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#D9D9D9', 
                    },
                  },
                  input: {
                    color: '#D9D9D9', 
                  },
                }}
              />

              <Box className='section-title-box'><Icon icon="mdi:bank-plus" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Investment structure</Typography></Box>
              <FormControl fullWidth>
                <Select
                  value={investmentstructure || ''}
                  label=""
                  onChange={(e)=>{setInvestmentstructure(e.target.value)}}
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return <Typography sx={{opacity:0.4}}>Select an investment structure</Typography>;
                    }
                    return value;
                  }}
                  sx={{
                    height: '37px',
                    color: 'white',
                    '& .MuiSelect-select': {
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                    },
                    '& .MuiSelect-icon': {
                      color: '#D9D9D9',
                      fontSize: '36px',
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D9D9D9'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D9D9D9',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D9D9D9'
                    },
                    '.MuiSvgIcon-root ': {
                      fill: "white !important",
                    }
                  }}
                >
                  {investmentStructureChoice.map((s, index) => (
                    <MenuItem key={index} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


            </Box>
            <Box className="result-box">

              <Typography className='search-title'>Search results</Typography>
            </Box>
          </Box>

  );
};

export default Deals;