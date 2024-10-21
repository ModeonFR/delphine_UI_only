import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Box, Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel, Typography } from "@mui/material";


const continentsData = {
    Africa: ["Central and Southern Africa", "Northern Africa", "West Africa"],
    Americas: ["North America", "Central America", "South America"],
    Asia: ["Australasia", "Central Asia", "Japan", "North Asia", "South Asia", "South East Asia"],
    Europe: ["Central and Eastern Europe", "EU", "Northern Europe", "Southern Europe", "Western Europe"],
    "Middle East": ["GCC", "Middle East"],
  };

  const countriesData = {
    // Africa
    "Central and Southern Africa": [
      "Angola", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Cape Verde", 
      "Central African Republic", "Comoros", "Congo", "Congo, the Democratic Republic", 
      "Djibouti", "Eritrea", "Equatorial Guinea", "Ethiopia", "French Southern Territories", 
      "Gabon", "Ghana", "Guinea", "Heard and McDonald Island", "Ivory Coast", "Kenya", 
      "Lesotho", "Madagascar", "Malawi", "Mauritius", "Mayotte", "Mozambique", "Namibia", 
      "Nigeria", "Reunion", "Rwanda", "Saint Helena", "Somalia", "South Africa", "Swaziland", 
      "Tanzania", "Uganda", "Zambia", "Zimbabwe"
    ],
    "Northern Africa": [
      "Algeria", "Chad", "Egypt", "Liberia", "Libya", "Mali", "Mauritania", 
      "Sao Tome and Principe", "South Sudan", "Tunisia", "Western Sahara"
    ],
    "West Africa": [
      "Benin, Republic of", "Guinea-Bissau", "Niger", "Senegal", 
      "Sierra Leone", "Togo"
    ],
  
    // Americas
    "North America": [
      "United States", "Anguilla", "Antigua", "Aruba", "Barbados", "Bermuda", "Bonaire", 
      "British Virgin Islands", "Canada", "Cayman Islands", "Cuba", "Curacao", 
      "Grenada", "Guadeloupe", "Jamaica", "Martinique", "Mexico", "Montserrat", 
      "Netherlands Antilles", "Puerto Rico", "Saint Barthelemy", "Saint Lucia", 
      "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", 
      "Trinidad & Tobago"
    ],
    "Central America": [
      "Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Panama"
    ],
    "South America": [
      "Antarctica", "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", 
      "Ecuador", "French Guyana", "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela"
    ],
  
    // Asia
    "Australasia": [
      "American Samoa", "Australia", "Cook Islands", "Fiji", "French Polynesia", "Guam", 
      "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Caledonia", 
      "New Zealand", "Norfolk Islands", "Palau", "Papua New Guinea", "Pitcairn", 
      "Samoa", "Solomon Islands", "Tokelau", "Tonga", "Tuvalu", "Vanuatu"
    ],
    "Central Asia": [
      "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Uzbekistan"
    ],
    "Japan": [
      "Japan"
    ],
    "North Asia": [
      "China", "Hong Kong", "Macau", "Mongolia", "North Korea", 
      "South Korea", "Taiwan"
    ],
    "South Asia": [
      "Bangladesh", "Bhutan", "India", "Maldives", "Nepal", "Pakistan", 
      "Republic of Seychelles", "Sri Lanka"
    ],
    "South East Asia": [
      "Brunei", "Cambodia", "Indonesia", "Laos", "Malaysia", "Myanmar", 
      "Philippines", "Singapore", "Thailand", "Timor", "Vietnam"
    ],
  
    // Europe
    "Central and Eastern Europe": [
      "Armenia", "Azerbaijan", "Belarus", "Bosnia-Herzegovina", "Bulgaria", 
      "Croatia", "Czech Republic", "Estonia", "Georgia", "Hungary", "Latvia", 
      "Lithuania", "Moldova", "Montenegro", "Poland", "Romania", "Russia", 
      "Republic of North Macedonia", "Serbia", "Serbia & Montenegro", "Slovakia", 
      "Slovenia", "Ukraine", "Yugoslavia"
    ],
    "EU": [
      "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", 
      "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", 
      "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", 
      "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", 
      "Spain", "Sweden", "United Kingdom"
    ],
    "Northern Europe": [
      "Denmark", "Finland", "Greenland", "Iceland", "Norway", "Sweden"
    ],
    "Southern Europe": [
      "Albania", "Cyprus", "Gibraltar", "Greece", "Italy", "Malta", 
      "Portugal", "San Marino", "Spain", "Turkey"
    ],
    "Western Europe": [
      "Andorra", "Austria", "Belgium", "Jersey", "France", "Germany", 
      "Guernsey", "Ireland", "Liechtenstein", "Luxembourg", "Monaco", 
      "Netherlands", "Switzerland", "United Kingdom"
    ],
  
    // Middle East
    "GCC": [
      "Bahrain", "Kuwait", "Oman", "Qatar", "Saudi Arabia", "United Arab Emirates"
    ],
    "Middle East": [
      "Afghanistan", "Bahrain", "Iran", "Iraq", "Israel", "Jordan", "Kuwait", 
      "Lebanon", "Oman", "Palestine", "Qatar", "Saudi Arabia", 
      "Syrian Arab Republic", "United Arab Emirates", "Yemen"
    ],
  };

  

