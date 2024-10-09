import React from 'react';
import {  useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ReactElement; // Use React.ReactElement for a single element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  

  // If token exists, render the passed component; otherwise, redirect to login
  if(token) {
    return component;
  } else {
    navigate('/login');
  }
};

export default PrivateRoute;
