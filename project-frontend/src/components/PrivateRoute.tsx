import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { PrivateRouteProps } from '../types';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login'); 
    }
  }, [token, navigate]);

  
  if(token) 
    return component;
  
  
};

export default PrivateRoute;
