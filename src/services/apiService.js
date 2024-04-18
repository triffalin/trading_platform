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
  const response = await apiClient.post('/register', userData);
  return response.data;
};

// Login user
const login = async credentials => {
  const response = await apiClient.post('/login', credentials);
  // Set token to localStorage or manage session here if needed
  localStorage.setItem('user', JSON.stringify(response.data));
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
