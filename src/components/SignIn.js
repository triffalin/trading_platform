import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });
      setMessage('Login successful');
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setMessage('Login failed: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <button
        onClick={() =>
          (window.location.href = 'http://localhost:5000/auth/google')
        }
      >
        Sign in with Google
      </button>
      <Link to="/forgot-password">Forgot Password?</Link>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignIn;
