// Use the same base URL logic as axiosInstance
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

export const uploadImages = async (files) => {
  const formData = new FormData();
  
  // Append all files to FormData
  files.forEach((file) => {
    formData.append('images', file);
  });

  // Get token for auth
  const token = localStorage.getItem('token');
  const baseURL = getApiBaseURL();

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
  const baseURL = getApiBaseURL();

  if (!token) {
    throw new Error('You must be logged in to upload images. Please log in and try again.');
  }

  const response = await fetch(`${baseURL}/upload/single`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData
  });

  if (!response.ok) {
    let errorMessage = 'Upload failed';
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch (e) {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    
    if (response.status === 401) {
      throw new Error('Authentication failed. Please log in again.');
    } else if (response.status === 403) {
      throw new Error('You do not have permission to upload images. Admin access required.');
    } else {
      throw new Error(errorMessage);
    }
  }

  return await response.json();
};

