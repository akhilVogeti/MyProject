import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI, Credentials } from '../../service/auth.service';


export const login = createAsyncThunk('auth/login', async (credentials: Credentials) => {
    try {     
      const response = await loginAPI(credentials);     
      const token = response.data.access_token;
      //localStorage.setItem('token', token); 
      return  token ; 
    } catch (error: any) {
      console.log(error);
    }
  }
);


export const register = createAsyncThunk(  'auth/register', async (credentials: Credentials) => {
    try {
      const response = await registerAPI(credentials);
      return response.data; 
    } catch (error: any) {
      console.log(error);
    }
  }
);
