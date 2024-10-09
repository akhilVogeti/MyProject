// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Box, Stack, FormControl, FormLabel, Typography, Link } from '@mui/joy';
import {login} from '../api';

const Login: React.FC = () => {

  interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
   
  }
  
  interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

 
  const navigate = useNavigate();
  document.title='Login'

  const handleLogin = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const userData = {
      username: formElements.username.value,
      password: formElements.password.value,
    };

    try {
      const response = await login( userData);
      console.log(`response is ${response.data}`);
      const token = response.data.access_token;
      console.log(`token is ${token}`)
      localStorage.setItem('token', token); // Store the token
      localStorage.setItem('username',userData.username);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
    <Box sx={{ textAlign: 'center', marginTop:4 }}> {/* Centering the headings */}
          <Typography level="h1">Welcome to Task Manager</Typography>
          <Typography level="h4">Bring order to your life</Typography>
    </Box>
    <Box
    sx={{
      marginTop:4 ,
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center', 
    }}
  >
  <Box component="main"
  sx={{
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: 400,
    maxWidth: '100%',
    mx: 'auto',
    border: '1px solid black',
    borderRadius: 'sm',
    boxShadow:2,
    '& form': {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    },
   
  }}>
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          
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
export default Login;
