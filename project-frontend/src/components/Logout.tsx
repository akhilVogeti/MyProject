import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../app/store';
import { useDispatch} from 'react-redux';
import {logout } from '../features/auth/authSlice'


const Logout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => { 
    dispatch(logout());
    navigate('/'); 
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
