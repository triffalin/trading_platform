import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TwoFactorSetup = () => {
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');

  useEffect(() => {
    const get2FA = async () => {
      try {
        const res = await axios.get('/api/users/setup-2fa');
        setQrCode(res.data.qrCode);
        setSecret(res.data.secret);
      } catch (error) {
        console.error(error);
      }
    };

    get2FA();
  }, []);

  return (
    <div>
      <h1>Set up Two-Factor Authentication</h1>
      {qrCode && <img src={qrCode} alt="QR Code" />}
      <p>Secret for manual entry: {secret}</p>
    </div>
  );
};

export default TwoFactorSetup;
