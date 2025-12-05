import axiosInstance from './axiosInstance';

export const uploadImages = async (files) => {
  const formData = new FormData();
  
  // Append all files to FormData
  files.forEach((file) => {
    formData.append('images', file);
  });

  // Get token for auth
  const token = localStorage.getItem('token');
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

  // Use fetch instead of axios to properly handle FormData
  const response = await fetch(`${baseURL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      // Don't set Content-Type - browser will set it with boundary
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Upload failed');
  }

  return await response.json();
};

export const uploadSingleImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const token = localStorage.getItem('token');
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

  const response = await fetch(`${baseURL}/upload/single`, {
    method: 'POST',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Upload failed');
  }

  return await response.json();
};

