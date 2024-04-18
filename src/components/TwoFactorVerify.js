import React, { useState } from 'react';
import apiService from '../services/apiService.js';

const TwoFactorVerify = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await apiService.verify2FA(token);
      alert('2FA Verified successfully!');
      // Redirect or update state as necessary
    } catch (err) {
      setError('Failed to verify 2FA. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <input
          type="text"
          value={token}
          onChange={e => setToken(e.target.value)}
          placeholder="Enter your 2FA token"
          required
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default TwoFactorVerify;
