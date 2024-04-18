import React, { useState } from 'react';
import apiService from '../services/apiService';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await apiService.login({ email, password });
      setMessage('Login successful');
      localStorage.setItem('user', JSON.stringify(res.data)); // Save the logged-in user to local storage
      navigate('/dashboard'); // Redirect to the user dashboard or home page after login
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Login failed. Please try again later.'
      );
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h1 className="signin-title">Sign In</h1>
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="signin-actions">
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
            {message && <p>{message}</p>}
            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </div>
        </form>
        <div className="social-signin">
          <button
            onClick={() =>
              (window.location.href = 'http://localhost:5000/auth/google')
            }
            className="google-signin"
          >
            Continue in with Google
          </button>
        </div>
        <div className="signup-link-container">
          <Link to="/sign-up" className="signup-link">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
