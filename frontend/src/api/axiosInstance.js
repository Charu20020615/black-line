import axios from 'axios';

// Use environment variable for API URL, fallback to backend URL for production
const getApiBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    // If it's a full URL, ensure it ends with /api
    if (envUrl.startsWith('http')) {
      // Remove trailing slash if present, then add /api
      return envUrl.replace(/\/$/, '') + '/api';
    }
    // If it's a relative path, use as is
    return envUrl;
  }
  // In production, use the backend URL; in development, use localhost
  return import.meta.env.PROD 
    ? 'https://black-line-back.vercel.app/api' 
    : 'http://localhost:4000/api';
};

const axiosInstance = axios.create({
  baseURL: getApiBaseURL(),
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;


