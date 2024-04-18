import React, { useState } from 'react';
import apiService from '../services/apiService.js';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await apiService.register({ email, password });
      setMessage('Registration successful');
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/signin');
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'Registration failed. Please try again later.'
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Sign Up</h1>
        <form onSubmit={handleSubmit} className="register-form">
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
          <button type="submit" className="register-btn">
            Register
          </button>
          {message && <p>{message}</p>}
        </form>
        <div className="social-register">
          <button
            onClick={() =>
              (window.location.href = 'http://localhost:5000/auth/google')
            }
            className="google-register"
          >
            Continue in with Google
          </button>
        </div>
        <div className="login-link-container">
          <Link to="/sign-in" className="login-link">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
