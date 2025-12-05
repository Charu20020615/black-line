import axios from 'axios';

// Use environment variable for API URL, fallback to relative path for production
const getApiBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    // If it's a full URL, use it; otherwise treat as relative path
    return envUrl.startsWith('http') ? envUrl : envUrl;
  }
  // In production on Vercel, use relative path; in development, use localhost
  return import.meta.env.PROD ? '/api' : 'http://localhost:4000/api';
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


