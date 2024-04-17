import React, { useState } from 'react';
import axios from 'axios';

const TwoFactorVerify = () => {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      // Replace with your API endpoint for verifying 2FA
      const res = await axios.post(
        'http://localhost:5000/api/users/verify-2fa',
        { token }
      );
      setMessage('2FA verification successful.');
      console.log(res.data);
      // Redirect or perform further actions after successful verification
    } catch (error) {
      console.error(error.response.data);
      setMessage('2FA verification failed. ' + error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Two-Factor Authentication</h1>
        <input
          type="text"
          value={token}
          onChange={e => setToken(e.target.value)}
          placeholder="Enter your 2FA token"
          required
        />
        <button type="submit">Verify</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default TwoFactorVerify;
