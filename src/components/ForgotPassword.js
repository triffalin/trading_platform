import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/users/forgot-password',
        { email }
      );
      setMessage('Password reset email sent');
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setMessage('Password reset failed: ' + error.message);
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
