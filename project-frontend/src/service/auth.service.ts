import {APIService} from './api.service';

export interface Credentials {
  username: string,
  password: string
}

const apiService = new APIService();

export const loginAPI = (credentials: Credentials) => {
    return apiService.post('/auth/login', credentials);
}

export const registerAPI = (userData: Credentials) => {
    return apiService.post('/auth/register', userData);
}

