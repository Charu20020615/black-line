import axiosInstance from './axiosInstance';

export const login = (email, password) => axiosInstance.post('/auth/login', { email, password });
export const register = (payload) => axiosInstance.post('/auth/register', payload);
export const getProfile = () => axiosInstance.get('/auth/profile');


