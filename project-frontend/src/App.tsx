import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard.tsx';

import PrivateRoute from './components/PrivateRoute.tsx'

const App: React.FC = () => {
  return (
   <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={ <PrivateRoute component={<Dashboard/>} ></PrivateRoute>} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
