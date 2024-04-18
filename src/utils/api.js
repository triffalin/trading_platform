import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchData = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/data`);
    return data;
  } catch (error) {
    throw error;
  }
};
