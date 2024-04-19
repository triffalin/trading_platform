import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import SignUp from './components/Register';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import TwoFactorSetup from './components/TwoFactorSetup';
import TwoFactorVerify from './components/TwoFactorVerify';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/two-factor-setup" element={<TwoFactorSetup />} />
        <Route path="/two-factor-verify" element={<TwoFactorVerify />} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
