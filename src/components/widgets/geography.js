import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import debounce from 'lodash/debounce';
import { Icon } from '@iconify/react';
import GeographyDialog from './country';
const Geography = ({setValues, values}) => {


  const [openDropdown, setOpenDropdown] = useState(false);

  const [geoDialog, setGeoDialog] = useState(false); 

  function handleDropdown(){
    setGeoDialog(!geoDialog)
  }

  const handleClick = (dat) => {
    setValues((prevValues) => {
      // Only add the value if it's not already in the list
      if (!prevValues.includes(dat)) {
        return [...prevValues, dat];
      }
      else{
        return prevValues.filter((item) => item !== dat);
      }
    });
  };

  return (
    <>
      <Box
        onClick={handleDropdown}
        sx={{
          border: "1px solid #D9D9D9",
          borderRadius: "3px",
          height: "37px",
          maxHeight: "37px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", 
          paddingLeft: "16px",
          paddingRight: "10px",
        }}
      >
        <Typography sx={{ opacity: 0.4, color: "#D9D9D9", textAlign: "left" }}>
          Select a geographical area
        </Typography>
        {openDropdown?
          <Icon
            icon="iconamoon:arrow-up-2-fill"
            fontSize={29}
            color="#D9D9D9"
            sx={{ marginLeft: "auto"}}
          />
          :
          <Icon
            icon="iconamoon:arrow-down-2-fill"
            fontSize={29}
            color="#D9D9D9"
            sx={{ marginLeft: "auto" }}
          />
        }
        
      </Box>
      <Box sx={{ display:"flex", alignContent:"flex-start", marginTop:"10px", flexWrap: "wrap", gap:'10px'}}>
        {values.map((value, index) => (
          <Box onClick={()=>{handleClick(value)}} sx={{backgroundColor:"#112232", color:"white", borderRadius:"3px", border:"1px solid #D9D9D9", padding:"5px", alignItems: "center", display:"flex", '&:hover': {backgroundColor:'#B0B0B0', cursor: 'pointer'  }}}>
            <Icon
              icon="radix-icons:dot-filled"
              fontSize={16}
              color="#D9D9D9"
            />
            {value}
            <Icon
              icon="radix-icons:cross-2"
              fontSize={16}
              color="#D9D9D9"
            />
          </Box>
        ))}
      </Box>

      {geoDialog && 
      
      <GeographyDialog open={geoDialog} onClose={()=>{setGeoDialog(false)}} selectedCountries={values} setSelectedCountries={setValues} ></GeographyDialog>
      }

    </>

  );
};

export default Geography;
