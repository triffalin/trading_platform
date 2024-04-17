import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        email,
        password
      });
      setMessage('Registration successful');
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setMessage('Registration failed: ' + error.message);
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
