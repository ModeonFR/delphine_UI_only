import React, { useState, useEffect, useRef  } from 'react';
import {Box,Typography,Button, TextField, InputAdornment, Select, FormControl, MenuItem, CircularProgress, Checkbox, LinearProgress } from '@mui/material';
import { search, searchInvestor } from '../../../store/dataSlice';
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

const SearchInvestors = () => {
  const dispatch = useDispatch();

  //SEARCH VARIABLES
  const [sector, setSector] = useState("");
  const [autocompleteSector, setAutocompleteSector] = useState([]);
  const [investortype, setInvestortype] = useState("");
  const [autocompleteInvestorType, setAutocompleteInvestorType] = useState([]);
  const [geography, setGeography] = useState([]);

  //DATA
  const data = useSelector((state) => state.data);

  const sectorChoice = ["Information Technology", "Business Services", "Communications", "Internet Software and Services", "Software", "Media", "Insurance", "Healthcare Services", "Marketing", "Publishing", "Financial Services", "Information Services", "Staffing", "Digital Media", "Energy Services and Equipment", "Manufacturing", "Life Science", "E-Commerce", "Construction", "Consumer Products", "Retail", "Distribution", "Machinery", "Medical Products", "Oil/Gas Exploration", "Chemicals", "Automotive", "Consumer Services", "Technology Hardware", "Electrical Equipment", "Real Estate", "Packaging", "Beverages", "Environmental", "Food", "Plastics", "Renewable Energy", "Apparel/Textiles", "Test/Measurement Equipment", "Semiconductors", "Infrastructure", "Utilities", "Electronics", "Transportation", "Education", "Building Materials", "Metals/Mining", "Leisure", "Safety/Security", "Agriculture", "Restaurants", "Marine", "Engineering", "Aerospace", "Gaming", "Furniture", "Franchising", "Forest Products", "Airlines", "Defense", "Diversified"]
  const investorChoice = ["Private Equity Firm", "Growth Capital Firm", "Asset Manager", "Pension", "Mezzanine Finance Firm", "Independent", "Lender", "Infrastructure", "Venture Capital Firm", "Secondary Investor", "Corporate Investor", "Business Development Company", "Merchant Bank", "Sovereign Wealth Fund", "Subsidiary", "Family Office", "Distressed Investor", "Private Equity Real Estate", "Publicly Owned", "Hedge Fund", "Search Fund"]

  useEffect(() => {
      console.log(data.data_investors_investors)
  }, [data]);


  function launchSearch(){
    dispatch(searchInvestor({query:sector, filters:{example:exampleCompany, geography:geography, investortype:investortype, sector:sector, name:companyName}}))
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



  const [companyName, setCompanyName] = useState("");
  const [autocompleteCompanies2, setAutocompleteCompanies2] = useState("");
  const [debouncedCompany2, setDebouncedCompany2] = useState('');

  const [exampleCompany, setExampleCompany] = useState("");
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
      setDebouncedCompany(exampleCompany);
    }, 200); // 200ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [exampleCompany]);

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
      setDebouncedCompany2(companyName);
    }, 200); // 200ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [companyName]);

  useEffect(() => {
    if (debouncedCompany2) {
      searchService.searchInvestorName({ query: debouncedCompany2 }).then((res) => {
        console.log(res.data);
        setAutocompleteCompanies2(res.data);
      });
    }
  }, [debouncedCompany2]);

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
  
  return (
          <Box className="search-container">
            <Box className="filter-box">
              <Box className='search-title'>
                <Typography >Filters</Typography>
                <Button className='search-button' onClick={launchSearch}>search</Button>
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
              {autocompleteCompanies2 && companyName !== "" &&
              <Box sx={{backgroundColor:"#D9D9D9"}}>
                  {autocompleteCompanies2.map((s, index) => (
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
              <Box className='section-title-box'><Icon icon="fluent:location-12-filled" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Geography</Typography></Box>
              <Geography values={geography} setValues={setGeography}></Geography>
              
              
              <Box className='section-title-box'><Icon icon="mdi:company" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Example of company owned</Typography></Box>
              <TextField 
                placeholder='Add a company to improve results'
                fullWidth
                value={exampleCompany}
                onChange={(e) => setExampleCompany(e.target.value)}
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
                        <Typography className="result-column-title-text" >Investor name</Typography>
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
                        {data.data_investors && data.data_investors.length > 0 &&
                          <>
                          {data.data_investors.map((item, index) => (
                            <Box className="result-left-values" sx={{ backgroundColor: index % 2 !== 0 ? "rgba(0,0,0,0)":"rgba(25,25,25,0)" }}>
                              <Box className="result-column-value">
                                <Checkbox className="search-checkbox"  checked={checkedItems[index] || false} onChange={handleCheckboxChange(index)} sx={{ '&.Mui-checked': {color: '#D9D9D9',},'&.MuiCheckbox-root': {borderColor: '#D9D9D9',},'& .MuiSvgIcon-root': {border: `1px solid #D9D9D9`, },}}/>
                                <Typography className="result-column-title-text" >{index+1}</Typography>
                              </Box>
                              <Box className="result-column-value">
                                <Typography>{item.name}</Typography>
                              </Box>
                            </Box>

                            ))}
                          </>
                        }
                        </>
                      }
                    </Box>
                  </Box>
                  <Box className="result-box-right">
                    <Box className="result-right-header" ref={rightHeaderRef}>
                      <Box className="result-column-title-medium">
                        <Typography className="result-column-title-text" >Sectors</Typography>
                      </Box>
                      <Box className="result-column-title-big">
                        <Typography className="result-column-title-text" >Profile</Typography>
                      </Box>
                      <Box className="result-column-title-medium">
                        <Typography className="result-column-title-text" >Headquarters</Typography>
                      </Box>
                      <Box className="result-column-title-big">
                        <Typography className="result-column-title-text" >Portfolio</Typography>
                      </Box>
                      <Box className="result-column-title-medium">
                        <Typography className="result-column-title-text" >CEO</Typography>
                      </Box>
                      <Box className="result-column-title-big">
                        <Typography className="result-column-title-text" >Website</Typography>
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
                        {data.data_investors && data.data_investors.length > 0 &&
                          <>
                          {data.data_investors.map((item, index) => (
                            <>
                              <Box  className="result-right-values" onClick={()=>{setSelectedItemIdx(index)}}  sx={{ backgroundColor: index % 2 !== 0 ? "rgba(0,0,0,0)":"rgba(25,25,25,0)" }}>
                                <Box className="result-column-value-medium">
                                <Typography>
                                  {item.top_sector_invested
                                    .slice(0, 3)
                                    .map(company => company.sector)
                                    .join('\n')
                                    .split('\n')
                                    .map((line, index) => (
                                      <React.Fragment key={index}>
                                        {line}
                                        <br />
                                      </React.Fragment>
                                    ))}
                                </Typography>
                                </Box>

                                <Box className="result-column-value-big">
                                  <Typography>{item.profile ? item.profile : "NA"}</Typography>
                                </Box>

                                <Box className="result-column-value-medium">
                                  {item.country ? 
                                  <Typography>
                                    {!/\d/.test(item.country) ? item.country : 'NA'}
                                  </Typography>
                                  :
                                  <Typography>NA</Typography>
                                
                                }


                                </Box>
                                
                               
                                <Box className="result-column-value-big">
                                {item.portoflio && 
                                  <Typography>
                                  {item.portoflio
                                    .slice(0, 3)
                                    .map(company => company.company)
                                    .join('\n')
                                    .split('\n')
                                    .map((line, index) => (
                                      <React.Fragment key={index}>
                                        {line}
                                        <br />
                                      </React.Fragment>
                                    ))}
                                </Typography>
                                  }

                                </Box>
                              
                                <Box className="result-column-value-medium">
                                  <Typography>
                                    {item.ceo ? item.ceo : "NA"}
                                  </Typography>
                                  </Box>
                                <Box className="result-column-value-big">
                                  {item.website ? 
                                  <Typography>
                                    {item.website.length > 25 ? `${item.website.substring(0, 25)}...` : item.website}
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
                  <Icon icon="mdi:person-tie" fontSize={64} color='#D9D9D9'/>
                  <Box sx={{display:"flex", flexDirection:"column", marginLeft:"15px", paddingTop:"8px", textAlign:"left"}}>
                    <Typography sx={{color:"#D9D9D9", fontSize:"18px", fontWeight:"bold"}} >{data.data_investors[selectedItemIdx].name}</Typography>
                    <Typography sx={{color:"#D9D9D9", fontSize:"14px"}} >{data.data_investors[selectedItemIdx].hq}</Typography>
                  </Box>
                 
                </Box>
                <Box sx={{backgroundColor:"#D9D9D9", borderRadius:4, display:"flex", justifyContent:"center", alignItems:"center", marginTop:2, width:"160px"}}>
                  <Typography sx={{ fontSize:"14px"}} >{data.data_investors[selectedItemIdx].investor_type}</Typography>
                </Box>
                <Typography sx={{ marginTop:4, color:"#92C7F8", textAlign:"left", borderBottom:1}} >Investment criteria</Typography>
                <Typography sx={{ marginTop:4, color:"#D9D9D9", textAlign:"left"}} >Top geographies invested</Typography>
                <Box sx={{border:"1px solid #D9D9D9", marginTop:1, borderRadius:2}}>
                  <Box sx={{display:"flex",  color:"#92C7F8", padding:3, fontWeight:"bold", justifyContent: "space-between",}}>
                    <Typography sx={{ }} >Rank</Typography>
                    <Typography sx={{ }} >Area</Typography>
                    <Typography sx={{ }} >Percentage</Typography>
                  </Box>
                  <Box sx={{display:"flex",  color:"#D9D9D9", padding:3, fontWeight:"bold", justifyContent: "space-between",}}>
                    <Typography sx={{ }} >#1</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].top_geographies_invested[0].country}</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].top_geographies_invested[0].alltime_count}</Typography>
                  </Box>
                  <Box sx={{display:"flex",  color:"#D9D9D9", padding:3, fontWeight:"bold", justifyContent: "space-between",}}>
                    <Typography sx={{ }} >#2</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].top_geographies_invested.filter(geo => geo.country !== "")[1] && data.data_investors[selectedItemIdx].top_geographies_invested.filter(geo => geo.country !== "")[1].country}</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].top_geographies_invested.filter(geo => geo.country !== "")[1] && data.data_investors[selectedItemIdx].top_geographies_invested.filter(geo => geo.country !== "")[1].alltime_count}</Typography>
                  </Box>
                  <Box sx={{display:"flex",  color:"#D9D9D9", padding:3, fontWeight:"bold", justifyContent: "space-between",}}>
                    <Typography sx={{ }} >#3</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].top_geographies_invested.filter(geo => geo.country !== "")[2] && data.data_investors[selectedItemIdx].top_geographies_invested.filter(geo => geo.country !== "")[2].country}</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].top_geographies_invested.filter(geo => geo.country !== "")[2] && data.data_investors[selectedItemIdx].top_geographies_invested.filter(geo => geo.country !== "")[2].alltime_count}</Typography>
                  </Box>
                </Box>

                <Typography sx={{ marginTop:4, color:"#D9D9D9", textAlign:"left"}} >Top sectors invested</Typography>
                <Box sx={{border:"1px solid #D9D9D9", marginTop:1, borderRadius:2}}>
                  <Box sx={{display:"flex",  color:"#92C7F8", padding:3, fontWeight:"bold", justifyContent: "space-between",}}>
                    <Typography sx={{ }} >Rank</Typography>
                    <Typography sx={{ }} >Area</Typography>
                    <Typography sx={{ }} >Percentage</Typography>
                  </Box>
                  <Box sx={{display:"flex",  color:"#D9D9D9", padding:3, fontWeight:"bold", justifyContent: "space-between",}}>
                    <Typography sx={{ }} >#1</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].top_sector_invested[0].sector}</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].top_sector_invested[0].alltime_count}</Typography>
                  </Box>
                  {data.data_investors[selectedItemIdx].top_sector_invested.length >1 && 
                    <Box sx={{display:"flex",  color:"#D9D9D9", padding:3, fontWeight:"bold", justifyContent: "space-between",}}>
                      <Typography sx={{ }} >#2</Typography>
                      <Typography sx={{ }} >{data.data_investors[selectedItemIdx].top_sector_invested[1].sector}</Typography>
                      <Typography sx={{ }} >{data.data_investors[selectedItemIdx].top_sector_invested[1].alltime_count}</Typography>
                    </Box>
                  }
                  {data.data_investors[selectedItemIdx].top_sector_invested.length >2 && 
                  <Box sx={{display:"flex",  color:"#D9D9D9", padding:3, fontWeight:"bold", justifyContent: "space-between",}}>
                    <Typography sx={{ }} >#3</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].top_sector_invested[2].sector}</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].top_sector_invested[2].alltime_count}</Typography>
                  </Box>
                  }
                </Box>

                <Typography sx={{ marginTop:4, color:"#92C7F8", textAlign:"left", borderBottom:1}} >Investment criteria</Typography>
                <Box sx={{display:"flex", marginTop:2}}>
                  <Box sx={{display:"flex", width:"50%", borderRight:"1px solid #D9D9D9"}}>
                    <Typography sx={{ color:"#92C7F8", textAlign:"left"}} >Min</Typography>
                    <Typography sx={{ color:"#D9D9D9", textAlign:"right", marginLeft:"auto", marginRight:1}} >${data.data_investors[selectedItemIdx].investment_size_min}M</Typography>
                  </Box>
                  <Box sx={{display:"flex", width:"50%"}}>
                    <Typography sx={{ color:"#92C7F8", textAlign:"left", marginLeft:1}} >Max</Typography>
                    <Typography sx={{ color:"#D9D9D9", textAlign:"right", marginLeft:"auto", marginRight:1}} >${data.data_investors[selectedItemIdx].investment_size_max}M</Typography>
                  </Box>
                </Box>
                  <Box sx={{width:"100%", marginTop:2, display:"flex"}}>
                    <Box sx={{width:"48%", border:"1px solid #D9D9D9", justifyContent:"center", alignItems:"center", display:"flex", flexDirection:"column"}}>
                      <Typography sx={{ color:"#D9D9D9", textAlign:"center", marginTop:1, marginBottom:1}} >Buy / Sell</Typography>
                      <PieChart
                        series={[
                          {
                            innerRadius:30,
                            data: [{ label:"Buy", value:data.data_investors[selectedItemIdx].total_buy, color:"#D9D9D9"}, {color:"#92C7F8", label:"Sell", value:data.data_investors[selectedItemIdx].total_sell}],
                          },
                        ]} 
                        {...pieParams}
                      />
                      <Box sx={{padding:2, display:"flex", width:'90%'}}> 
                        <Box sx={{borderRadius:1, backgroundColor:"#D9D9D9", width:20, height:20}}> </Box>
                        <Typography sx={{ color:"#D9D9D9", marginLeft:1}} >Buy {(data.data_investors[selectedItemIdx].total_buy / (data.data_investors[selectedItemIdx].total_buy + data.data_investors[selectedItemIdx].total_sell)*100).toFixed(0)}%</Typography>
                        <Box sx={{borderRadius:1, backgroundColor:"#92C7F8", width:20, height:20, marginLeft:"auto"}}> </Box>
                        <Typography sx={{ color:"#92C7F8", marginLeft:1}} >Sell {100 - (data.data_investors[selectedItemIdx].total_buy / (data.data_investors[selectedItemIdx].total_buy + data.data_investors[selectedItemIdx].total_sell)*100).toFixed(0)}%</Typography>
                      </Box>
                     </Box>
                     <Box sx={{width:"48%", border:"1px solid #D9D9D9", marginLeft:"auto"}}>
                      <Typography sx={{ color:"#D9D9D9", textAlign:"center", marginTop:1, marginBottom:1}} >MxA connections</Typography>
                      <Typography sx={{ color:"#D9D9D9", textAlign:"left", marginLeft:1}} >Acquired from:</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ minWidth: 35,  marginLeft:1,  }}>
                          <Typography variant="body2" sx={{ color: '#D9D9D9' }}>
                            Investors ({data.data_investors[selectedItemIdx].acquired_from_investors_prcent}%)
                          </Typography>
                        </Box>
                        <Box sx={{ width: '100%', mr: 1, marginLeft:1, marginRight:1 }}>
                          <LinearProgress value={data.data_investors[selectedItemIdx].acquired_from_investors_prcent} variant="determinate" />
                        </Box>
                      
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ minWidth: 35,  marginLeft:1,  }}>
                          <Typography variant="body2" sx={{ color: '#D9D9D9' }}>
                          Strategics ({data.data_investors[selectedItemIdx].acquired_from_strat_prcent}%)
                          </Typography>
                        </Box>
                        <Box sx={{ width: '100%', mr: 1, marginLeft:1, marginRight:1 }}>
                        <LinearProgress value={data.data_investors[selectedItemIdx].acquired_from_strat_prcent} variant="determinate" />
                        </Box>
                      
                      </Box>
                      <Typography sx={{ color:"#D9D9D9", textAlign:"left", marginLeft:1}} >Exited to:</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ minWidth: 35,  marginLeft:1,  }}>
                          <Typography variant="body2" sx={{ color: '#D9D9D9' }}>
                            Investors ({data.data_investors[selectedItemIdx].exited_to_investors_prcent}%)
                          </Typography>
                        </Box>
                        <Box sx={{ width: '100%', mr: 1, marginLeft:1, marginRight:1 }}>
                          <LinearProgress value={data.data_investors[selectedItemIdx].exited_to_investors_prcent} variant="determinate" />
                        </Box>
                      
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom:1 }}>
                        <Box sx={{ minWidth: 35,  marginLeft:1,  }}>
                          <Typography variant="body2" sx={{ color: '#D9D9D9' }}>
                          Strategics ({data.data_investors[selectedItemIdx].exited_to_strat_prcent}%)
                          </Typography>
                        </Box>
                        <Box sx={{ width: '100%', mr: 1, marginLeft:1, marginRight:1 }}>
                        <LinearProgress value={data.data_investors[selectedItemIdx].exited_to_strat_prcent} variant="determinate" />
                        </Box>
                      
                      </Box>


                      </Box>
    
                  </Box>
                  <Typography sx={{ marginTop:4, color:"#92C7F8", textAlign:"left", borderBottom:1}} >Most recent MxA Deals</Typography>
                  <Box sx={{border:"1px solid #D9D9D9", marginTop:1, borderRadius:2}}>
                  <Box sx={{display:"flex",  color:"#92C7F8", padding:3, fontWeight:"bold", justifyContent: "space-between",}}>
                    <Typography sx={{ }} >Date</Typography>
                    <Typography sx={{ }} >MxA deals</Typography>
                  </Box>
                  <Box sx={{display:"flex",  color:"#D9D9D9", padding:3, fontWeight:"bold", justifyContent: "space-between",}}>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].most_recent_deals[0].date}</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].most_recent_deals[0].company} ({data.data_investors[selectedItemIdx].most_recent_deals[0].deal_type})</Typography>
                  </Box>
                  {data.data_investors[selectedItemIdx].most_recent_deals.length > 1 &&
                  <Box sx={{display:"flex",  color:"#D9D9D9", padding:3, fontWeight:"bold", justifyContent: "space-between",}}>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].most_recent_deals[1].date}</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].most_recent_deals[1].company} ({data.data_investors[selectedItemIdx].most_recent_deals[1].deal_type})</Typography>
                  </Box>
                   }
                    {data.data_investors[selectedItemIdx].most_recent_deals.length > 2 &&
                  <Box sx={{display:"flex",  color:"#D9D9D9", padding:3, fontWeight:"bold", justifyContent: "space-between",}}>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].most_recent_deals[2].date}</Typography>
                    <Typography sx={{ }} >{data.data_investors[selectedItemIdx].most_recent_deals[2].company} ({data.data_investors[selectedItemIdx].most_recent_deals[2].deal_type})</Typography>
                  </Box>
                }
                </Box>
              </Box>
              
            </Box>
             }
          </Box>

  );
};

export default SearchInvestors;