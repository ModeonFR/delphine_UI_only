import React, { useState, useEffect, useRef, useCallback  } from 'react';
import {Box,Typography,Button, TextField, InputAdornment, Select, FormControl, MenuItem, Slider, Checkbox, CircularProgress, } from '@mui/material';
import { search } from '../../../store/dataSlice';
import searchService from '../../../services/dataService';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import Geography from '../../widgets/geography';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import { incrementPage, decrementPage } from '../../../store/dataSlice';
import _ from 'lodash';
import { debounce } from 'lodash';

const SearchCompanies = () => {
  const dispatch = useDispatch();

  //SEARCH VARIABLES
  const [query, setQuery] = useState("");
  const [geography, setGeography] = useState([]);
  const [headquarters, setHeadquarters] = useState([]);
  const [size, setSize] = useState("");
  const [ownership, setOwnership] = useState("");
  const [headcount, setHeadcount] = useState([0,10000]);
  const [keypeople, setKeypeople] = useState("");
  const [rumors, setRumors] = useState(false);
  
  //DATA
  const data = useSelector((state) => state.data);

  const sizeChoice = ["Any", "0 - $500M", "$500M - $1Bn", "$1Bn+"]
  const ownershipChoice = ["Any", "Public", "PE Backed", "Private", "Acquired"]
  const keypeopleChoice = ["Any","CEO", "CFO", "Head of M&A or Business Development or Strategy"]


  useEffect(() => {
      console.log(data.data)
  }, [data]);

  const timeoutRef = useRef(null);
  const debouncedLaunchSearch = (page) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      launchSearch(page)
    }, 500); 
  };

  
  function launchSearch(page){
    let sizefiltermin = 0
    let sizefiltermax = 999999999999
    if(size == sizeChoice[1]){
      sizefiltermax = 500000
    } 
    if(size == sizeChoice[2]){
      sizefiltermin = 500000
      sizefiltermax = 1000000
    } 
    if(size == sizeChoice[3]){
      sizefiltermin = 1000000
    } 
    let headmin = headcount[0]
    let headmax = headcount[1]
    if (headmax == 10000){
      headmax = 999999999999
    }
    let keyp = 'Any'
    if(keypeople == "CEO"){
      keyp = "CEO"
    }
    if(keypeople == "CFO"){
      keyp = "CFO"
    }
    if(keypeople.includes("M&A")){
      keyp = "M&A"
    }
    dispatch(search({query:query, filters:{example:exampleCompany, rumors:rumors, geography:geography, revenues_min:sizefiltermin, revenues_max:sizefiltermax, headcount_min:headmin, headcount_max:headmax, ownership:ownership, keypeople:keyp, city:city, page:page}}))
  }


  //UI
  const rightHeaderRef = useRef(null);
  const resultRightValuesContainerRef = useRef(null);
  const resultLeftValuesContainerRef = useRef(null);

  const [allChecked, setAllChecked] = useState(false); 
  const [checkedItems, setCheckedItems] = useState({});

  const [selectedItemIdx, setSelectedItemIdx] = useState(null);
  const [stockMarket, setStockMarket] = useState([]);
  const [stockMarketTimestamp, setStockMarketTimestamp] = useState([]);




  useEffect(() => {
    if(selectedItemIdx){
      console.log(data.data[selectedItemIdx])
      if(data.data[selectedItemIdx].market_cap_tab){
        setStockMarket(data.data[selectedItemIdx].market_cap_tab.map(item => item.value))
        setStockMarketTimestamp(data.data[selectedItemIdx].market_cap_tab.map(item => item.timestamp))
      }
      else{
        setStockMarket(null)
        setStockMarketTimestamp(null)
      }

    }

}, [selectedItemIdx]);

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setAllChecked(isChecked);
    setCheckedItems(data.data.reduce((acc, item, index) => {
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
    const syncHorizontalScrollFromRef2 = () => {
      ref1.scrollLeft = ref2.scrollLeft;
    };
  
    const syncHorizontalScrollFromRef1 = () => {
      ref2.scrollLeft = ref1.scrollLeft;
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
      ref2.addEventListener('scroll', syncHorizontalScrollFromRef2);
      ref1.addEventListener('scroll', syncHorizontalScrollFromRef1);
      ref2.addEventListener('scroll', syncVerticalScrollFromRef2);
      ref3.addEventListener('scroll', syncVerticalScrollFromRef3);
  
      // Cleanup function to remove event listeners
      return () => {
        ref2.removeEventListener('scroll', syncHorizontalScrollFromRef2);
        ref1.removeEventListener('scroll', syncHorizontalScrollFromRef1);
        ref2.removeEventListener('scroll', syncVerticalScrollFromRef2);
        ref3.removeEventListener('scroll', syncVerticalScrollFromRef3);
      };
    }
  }, []);




  const [exampleCompany, setExampleCompany] = useState("");
  const [autocompleteCompanies, setAutocompleteCompanies] = useState("");
  const [debouncedCompany, setDebouncedCompany] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCompany(exampleCompany);
    }, 200); // 200ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [exampleCompany]);

  useEffect(() => {
    if (debouncedCompany) {
      searchService.searchCompanyName({ query: debouncedCompany }).then((res) => {
        console.log(res.data);
        setAutocompleteCompanies(res.data);
      });
    }
  }, [debouncedCompany]);



  const [city, setCity] = useState("");
  const [autocompleteCities, setAutocompleteCities] = useState("");
  const [debouncedCity, setDebouncedCity] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, 200); // 200ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [city]);

  useEffect(() => {
    if (debouncedCity!=="") {
      searchService.searchCityName({ query: debouncedCity }).then((res) => {
        console.log(res.data);
        setAutocompleteCities(res.data);
      });
    }
    else{
      setAutocompleteCities([])
    }
  }, [debouncedCity]);
  
  const formatMarketCap = (value) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)} Bn`; // format in billions
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)} M`; // format in millions
    }
    return value.toLocaleString(); // if it's below 1 million, just format normally
  };

  
  return (
          <Box className="search-container">
            <Box className="filter-box">
              <Box className='search-title'>
                <Typography >Filters</Typography>
                <Button className='search-button' onClick={()=>{launchSearch(0)}}>search</Button>
              </Box>
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
              <Box className='section-title-box'><Icon icon="mdi:company" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Example company</Typography></Box>
              <TextField 
                placeholder='Add a company to improve results'
                value={exampleCompany}
                onChange={(e) => setExampleCompany(e.target.value)}
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
              {autocompleteCompanies &&
              <Box sx={{backgroundColor:"#D9D9D9"}}>
                  {autocompleteCompanies.map((s, index) => (
                    <Box onClick={()=>{setExampleCompany(s)}} key={index} value={s} sx={{'&:hover': {backgroundColor: '#B0B0B0', cursor: 'pointer', }}}>
                      {s}
                    </Box>
                ))}
              </Box>
              }
              <Box className='section-title-box'><Icon icon="fluent:location-12-filled" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Geography</Typography></Box>
              <Geography values={geography} setValues={setGeography}></Geography>
              
              <Box className='section-title-box'><Icon icon="rivet-icons:money" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Size (revenues)</Typography></Box>
              <FormControl fullWidth>
                <Select
                  value={size || ''}
                  label=""
                  onChange={(e)=>{setSize(e.target.value)}}
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return <Typography sx={{opacity:0.4}}>Select an income bracket</Typography>;
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

              <Box className='section-title-box'><Icon icon="ri:key-fill" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Ownership</Typography></Box>
              <FormControl fullWidth>
                <Select
                  value={ownership || ''}
                  label=""
                  onChange={(e)=>{setOwnership(e.target.value)}}
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return <Typography sx={{opacity:0.4}}>Select an ownership type</Typography>;
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
                  {ownershipChoice.map((s, index) => (
                    <MenuItem key={index} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box className='section-title-box'><Icon icon="ion:people-sharp" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Headcount</Typography></Box>
              <Box sx={{paddingLeft:"20px", paddingRight:"20px", marginBottom:"20px"}}>
                <Slider
                  value={headcount}
                  onChange={(event, newValue) =>{setHeadcount(newValue)}}
                  valueLabelFormat={(value) => (value === 10000 ? '10000+' : value)}
                  min={0}
                  max={10000}
                  valueLabelDisplay="on" 
                  disableSwap
                  sx={{'& .MuiSlider-rail': {
                    opacity: 0.5,
                    boxShadow: 'inset 0px 0px 4px -2px #000',
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#D9D9D9',
                    border: 'none',
                    height:10
                  },
                  '& .MuiSlider-thumb': {
                    backgroundColor:"white",
                    boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0)',
                    height: 26,
                    width: 26,
                  },
                  '& .MuiSlider-valueLabel': {
                    fontSize: 12,
                    fontWeight: 'normal',
                    top: 56,
                    backgroundColor: 'unset',
                    color:"#D9D9D9",
                  },
                  }}
                />
              </Box>
             <Box className='section-title-box'><Icon icon="solar:pin-bold" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Headquarters</Typography></Box>
             <TextField 
                placeholder='Search locations'
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
               {autocompleteCities &&
              <Box sx={{backgroundColor:"#D9D9D9"}}>
                  {autocompleteCities.map((s, index) => (
                    <Box onClick={()=>{setCity(s)}} key={index} value={s} sx={{'&:hover': {backgroundColor: '#B0B0B0', cursor: 'pointer', }}}>
                      {s}
                    </Box>
                ))}
              </Box>
              }
             <Box className='section-title-box'><Icon icon="material-symbols:person" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Key people</Typography></Box>
              <FormControl fullWidth>
                <Select
                  value={keypeople || ''}
                  label=""
                  onChange={(e)=>{setKeypeople(e.target.value)}}
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return <Typography sx={{opacity:0.4}}>Select key people</Typography>;
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
                  {keypeopleChoice.map((s, index) => (
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

              <Box className='section-title-box'><Icon icon="fluent:location-12-filled" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Rumors of sale</Typography></Box>
              <Box className="search-checkbox-box">
                <Checkbox value={rumors} onChange={()=>{setRumors(!rumors)}} className="search-checkbox"sx={{ '&.Mui-checked': {color: '#D9D9D9',},'&.MuiCheckbox-root': {borderColor: '#D9D9D9',},'& .MuiSvgIcon-root': {border: `1px solid #D9D9D9`, },}}/>
                <Typography className="search-checkbox-text">Rumors of upcoming or ongoing operations ?</Typography>
              </Box>

            </Box>
            <Box className="result-box">

              <Typography className='search-title'>Search results</Typography>
              <Box className="result-box-container">
                <Box className="result-box-column">
                  <Box className="result-box-left">
                    <Box className="result-right-header">
                      <Box className="result-column-title">
                        <Checkbox className="search-checkbox"  checked={allChecked} onChange={handleSelectAllChange}  sx={{ '&.Mui-checked': {color: '#D9D9D9',},'&.MuiCheckbox-root': {borderColor: '#D9D9D9',},'& .MuiSvgIcon-root': {border: `1px solid #D9D9D9`, },}}/>
                        <Typography className="result-column-title-text" >#</Typography>
                      </Box>
                      <Box className="result-column-title">
                        <Typography className="result-column-title-text" >Companies</Typography>
                      </Box>
                    </Box>
                    <Box className="result-left-values-container" ref={resultLeftValuesContainerRef}>
                      {data.status == "loading" ?
                       <Box sx={{width:"100%", marginTop:"100px"}}>
                        <CircularProgress sx={{color:"#D9D9D9"}}/>
                       </Box>
                       :
                       <>
                        {/*  DISPLAY RIGHT DATA ROW BY ROW*/}
                        {data.data && data.data.length > 0 &&
                          <>
                          {data.data.map((item, index) => (
                            <Box className="result-left-values" sx={{ backgroundColor: index % 2 !== 0 ? "rgba(0,0,0,0)":"rgba(25,25,25,0)" }}>
                              <Box className="result-column-value">
                                <Checkbox className="search-checkbox"  checked={checkedItems[index] || false} onChange={handleCheckboxChange(index)} sx={{ '&.Mui-checked': {color: '#D9D9D9',},'&.MuiCheckbox-root': {borderColor: '#D9D9D9',},'& .MuiSvgIcon-root': {border: `1px solid #D9D9D9`, },}}/>
                                <Typography className="result-column-title-text" >{index+1+20*data.page}</Typography>
                              </Box>
                              <Box className="result-column-value">
                                <Typography>{item.company_short_name}</Typography>
                              </Box>
                            </Box>

                            ))}
                          </>
                        }
                        </>
                      }
                    </Box>
                    <Box sx={{ marginTop:'auto', display:'flex', alignItems:"center", gap:"8px", marginBottom:"5px", marginRight:"5px", maxHeight:"40px", minHeight:"40px"}}>
                        {/* EMPTY SPACE */}
                    </Box>
                  </Box>
                  <Box className="result-box-right">
                    <Box className="result-right-header" ref={rightHeaderRef}>
                      <Box className="result-column-title-big">
                        <Typography className="result-column-title-text" >Business ov.</Typography>
                      </Box>
                      <Box className="result-column-title">
                        <Typography className="result-column-title-text" >Ownership</Typography>
                      </Box>
                      <Box className="result-column-title">
                        <Typography className="result-column-title-text" >Headquarters</Typography>
                      </Box>
                      <Box className="result-column-title-medium">
                        <Typography className="result-column-title-text" >Website</Typography>
                      </Box>
                      <Box className="result-column-title">
                        <Typography className="result-column-title-text" >Revenues</Typography>
                      </Box>
                      <Box className="result-column-title">
                        <Typography className="result-column-title-text" >EBITDA</Typography>
                      </Box>
                      <Box className="result-column-title">
                        <Typography className="result-column-title-text" >Headcount</Typography>
                      </Box>
                      <Box className="result-column-title-medium">
                        <Typography className="result-column-title-text" >Key people</Typography>
                      </Box>
                    </Box>
                    {/*  DISPLAY LEFT DATA ROW BY ROW*/}
                    <Box className="result-right-values-container" ref={resultRightValuesContainerRef}>
                    
                    {data.status == "loading" ?
                       <Box sx={{width:"100%", marginTop:"100px"}}>
                        <CircularProgress sx={{color:"#D9D9D9"}}/>
                       </Box>
                       :

                       <> 
                        {data.data && data.data.length > 0 &&
                          <>
                          {data.data.map((item, index) => (
                            <>
                              <Box  className="result-right-values" onClick={()=>{setSelectedItemIdx(index)}}  sx={{ backgroundColor: index % 2 !== 0 ? "rgba(0,0,0,0)":"rgba(25,25,25,0)" }}>
                                <Box className="result-column-value-big">
                                  <Typography>{item.desc}</Typography>
                                </Box>

                                <Box className="result-column-value">
                                  <Typography>{item.ownership}</Typography>
                                </Box>

                                <Box className="result-column-value">
                                  {item.geography ? 
                                    <>
       
                                      { !/\d/.test(item.geography) ? 
                                        <Typography>{item.geography.replace("United States", "USA")}</Typography>
                                        :
                                        <Typography>NA</Typography>

                                      }
                                        
                                      </>
                                      
                            
                                  : 
                                    <Typography>NA</Typography>
                                  }
                                  
                                </Box>

                                <Box className="result-column-value-medium">
                                  {item.website ?
                                  <Typography>
                                    {item.website.length > 25 ? `${item.website.substring(0, 25)}...` : item.website}
                                  </Typography>
                                  :
                                  <Typography>NA</Typography>
                                  }
                                </Box>

                                <Box className="result-column-value">
                                 {item.revenues && item.revenues[0]  ? 
                                    <>
                                    {item.revenues && item.revenues[0] && Math.abs(parseInt(item.revenues[0].toString().split('.')[0])) > 1000000 ?
                                    <Typography>{item.revenues && item.revenues[0] && "$"+ (parseInt(item.revenues[0].toString().split('.')[0])/1000000).toFixed(2) + "Bn"}</Typography>
                                    :
                                    <Typography>{item.revenues && item.revenues[0] && "$"+ (parseInt(item.revenues[0].toString().split('.')[0])/1000).toFixed(0) + "M"}</Typography>
                                    }
                                    </>
                                 : 
                                    <Typography>NA</Typography>
                                }
                                  </Box>
                                <Box className="result-column-value">
                                  {item.ebitda && !isNaN(parseInt(item.ebitda.toString().split('.')[0])) ?
                                    <>
                                    {item.ebitda && Math.abs(parseInt(item.ebitda.toString().split('.')[0])) > 1000000 ?
                                    <Typography>{item.ebitda && !isNaN(parseInt(item.ebitda.toString().split('.')[0])) && "$"+ (parseInt(item.ebitda.toString().split('.')[0])/1000000).toFixed(2) + "Bn"}</Typography>
                                    :
                                    <Typography>{item.ebitda && !isNaN(parseInt(item.ebitda.toString().split('.')[0])) && "$"+ (parseInt(item.ebitda.toString().split('.')[0])/1000).toFixed(0) + "M"}</Typography>
                                    }
                                    </>
                                    :
                                    <Typography>NA</Typography>
                                  }
                                </Box>
                                <Box className="result-column-value">
                                  <Typography>{item.headcount ? item.headcount.toLocaleString() : "NA"}</Typography>
                                </Box>
                                <Box className="result-column-value-medium">
                                  {item.key_exec ? 
                                  <Typography sx={{ maxWidth: "150px", overflowX: "auto" }}>
                                    {item.key_exec && item.key_exec.slice(0, 2).map((exec, index) => (
                                      <div key={index}>{exec.name}</div>
                                    ))}
                                  </Typography>
                                  :
                                  <Typography>NA</Typography>
                                  }
                                </Box>
                              </Box>
                            </>

                            ))}
                          </>
                        }
                       </>
                    }

                 
                     
                    </Box>

                    <Box sx={{ marginTop:'auto', display:'flex', alignItems:"center", gap:"8px", marginBottom:"5px", marginRight:"5px", maxHeight:"40px", minHeight:"40px"}}>
                      <Typography sx={{textAlign:"right", marginLeft:"auto"}}>Page {data.page+1}</Typography>
                      <Button 
                        sx={{ backgroundColor: "#D9D9D9", color: "#112232" }} 
                        onClick={() => {
                          if(data.page > 0){
                            debouncedLaunchSearch(data.page-1)
                            dispatch(decrementPage())
                          }
                          
                        }}
                      >
                        Prev
                      </Button>
                      <Button 
                        sx={{ backgroundColor: "#D9D9D9", color: "#112232" }} 
                        onClick={() => {
                          if(data.page < data.max_page){
                            debouncedLaunchSearch(data.page + 1)
                            dispatch(incrementPage())
                          }
                        }}
                    >
                        Next
                    </Button>
                      
                    </Box>
                  </Box>
                </Box>


              </Box>
            </Box>
            {selectedItemIdx!==null &&
            <Box className="dialog" onClick={()=>{setSelectedItemIdx(null)}}>
              <Box className="dialog-container" onClick={(event)=>{event.stopPropagation();}}>
                <Box className='search-title'>
                  <Typography >Company data</Typography>
                  <Box sx={{marginLeft:"auto", cursor:"pointer"}}>
                    <Icon onClick={()=>{setSelectedItemIdx(null)}} icon="ic:twotone-close" fontSize={30} color='#D9D9D9'/>
                  </Box>

                </Box>
                <Box sx={{display:"flex", marginTop:"15px"}}>
                  <Icon icon="mdi:company" fontSize={64} color='#D9D9D9'/>
                  <Box sx={{display:"flex", flexDirection:"column", marginLeft:"15px", paddingTop:"8px", textAlign:"left"}}>
                    <Typography sx={{color:"#D9D9D9", fontSize:"18px", fontWeight:"bold"}} >{data.data[selectedItemIdx].company_short_name}</Typography>
                    <Typography sx={{color:"#D9D9D9", fontSize:"14px"}} >{data.data[selectedItemIdx].headquarters}</Typography>
                  </Box>
                  
                </Box>
                <Typography sx={{color:"#D9D9D9", textAlign:"left", marginTop:"10px"}} >{data.data[selectedItemIdx].desc}</Typography>
                <Box className="dialog-value-box">
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon icon="ri:key-fill" fontSize={32} color="#92C7F8" />
                  </Box>
                  <Box sx={{marginLeft:"15px", display:"flex", flexDirection:"column"}}>
                    <Typography sx={{color:"#D9D9D9", textAlign:"left"}} >Ownership</Typography>
                    <Typography sx={{color:"#D9D9D9", textAlign:"left", fontWeight:"bold"}} >{data.data[selectedItemIdx].ownership}</Typography>
                  </Box>
                </Box>
                {data.data[selectedItemIdx].headcount && 
                <Box className="dialog-value-box">
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon icon="ion:people-sharp" fontSize={32} color="#92C7F8" />
                  </Box>
                  <Box sx={{marginLeft:"15px", display:"flex", flexDirection:"column"}}>
                    <Typography sx={{color:"#D9D9D9", textAlign:"left"}} >Headcount</Typography>
                    <Typography sx={{color:"#D9D9D9", textAlign:"left", fontWeight:"bold"}} >{data.data[selectedItemIdx].headcount?data.data[selectedItemIdx].headcount.toLocaleString():"NA"}</Typography>
                  </Box>
                </Box>
                }
                {data.data[selectedItemIdx].market_cap && 
                <Box className="dialog-value-box">
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon icon="mdi:dollar" fontSize={32} color="#92C7F8" />
                  </Box>
                
                  <Box sx={{marginLeft:"15px", display:"flex", flexDirection:"column"}}>
                    <Typography sx={{color:"#D9D9D9", textAlign:"left"}} >Market capitalization</Typography>
                    <Typography sx={{color:"#D9D9D9", textAlign:"left", fontWeight:"bold"}} >${formatMarketCap(data.data[selectedItemIdx].market_cap)}</Typography>
                  </Box>
                </Box>
                }
                {data.data[selectedItemIdx].ebitda && 
                <Box className="dialog-value-box-vertical">
                  <Box className='dialog-title'>
                    <Typography >Revenues</Typography>
                  </Box>
                  
                  <Box sx={{width:'100%', display:"flex", alignContent:"center"}}>
                    <BarChart 
                    grid={{
                      horizontal:true,
                      color:" #ff00ff"
                    }}
                    slotProps={{
                      bar: {
                        rx: 5,
                        ry: 5,
                      },
                    }}
                      xAxis={[
                        {
                          id: 'years',
                          data: [ '2021', '2022', '2023', '2024'],
                          scaleType: 'band',
                        },
                      ]}
                      series={[
                        {
                          data: [...data.data[selectedItemIdx].revenues
                            .map(item => item === '--' ? 0 : item)  // Remplace les "--" par 0
                            .slice(0, 4)]                           // Garde les 4 premiers
                            .reverse(),                             // Inverse l'ordre
                            color: '#418CD1',
                            valueFormatter: (value) => `$${value}`
                        }
                      ]}
                      width={400}
                      height={200}
                      sx={{
                      "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                        strokeWidth:"0.4",
                        fill:"#D9D9D9"
                      },
                      "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                        strokeWidth:"0.4",
                        fill:"#D9D9D9"
                      },
                      "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                        stroke:"#D9D9D9",
                        strokeWidth:"2"
                      },
                      "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                        stroke:"#D9D9D9",
                        strokeWidth:0
                      },
                      "& .MuiChartsGrid-horizontal line": {  // This targets the horizontal grid lines
                        stroke: "#ff00ff",                   // Your desired color
                        strokeWidth: "2"                      // Adjust thickness if needed
                      }
                      }}

                    
                    />
                  </Box>
                </Box>
                }
                {data.data[selectedItemIdx].ebitda && 
                <Box className="dialog-value-box-vertical">
                  <Box className='dialog-title'>
                    <Typography >EBITDA</Typography>
                  </Box>
                  
                  <Box sx={{width:'100%', display:"flex", alignContent:"center"}}>
                    <BarChart 
                    grid={{
                      horizontal:true,
                      color:" #ff00ff"
                    }}
                    slotProps={{
                      bar: {
                        rx: 5,
                        ry: 5,
                      },
                    }}
                      xAxis={[
                        {
                          id: 'years',
                          data: [ '2021', '2022', '2023', '2024'],
                          scaleType: 'band',
                        },
                      ]}
                      series={[
                        {
                          data: [...data.data[selectedItemIdx].ebitda
                            .map(item => item === '--' ? 0 : item)  // Remplace les "--" par 0
                            .slice(0, 4)]                           // Garde les 4 premiers
                            .reverse(),                             // Inverse l'ordre
                            color: '#418CD1',
                            valueFormatter: (value) => `$${value}`
                        }
                      ]}
                      width={400}
                      height={200}
                      sx={{
                      "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                        strokeWidth:"0.4",
                        fill:"#D9D9D9"
                      },
                      "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                        strokeWidth:"0.4",
                        fill:"#D9D9D9"
                      },
                      "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                        stroke:"#D9D9D9",
                        strokeWidth:"2"
                      },
                      "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                        stroke:"#D9D9D9",
                        strokeWidth:0
                      },
                      "& .MuiChartsGrid-horizontal line": {  // This targets the horizontal grid lines
                        stroke: "#ff00ff",                   // Your desired color
                        strokeWidth: "2"                      // Adjust thickness if needed
                      }
                      }}

                    
                    />
                  </Box>
                </Box>
                }
                {stockMarket && 
                <Box className="dialog-value-box-vertical">
                  <Box className='dialog-title'>
                    <Typography >Stock market</Typography>
                  </Box>
              
                  <Box sx={{width:'100%', display:"flex", alignContent:"center"}}>
                    <LineChart
                    
                    xAxis={[{ 
                      data: stockMarketTimestamp.map(ts => new Date(ts*1000)), // Convert Unix timestamps to Date objects
                      scaleType: 'time',
                      valueFormatter: (date) => `${date.getMonth() + 1}/${date.getFullYear()}`, // Format as mm/yyyy
                    }]}
                      series={[
                        {
                          data: stockMarket,
                          curve: "linear",
                          color:"#418CD1",
                          showMark: false,
                        },
                      ]}
                      height={400}
                      sx={{
                        "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                          strokeWidth:"0.4",
                          fill:"#D9D9D9"
                        },
                        "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                          strokeWidth:"0.4",
                          fill:"#D9D9D9"
                        },
                        "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                          stroke:"#D9D9D9",
                          strokeWidth:"2"
                        },
                        "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                          stroke:"#D9D9D9",
                          strokeWidth:0
                        },
                        "& .MuiChartsGrid-horizontal line": {  
                          stroke: "#ff00ff",                
                          strokeWidth: "2"                  
                        }
                        }}
                    />
                  </Box>
                  </Box>
                }

                
              </Box>
            </Box>
             }
          </Box>

  );
};

export default SearchCompanies;