import React, { useState, useCallback } from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import debounce from 'lodash/debounce';
import { Icon } from '@iconify/react';

const Geography = ({setValues, values}) => {


  const data = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
    "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei",
    "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
    "Central African Rep", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo",
    "Congo {Democratic Rep}", "Costa Rica", "Croatia", "Cuba", "Cyprus",
    "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
    "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
    "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
    "Iran", "Iraq", "Ireland {Republic}", "Israel", "Italy", "Ivory Coast", "Jamaica",
    "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South",
    "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar, {Burma}", "Namibia", "Nauru",
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway",
    "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
    "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation",
    "Rwanda", "St Kitts & Nevis", "St Lucia", "Saint Vincent & the Grenadines", "Samoa",
    "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
    "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland",
    "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo",
    "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
    "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];
  
  const [openDropdown, setOpenDropdown] = useState(false);

  function handleDropdown(){
    setOpenDropdown(!openDropdown)
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
      {openDropdown &&
        <Box sx={{ maxHeight: '200px', overflowY: 'auto'}}>
          {data.map((dat, index) => (
            <Box sx={{backgroundColor:values.includes(dat)?'#B0B0B0':'#D9D9D9', paddingTop:"3px", paddingBottom:"3px", '&:hover': {backgroundColor: values.includes(dat)?'rgb(100,100,100)':'#B0B0B0' }}} onClick={() => handleClick(dat)} >{dat}
            </Box>
          ))}
        </Box>
      }
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
    </>

  );
};

export default Geography;
