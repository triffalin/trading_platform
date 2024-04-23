import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Update this URL based on your actual API URL

// Helper function to create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Register user
const register = async userData => {
  const response = await apiClient.post('/sign-up', userData);
  return response.data;
};

// Login user
const login = async credentials => {
  const response = await apiClient.post('/sign-in', credentials);
  if (response.data.token && response.data.user) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  } else {
    throw new Error('Invalid server response. Token or user data is missing.');
  }
  return response.data;
};

// Forgot password
const forgotPassword = async email => {
  const response = await apiClient.post('/forgot-password', { email });
  return response.data;
};

// Reset password
const resetPassword = async (token, newPassword) => {
  const response = await apiClient.post(`/reset-password/${token}`, {
    password: newPassword
  });
  return response.data;
};

// Setup 2FA
const setup2FA = async () => {
  const response = await apiClient.get('/two-factor-setup');
  return response.data;
};

// Verify 2FA
const verify2FA = async token => {
  const response = await apiClient.post('/two-factor-verify', { token });
  return response.data;
};

// Sign out or clear session
const signOut = () => {
  localStorage.removeItem('user');
  // Perform other cleanup actions if necessary
};

const apiService = {
  register,
  login,
  forgotPassword,
  resetPassword,
  setup2FA,
  verify2FA,
  signOut
};

export default apiService;
