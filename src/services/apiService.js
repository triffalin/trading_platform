import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // The URL of your backend

export const loginUser = async userData => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error.response);
    throw error;
  }
};
