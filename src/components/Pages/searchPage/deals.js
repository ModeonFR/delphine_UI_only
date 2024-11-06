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
  const [transactionType, setTransactionType] = useState("");


  //DATA
  const data = useSelector((state) => state.data);

  const sectorChoice = ["Information Technology", "Business Services", "Communications", "Internet Software and Services", "Software", "Media", "Insurance", "Healthcare Services", "Marketing", "Publishing", "Financial Services", "Information Services", "Staffing", "Digital Media", "Energy Services and Equipment", "Manufacturing", "Life Science", "E-Commerce", "Construction", "Consumer Products", "Retail", "Distribution", "Machinery", "Medical Products", "Oil/Gas Exploration", "Chemicals", "Automotive", "Consumer Services", "Technology Hardware", "Electrical Equipment", "Real Estate", "Packaging", "Beverages", "Environmental", "Food", "Plastics", "Renewable Energy", "Apparel/Textiles", "Test/Measurement Equipment", "Semiconductors", "Infrastructure", "Utilities", "Electronics", "Transportation", "Education", "Building Materials", "Metals/Mining", "Leisure", "Safety/Security", "Agriculture", "Restaurants", "Marine", "Engineering", "Aerospace", "Gaming", "Furniture", "Franchising", "Forest Products", "Airlines", "Defense", "Diversified"]
  const investorChoice = ["Private Equity", "Strategic", "Any"]
  const transctionTypeChoice = ['Stake Purchase', 'Divestiture', 'Add-on Acquisition', 'Merger', 'Buyout (LBO, MBO, MBI)', 'Growth Capital', 'Secondary Buyout', 'Stake Sale', 'Bankruptcy', 'Secondary Sale', 'IPO', 'Going Private', 'Unknown', 'Consolidation', 'Sold to Management', "Any"]
  useEffect(() => {
      console.log(data.data_deals)
  }, [data]);


  function launchSearch(){
    dispatch(searchDeal({query:sector, filters:{name_target:companyName, geography_target:geography, sector_target:sector,  name_buyer:companyName2, investortype:investortype, dealsize:dealSize, transactiontype:transactionType}}))
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
      console.log(data.data_deals[selectedItemIdx])

    }

}, [selectedItemIdx]);

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setAllChecked(isChecked);
    setCheckedItems(data.data_deals.reduce((acc, item, index) => {
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
      searchService.searchTargetName({ query: debouncedCompany }).then((res) => {
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
      searchService.searchBuyerName({ query: debouncedCompany2 }).then((res) => {
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

              <Box className='section-title-box'><Icon icon="grommet-icons:transaction" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Transaction type</Typography></Box>
              <FormControl fullWidth>
                <Select
                  value={transactionType || ''}
                  label=""
                  onChange={(e)=>{setTransactionType(e.target.value)}}
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return <Typography sx={{opacity:0.4}}>Select a transaction type</Typography>;
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
                  {transctionTypeChoice.map((s, index) => (
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


              <Box className='section-title-box'><Icon icon="ic:baseline-help-center" fontSize={24} color='#92C7F8'/> <Typography className='section-title'>Investor type</Typography></Box>
              <FormControl fullWidth>
                <Select
                  value={investortype || ''}
                  label=""
                  onChange={(e)=>{setInvestortype(e.target.value)}}
                  displayEmpty
                  renderValue={(value) => {
                    if (!value) {
                      return <Typography sx={{opacity:0.4}}>Select an investor type</Typography>;
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
                      <Typography className="result-column-title-text" >Target</Typography>
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
                      {data.data_deals && data.data_deals.length > 0 &&
                        <>
                        {data.data_deals.map((item, index) => (
                          <Box className="result-left-values" sx={{ backgroundColor: index % 2 !== 0 ? "rgba(0,0,0,0)":"rgba(25,25,25,0)" }}>
                            <Box className="result-column-value">
                              <Checkbox className="search-checkbox"  checked={checkedItems[index] || false} onChange={handleCheckboxChange(index)} sx={{ '&.Mui-checked': {color: '#D9D9D9',},'&.MuiCheckbox-root': {borderColor: '#D9D9D9',},'& .MuiSvgIcon-root': {border: `1px solid #D9D9D9`, },}}/>
                              <Typography className="result-column-title-text" >{index+1}</Typography>
                            </Box>
                            <Box className="result-column-value">
                              <Typography>{item.target}</Typography>
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
                      <Typography className="result-column-title-text" >Buyer</Typography>
                    </Box>
                    <Box className="result-column-title-medium">
                      <Typography className="result-column-title-text" >Seller</Typography>
                    </Box>
                    <Box className="result-column-title-big">
                      <Typography className="result-column-title-text" >Description</Typography>
                    </Box>
                    <Box className="result-column-title-medium">
                      <Typography className="result-column-title-text" >Deal value</Typography>
                    </Box>
                    <Box className="result-column-title-medium">
                      <Typography className="result-column-title-text" >Geography</Typography>
                    </Box>
                    <Box className="result-column-title-medium">
                      <Typography className="result-column-title-text" >Ann. date</Typography>
                    </Box>
                    <Box className="result-column-title-medium">
                      <Typography className="result-column-title-text" >Transaction type</Typography>
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
                      {data.data_deals && data.data_deals.length > 0 &&
                        <>
                        {data.data_deals.map((item, index) => (
                          <>
                            <Box  className="result-right-values" onClick={()=>{setSelectedItemIdx(index)}}  sx={{ backgroundColor: index % 2 !== 0 ? "rgba(0,0,0,0)":"rgba(25,25,25,0)" }}>
                              <Box className="result-column-value-medium" sx={{wordBreak:"break-word", whiteSpace:'normal'}}>
                                {item.buyer && 
                                  <Typography>{item.buyer.split(",")[0].slice(0, 80)}</Typography>
                                }
                              </Box>


                              <Box className="result-column-value-medium"  sx={{wordBreak:"break-word", whiteSpace:'normal'}}>
                                {item.seller && 
       
                                  <Typography>{item.seller.split(",")[0].slice(0, 80)}</Typography>
                                 }
                              </Box>

                              <Box className="result-column-value-big">
                                <Typography>{item.deal_desc}</Typography>
                              </Box>

                              <Box className="result-column-value-medium">
                                {item.deal_value && 
                                  <Typography>${item.deal_value}</Typography>
                                }
                              </Box>

                              <Box className="result-column-value-medium">
                                {item.geography.length < 40 &&
                                <Typography>{item.geography}</Typography>
                                }
                              </Box>

                              <Box className="result-column-value-medium">
                                <Typography>{item.ann_date}</Typography>
                              </Box>

                              <Box className="result-column-value-medium">
                                <Typography>{item.transaction_type}</Typography>
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
                  <Typography >Transaction data</Typography>
                  <Box sx={{marginLeft:"auto", cursor:"pointer"}}>
                    <Icon onClick={()=>{setSelectedItemIdx(null)}} icon="ic:twotone-close" fontSize={30} color='#D9D9D9'/>
                  </Box>

                  </Box>
                  <Box sx={{display:"flex", marginTop:1}}>
                    <Box sx={{display:"flex", flexDirection:'column', width:"49%"}}>
                      <Typography sx={{color:"#92C7F8", fontSize:20, borderBottom:"3px solid #92C7F8", textAlign:"left"}}>Target</Typography>
                      <Typography sx={{color:"white", fontSize:26, textAlign:"left"}}>{data.data_deals[selectedItemIdx].target}</Typography>
                      <Box sx={{display:"flex"}}>
                         <Icon icon="fluent:location-12-filled" fontSize={24} color='#D9D9D9'/>
                         {data.data_deals[selectedItemIdx].geography.length < 40 && 
                         <Typography sx={{color:"#D9D9D9", textAlign:"left"}}>{data.data_deals[selectedItemIdx].geography}</Typography>
                        }
                      </Box>
                      <Box sx={{display:"flex"}}>
                         <Icon icon="ic:baseline-group-work" fontSize={24} color='#D9D9D9'/>
                         <Typography sx={{color:"#D9D9D9", textAlign:"left"}}>{data.data_deals[selectedItemIdx].sector}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{display:"flex", flexDirection:'column', width:"49%", marginLeft:"auto"}}>
                      <Typography sx={{color:"#92C7F8", fontSize:20, borderBottom:"3px solid #92C7F8", textAlign:"left"}}>Buyer</Typography>
                      <Typography sx={{color:"white", fontSize:26, textAlign:"left"}}>{data.data_deals[selectedItemIdx].buyer.split("\n")[0]}</Typography>
                      <Box sx={{display:"flex"}}>
                         <Icon icon="fluent:location-12-filled" fontSize={24} color='#D9D9D9'/>
                         {data.data_deals[selectedItemIdx].geography.length < 40 && 
                         <Typography sx={{color:"#D9D9D9", textAlign:"left"}}>{data.data_deals[selectedItemIdx].buyer.split("\n")[2].split("·")[0]}</Typography>
                        }
                      </Box>
                      <Box sx={{display:"flex"}}>
                         <Icon icon="ic:baseline-group-work" fontSize={24} color='#D9D9D9'/>
                         <Typography sx={{color:"#D9D9D9", textAlign:"left"}}>{data.data_deals[selectedItemIdx].buyer.split("\n")[1].replace("Company ", "")}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography sx={{color:"#92C7F8", fontSize:20, borderBottom:"3px solid #92C7F8", textAlign:"left", marginTop:2}}>Transaction details</Typography>
                  <Typography sx={{ marginTop:2, color:"white", textAlign:"left"}}>{data.data_deals[selectedItemIdx].deal_desc}</Typography>
                  {data.data_deals[selectedItemIdx].deal_value && 
                    <Box className="dialog-value-box">
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon icon="rivet-icons:money" fontSize={32} color="#92C7F8" />
                      </Box>
                      <Box sx={{marginLeft:"15px", display:"flex", flexDirection:"column"}}>
                        <Typography sx={{color:"#D9D9D9", textAlign:"left"}} >Deal value</Typography>
                        <Typography sx={{color:"#D9D9D9", textAlign:"left", fontWeight:"bold"}} >${data.data_deals[selectedItemIdx].deal_value}M</Typography>
                      </Box>
                    </Box>
                  }
                  {data.data_deals[selectedItemIdx].ann_date && 
                    <Box className="dialog-value-box">
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon icon="lets-icons:date-fill" fontSize={32} color="#92C7F8" />
                      </Box>
                      <Box sx={{marginLeft:"15px", display:"flex", flexDirection:"column"}}>
                        <Typography sx={{color:"#D9D9D9", textAlign:"left"}} >Announced date</Typography>
                        <Typography sx={{color:"#D9D9D9", textAlign:"left", fontWeight:"bold"}} >{data.data_deals[selectedItemIdx].ann_date}</Typography>
                      </Box>
                    </Box>
                  }
                  {data.data_deals[selectedItemIdx].transaction_type && 
                    <Box className="dialog-value-box">
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon icon="mdi:exchange" fontSize={32} color="#92C7F8" />
                      </Box>
                      <Box sx={{marginLeft:"15px", display:"flex", flexDirection:"column"}}>
                        <Typography sx={{color:"#D9D9D9", textAlign:"left"}} >Transaction type</Typography>
                        <Typography sx={{color:"#D9D9D9", textAlign:"left", fontWeight:"bold"}} >{data.data_deals[selectedItemIdx].transaction_type}</Typography>
                      </Box>
                    </Box>
                  }
                  {data.data_deals[selectedItemIdx].investor_type && 
                    <Box className="dialog-value-box">
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon icon="mdi:bank-plus" fontSize={32} color="#92C7F8" />
                      </Box>
                      <Box sx={{marginLeft:"15px", display:"flex", flexDirection:"column"}}>
                        <Typography sx={{color:"#D9D9D9", textAlign:"left"}} >Investor type</Typography>
                        <Typography sx={{color:"#D9D9D9", textAlign:"left", fontWeight:"bold", textTransform: "capitalize"}} >
                          {data.data_deals[selectedItemIdx].investor_type}
                        </Typography>

                      </Box>
                    </Box>
                  }

              </Box>
                
            </Box>
             }
          </Box>

  );
};

export default Deals;