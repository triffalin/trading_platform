import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService.js';

const TwoFactorSetup = () => {
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const setup2FA = async () => {
      try {
        const response = await apiService.setup2FA();
        setQrCode(response.data.qrCode);
      } catch (err) {
        setError('Failed to setup 2FA. Please try again.');
      }
    };

    setup2FA();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {qrCode && <img src={qrCode} alt="QR Code" />}
      {!qrCode && !error && <p>Loading...</p>}
    </div>
  );
};

export default TwoFactorSetup;