const GeographyDialog = ({ open, onClose, selectedCountries, setSelectedCountries }) => {
    const [selectedContinents, setSelectedContinents] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);

  
    // Handle continent selection and auto-select regions
    const handleContinentChange = (event) => {
      const value = event.target.value;
      setSelectedContinents(value);
      
      // Auto-select all regions from the selected continents
      const regionsFromContinents = value.reduce((acc, continent) => {
          return [...acc, ...continentsData[continent]];
      }, []);
      setSelectedRegions(regionsFromContinents);

      // Auto-select all countries from the selected regions
      const countriesFromRegions = regionsFromContinents.reduce((acc, region) => {
          return [...acc, ...countriesData[region]];
      }, []);
      setSelectedCountries(countriesFromRegions);
  };

  // Handle region selection and auto-select countries
  const handleRegionChange = (event) => {
      const value = event.target.value;
      setSelectedRegions(value);

      // Auto-select all countries from the selected regions
      const countriesFromRegions = value.reduce((acc, region) => {
          return [...acc, ...countriesData[region]];
      }, []);
      setSelectedCountries(countriesFromRegions);
  };

  const handleCountryChange = (event) => {
      setSelectedCountries(event.target.value);
  };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Select Geography</DialogTitle>
      <DialogContent>
        <Box display="flex" gap={2} sx={{flexDirection:"column"}}>
          <Typography>Continents</Typography>
          <FormControl fullWidth>
            <Select
              multiple
              value={selectedContinents}
              onChange={handleContinentChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {Object.keys(continentsData).map((continent) => (
                <MenuItem key={continent} value={continent}>
                  <Checkbox checked={selectedContinents.indexOf(continent) > -1} />
                  <ListItemText primary={continent} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography>Regions</Typography>
          <FormControl fullWidth>
            <Select
              multiple
              value={selectedRegions}
              onChange={handleRegionChange}
              renderValue={(selected) => selected.join(", ")}
              disabled={selectedContinents.length === 0} // Disable if no continent is selected
            >
              {selectedContinents.map((continent) =>
                continentsData[continent].map((region) => (
                  <MenuItem key={region} value={region}>
                    <Checkbox checked={selectedRegions.indexOf(region) > -1} />
                    <ListItemText primary={region} />
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <Typography>Countries</Typography>
          <FormControl fullWidth>

            <Select
              multiple
              value={selectedCountries}
              onChange={handleCountryChange}
              renderValue={(selected) => selected.join(", ")}
              disabled={selectedRegions.length === 0} // Disable if no region is selected
            >
              {selectedRegions.map((region) =>
                countriesData[region]?.map((country) => (
                  <MenuItem key={country} value={country}>
                    <Checkbox checked={selectedCountries.indexOf(country) > -1} />
                    <ListItemText primary={country} />
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={() => {onClose(selectedCountries)}}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default GeographyDialog;
