import React, { useState, useEffect } from 'react';
import { Box, TextField, Button,  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'; 
import {  useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { login } from '../store/userSlice';
import logo from '../assets/logo.png'

const LoginMenu = () => {
    const [errorPopup, setErrorPopup] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setemail] = useState("");
    const dispatch = useDispatch();

    const handleLogin = () => {
        verifyPassword(email, password);
        cookies.set("password", password)
        cookies.set("email", email)
    };

    async function verifyPassword(usern, pass){
        if(pass && usern){
            dispatch(login({email:usern, password:pass})).then((response)=>{

                if(!response.payload.result){
                    setErrorPopup(true)
                }
            })
        }
    }

    const cookies = new Cookies();
    /*
    useEffect(() => {
        const pass = cookies.get('password')
        const usern = cookies.get('email')
        verifyPassword(usern, pass)
        
    }, []);
    */


    function ErrorDialog({ open, handleClose }) {
        return (
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Incorrect email or password. Please try again.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                OK
                </Button>
            </DialogActions>
            </Dialog>
        );
        }

      
  return (
    <Box className="login-container">
        <Box className="password-container">
            
            <TextField 
                label="Email" 
                variant="filled" 
                className="password-field" 
                onChange={(e) => setemail(e.target.value)}
            />
            <TextField 
                label="Password" 
                variant="filled" 
                className="password-field" 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="ok-button" onClick={handleLogin}>
                Login
            </Button>

        <ErrorDialog open={errorPopup} handleClose={()=>{setErrorPopup(false)}} />
        </Box>
    </Box>
  );
};

export default LoginMenu;
