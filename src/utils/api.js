import axios from 'axios';

const API_URL = 'http://yourbackend.api/endpoint';

export const fetchData = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/data`);
    return data;
  } catch (error) {
    throw error;
  }
};
