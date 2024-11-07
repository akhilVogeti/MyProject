// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Box, Stack, FormControl, FormLabel, Typography, Link } from '@mui/joy';
import {  SignInFormElement } from '../types';
//import {login} from '../api/auth';
import { login } from '../features/auth/authThunk';
import { muiStyles } from './styles/styles';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';

const Login: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { token } = useSelector((state: RootState) => state.auth);



  useEffect(() => {
      document.title='Login';
  },[]);

  useEffect(() => {
    if (token) {
      //localStorage.setItem('token', token); 
      navigate('/dashboard');
    }
  }, [token, navigate]);
 
 


  const handleLogin = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const userData = {
      username: formElements.username.value,
      password: formElements.password.value,
    };

    // try {
    //   const response = await login( userData);
    //   const token = response.data.access_token;
    //   localStorage.setItem('token', token); // Store the token
     
    //   navigate('/dashboard');
    // } catch (error) {
    //   console.error('Login error:', error);
    // }

    dispatch(login(userData));
  };

  return (
    <>
      <Box sx={muiStyles.loginPageHeader}> 
            <Typography level="h1">Welcome to Task Manager</Typography>
            <Typography level="h4">Bring order to your life</Typography>
      </Box>

      <Box sx={muiStyles.loginBoxHeader}>
        <Box component="main" sx={muiStyles.loginForm}>
          <Typography level="h4" >Login</Typography>
          <Stack >
            <form onSubmit={handleLogin} >
              <FormControl required>
                <FormLabel>Username</FormLabel>
                <Input  name="username" />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
              <Stack sx={{ gap: 4, mt: 1 }}>
                <Box sx={muiStyles.loginFooterBox}> 
                  <Link level="title-sm" href="/register">
                    New User? Register here
                  </Link>
                </Box>
                <Button type="submit" fullWidth>
                  Sign In
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
export const acess_token = (state: RootState) => state.auth.token;
export default Login;

