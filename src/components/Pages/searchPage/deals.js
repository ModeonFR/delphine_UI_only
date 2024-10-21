import React, { useState, useEffect, useRef  } from 'react';
import {Box,Typography,Button, TextField, InputAdornment, Select, FormControl, MenuItem, CircularProgress, Checkbox, LinearProgress } from '@mui/material';
import { search, searchDeal, searchInvestor } from '../../../store/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import Geography from '../../widgets/geography';
import searchService from '../../../services/dataService';
import { PieChart } from '@mui/x-charts/PieChart';

const pieParams = {
  height: 100,
  margin: { right: 5 },
  slotProps: { legend: { hidden: true } },
};

const Deals = () => {
  const dispatch = useDispatch();

  //SEARCH VARIABLES
  const [sector, setSector] = useState("");
  const [sector2, setSector2] = useState("");
  const [autocompleteSector, setAutocompleteSector] = useState([]);
  const [autocompleteSector2, setAutocompleteSector2] = useState([]);
  const [investortype, setInvestortype] = useState("");
  const [autocompleteInvestorType, setAutocompleteInvestorType] = useState([]);
  const [geography, setGeography] = useState([]);
  const [geography2, setGeography2] = useState([]);
  const [dealSize, setDealSize] = useState("");
  const [investmentStructure, setInvestmentStructure] = useState("");


  //DATA
  const data = useSelector((state) => state.data);

  const sectorChoice = ["Information Technology", "Business Services", "Communications", "Internet Software and Services", "Software", "Media", "Insurance", "Healthcare Services", "Marketing", "Publishing", "Financial Services", "Information Services", "Staffing", "Digital Media", "Energy Services and Equipment", "Manufacturing", "Life Science", "E-Commerce", "Construction", "Consumer Products", "Retail", "Distribution", "Machinery", "Medical Products", "Oil/Gas Exploration", "Chemicals", "Automotive", "Consumer Services", "Technology Hardware", "Electrical Equipment", "Real Estate", "Packaging", "Beverages", "Environmental", "Food", "Plastics", "Renewable Energy", "Apparel/Textiles", "Test/Measurement Equipment", "Semiconductors", "Infrastructure", "Utilities", "Electronics", "Transportation", "Education", "Building Materials", "Metals/Mining", "Leisure", "Safety/Security", "Agriculture", "Restaurants", "Marine", "Engineering", "Aerospace", "Gaming", "Furniture", "Franchising", "Forest Products", "Airlines", "Defense", "Diversified"]
  const investorChoice = ["Private Equity Firm", "Growth Capital Firm", "Asset Manager", "Pension", "Mezzanine Finance Firm", "Independent", "Lender", "Infrastructure", "Venture Capital Firm", "Secondary Investor", "Corporate Investor", "Business Development Company", "Merchant Bank", "Sovereign Wealth Fund", "Subsidiary", "Family Office", "Distressed Investor", "Private Equity Real Estate", "Publicly Owned", "Hedge Fund", "Search Fund"]

  useEffect(() => {
      console.log(data.data_investors_investors)
  }, [data]);


  function launchSearch(){
    dispatch(searchDeal({query:sector, filters:{name_target:companyName, geography_target:geography, sector_target:sector,  name_buyer:companyName2, geography_buyer:geography2, sector_buyer:sector2, investortype:investortype, dealsize:dealSize, investmentstructure:investmentStructure}}))
  }


  //UI
  const rightHeaderRef = useRef(null);
  const resultRightValuesContainerRef = useRef(null);
  const resultLeftValuesContainerRef = useRef(null);

  const [allChecked, setAllChecked] = useState(false); 
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedItemIdx, setSelectedItemIdx] = useState(null);


  useEffect(() => {
    if(selectedItemIdx){
      console.log(data.data_investors[selectedItemIdx])

    }

}, [selectedItemIdx]);

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setAllChecked(isChecked);
    setCheckedItems(data.data_investors.reduce((acc, item, index) => {
      acc[index] = isChecked;
      return acc;
    }, {}));
  };

  const handleCheckboxChange = (index) => (event) => {
    setCheckedItems(prev => ({ ...prev, [index]: event.target.checked }));
  };
  

  useEffect(() => {
    const ref1 = rightHeaderRef.current;
    const ref2 = resultRightValuesContainerRef.current;
    const ref3 = resultLeftValuesContainerRef.current;
  
    // Sync horizontal scrollbar with header
    const syncHorizontalScroll = () => {
      ref1.scrollLeft = ref2.scrollLeft;
    };
  
    // Sync vertical scroll from ref2 to ref3
    const syncVerticalScrollFromRef2 = () => {
      ref3.scrollTop = ref2.scrollTop;
    };
  
    // Sync vertical scroll from ref3 to ref2
    const syncVerticalScrollFromRef3 = () => {
      ref2.scrollTop = ref3.scrollTop;
    };
  
    if (ref1 && ref2 && ref3) {
      // Add scroll event listeners
      ref2.addEventListener('scroll', syncHorizontalScroll);
      ref2.addEventListener('scroll', syncVerticalScrollFromRef2);
      ref3.addEventListener('scroll', syncVerticalScrollFromRef3);
  
      // Cleanup function to remove event listeners
      return () => {
        ref2.removeEventListener('scroll', syncHorizontalScroll);
        ref2.removeEventListener('scroll', syncVerticalScrollFromRef2);
        ref3.removeEventListener('scroll', syncVerticalScrollFromRef3);
      };
    }
  }, []);



  const [companyName2, setCompanyName2] = useState("");
  const [autocompleteCompanies2, setAutocompleteCompanies2] = useState("");
  const [debouncedCompany2, setDebouncedCompany2] = useState('');

  const [companyName, setCompanyName] = useState("");
  const [autocompleteCompanies, setAutocompleteCompanies] = useState("");
  const [debouncedCompany, setDebouncedCompany] = useState('');


  useEffect(() => {
    if(sector !== ""){
      const filteredList = sectorChoice.filter(str => str.toLowerCase().includes(sector.toLowerCase())).slice(0, 5);
      console.log(filteredList)
      if(filteredList.length == 1 && sector == filteredList[filteredList.length-1]){
        setAutocompleteSector(null)
      }
      else{
        
        setAutocompleteSector(filteredList)
      }
      
    }
    else{
      setAutocompleteSector(null)
    }

  }, [sector]);

  useEffect(() => {
    if(sector2 !== ""){
      const filteredList = sectorChoice.filter(str => str.toLowerCase().includes(sector2.toLowerCase())).slice(0, 5);
      console.log(filteredList)
      if(filteredList.length == 1 && sector == filteredList[filteredList.length-1]){
        setAutocompleteSector2(null)
      }
      else{
        
        setAutocompleteSector2(filteredList)
      }
      
    }
    else{
      setAutocompleteSector2(null)
    }

  }, [sector2]);

  useEffect(() => {
    if(investortype !== ""){
      const filteredList = investorChoice.filter(str => str.toLowerCase().includes(investortype.toLowerCase())).slice(0, 5);
      console.log(filteredList)
      if(filteredList.length == 1 && investortype == filteredList[filteredList.length-1]){
        setAutocompleteInvestorType(null)
      }
      else{
        
        setAutocompleteInvestorType(filteredList)
      }
      
    }
    else{
      setAutocompleteInvestorType(null)
    }

  }, [investortype]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCompany(companyName);
    }, 200); // 200ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [companyName]);

  useEffect(() => {
    if (debouncedCompany) {
      searchService.searchInvestorName({ query: debouncedCompany }).then((res) => {
        console.log(res.data);
        setAutocompleteCompanies(res.data);
      });
    }
  }, [debouncedCompany]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCompany2(companyName2);
    }, 200); // 200ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [companyName2]);

  useEffect(() => {
    if (debouncedCompany2) {
      searchService.searchInvestorName({ query: debouncedCompany2 }).then((res) => {
        console.log(res.data);
        setAutocompleteCompanies2(res.data);
      });
    }
  }, [debouncedCompany2]);


  
  return (
          <Box className="search-container">
            <Box className="filter-box">
              <Box className='search-title'>
                <Typography >Filters</Typography>
                <Button className='search-button' onClick={launchSearch}>search</Button>
              </Box>


              <Box className='section-title-box'><Icon icon="rivet-icons:money" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Deal size</Typography></Box>
              <FormControl fullWidth>
                <Select
                  value={dealSize || ''}
                  label=""
                  onChange={(e)=>{setDealSize(e.target.value)}}
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return <Typography sx={{opacity:0.4}}>Select an investment tranche</Typography>;
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
                  {["Any","< $250M","$250M - $500M","> $500M"].map((s, index) => (
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

              <Box sx={{color:"#92C7F8", display:"flex", borderBottom:"1px solid #92C7F8", marginTop:1}}>
                <Typography sx={{color:"#92C7F8", marginRight:"auto", fontWeight:"bold"}}>TARGET</Typography>
              </Box>

              <Box className='section-title-box'><Icon icon="mdi:bank-plus" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Company name</Typography></Box>
              <TextField 
                placeholder='Search company name'
                fullWidth
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
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
              {autocompleteCompanies && companyName !== "" &&
              <Box sx={{backgroundColor:"#D9D9D9"}}>
                  {autocompleteCompanies.map((s, index) => (
                    <Box onClick={()=>{setCompanyName(s)}} key={index} value={s} sx={{'&:hover': {backgroundColor: '#B0B0B0', cursor: 'pointer', }}}>
                      {s}
                    </Box>
                ))}
              </Box>
              }

              <Box className='section-title-box'><Icon icon="flowbite:edit-solid" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Sector</Typography></Box>
              <TextField 
                placeholder='Select sector'
                fullWidth
                value={sector}
                onChange={(e) => setSector(e.target.value)}
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
              {autocompleteSector &&
              <Box sx={{backgroundColor:"#D9D9D9"}}>
                  {autocompleteSector.length > 0 && autocompleteSector.map((s, index) => (
                    <Box onClick={()=>{setSector(s)}} key={index} value={s} sx={{'&:hover': {backgroundColor: '#B0B0B0', cursor: 'pointer', }}}>
                      {s}
                    </Box>
                ))}
              </Box>
              }

            
              <Box className='section-title-box'><Icon icon="fluent:location-12-filled" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Geography</Typography></Box>
              <Geography values={geography} setValues={setGeography}></Geography>
              
              <Box sx={{color:"#92C7F8", display:"flex", borderBottom:"1px solid #92C7F8"}}>
                <Typography sx={{color:"#92C7F8", marginRight:"auto", fontWeight:"bold"}}>BUYER</Typography>
              </Box>

              <Box className='section-title-box'><Icon icon="mdi:bank-plus" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Company name</Typography></Box>
              <TextField 
                placeholder='Search company name'
                fullWidth
                value={companyName2}
                onChange={(e) => setCompanyName2(e.target.value)}
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
              {autocompleteCompanies2 && companyName2 !== "" &&
              <Box sx={{backgroundColor:"#D9D9D9"}}>
                  {autocompleteCompanies2.map((s, index) => (
                    <Box onClick={()=>{setCompanyName2(s)}} key={index} value={s} sx={{'&:hover': {backgroundColor: '#B0B0B0', cursor: 'pointer', }}}>
                      {s}
                    </Box>
                ))}
              </Box>
              }

              <Box className='section-title-box'><Icon icon="flowbite:edit-solid" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Sector</Typography></Box>
              <TextField 
                placeholder='Select sector'
                fullWidth
                value={sector2}
                onChange={(e) => setSector2(e.target.value)}
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
              {autocompleteSector2 &&
              <Box sx={{backgroundColor:"#D9D9D9"}}>
                  {autocompleteSector2.length > 0 && autocompleteSector2.map((s, index) => (
                    <Box onClick={()=>{setSector2(s)}} key={index} value={s} sx={{'&:hover': {backgroundColor: '#B0B0B0', cursor: 'pointer', }}}>
                      {s}
                    </Box>
                ))}
              </Box>
              }

            
              <Box className='section-title-box'><Icon icon="fluent:location-12-filled" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Geography</Typography></Box>
              <Geography values={geography2} setValues={setGeography2}></Geography>
              
              <Box className='section-title-box'><Icon icon="ic:baseline-help-center" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Investor type</Typography></Box>
              <TextField 
                placeholder='Select investor type'
                fullWidth
                value={investortype}
                onChange={(e) => setInvestortype(e.target.value)}
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
              {autocompleteInvestorType &&
              <Box sx={{backgroundColor:"#D9D9D9"}}>
                  {autocompleteInvestorType.length > 0 && autocompleteInvestorType.map((s, index) => (
                    <Box onClick={()=>{setInvestortype(s)}} key={index} value={s} sx={{'&:hover': {backgroundColor: '#B0B0B0', cursor: 'pointer', }}}>
                      {s}
                    </Box>
                ))}
              </Box>
              }

              <Box className='section-title-box'><Icon icon="rivet-icons:money" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Investment structure</Typography></Box>
              <FormControl fullWidth>
                <Select
                  value={investmentStructure || ''}
                  label=""
                  onChange={(e)=>{setDealSize(e.target.value)}}
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return <Typography sx={{opacity:0.4}}>Select an investment structure</Typography>;
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
                  {["Any","Majority","Minority","Joint Venture", "Other"].map((s, index) => (
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


            </Box>

          </Box>

  );
};

export default Deals;