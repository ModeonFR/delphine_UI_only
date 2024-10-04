import React from 'react';
import {Box,Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const PlaceholderPage = () => {

  return (
    <Box className="placeholder-page">
        <ConstructionIcon className='placeholder-icon'/>
        <Typography >
            This page is under construction.
        </Typography>
    </Box>
  );
};

export default PlaceholderPage;