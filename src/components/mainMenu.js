import React, { useState, useEffect, useRef  } from 'react';
import {Box, Button,TextField,Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/logo.png'
import PlaceholderPage from './Pages/placeholderPage';
import SearchPage from './Pages/searchPage/searchPage';

const MainMenu = () => {
    const dispatch = useDispatch();

    //USER
    const user = useSelector((state) => state.user);


    //NAVIGATION VARIABLES
    const [menuIdx, setMenuIdx] = useState(0);
    

  return (
    <Box className="main">
        <Box className="banner">
            <img className='logo' src={logo}  alt="logo" />
            <Box className='buttonbox'>
                <Button className='button' sx={{opacity:menuIdx===0?1:0.6}} onClick={()=>{setMenuIdx(0)}}>Search</Button>
                <Button className='button' sx={{opacity:menuIdx===1?1:0.6}}onClick={()=>{setMenuIdx(1)}}>My lists</Button>
                <Button className='button' sx={{opacity:menuIdx===2?1:0.6}}onClick={()=>{setMenuIdx(2)}}>New list</Button>
            </Box>

        </Box>

        <Box className="pages-container">
            {menuIdx === 0 &&
                <SearchPage></SearchPage>
            }
            {menuIdx === 1 &&
                <PlaceholderPage></PlaceholderPage>
            }
            {menuIdx === 2 &&
                <PlaceholderPage></PlaceholderPage>
            }
        </Box>
    </Box>
  );
};

export default MainMenu;
