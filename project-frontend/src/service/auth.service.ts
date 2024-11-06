import axios from 'axios';

export interface Credentials {
  username: string,
  password: string
}

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
      },
});



export const loginAPI = (credentials : Credentials) => {
  return api.post('/auth/login', credentials);
}

export const registerAPI = (userData : Credentials) => api.post('/auth/register', userData);

