import React from 'react';
import { Box } from '@mui/material'; 
import { useSelector } from 'react-redux';
import LoginPage from './components/loginMenu';
import MainPage from './components/mainMenu';

const Landing = () => {
  const user = useSelector((state) => state.user);

   
  return (
    <Box className="container">
      {user.connected  ? (
        <MainPage></MainPage>
      ) : (
        <LoginPage></LoginPage>
      )}
    </Box>
  );
};

export default Landing;
