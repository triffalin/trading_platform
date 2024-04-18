import React, { useState } from 'react';
import apiService from '../services/apiService.js';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await apiService.forgotPassword({ email });
      setMessage('Password reset email sent');
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/signin');
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'Password reset failed. Please try again later.'
      );
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h1 className="forgot-password-title">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter Your email"
              required
            />
          </div>
          <button type="submit" className="forgot-password-btn">
            Reset Password
          </button>
          {message && <p>{message}</p>}
        </form>
        <div className="signin-link-container">
          <Link to="/sign-in" className="signin-link">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
