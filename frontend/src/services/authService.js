import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config.url); // Debug log
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Error:', error); // Debug log
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Server is not running. Please start the backend server.');
    }
    throw error;
  }
);

export const loginUser = async (formData) => {
  try {
    const response = await api.post('/auth/login', formData);
    return response;
  } catch (error) {
    console.error('Login error details:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
    throw error;
  }
};
