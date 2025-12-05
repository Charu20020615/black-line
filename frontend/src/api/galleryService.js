import axiosInstance from './axiosInstance';

export const getGalleryPhotos = async () => {
  const response = await axiosInstance.get('/gallery');
  return response.data;
};

export const getFeaturedPhotos = async () => {
  const response = await axiosInstance.get('/gallery/featured');
  return response.data;
};

export const getGalleryPhotoById = async (id) => {
  const response = await axiosInstance.get(`/gallery/${id}`);
  return response.data;
};

export const createGalleryPhoto = async (imageUrl, featured = false, order = 0) => {
  try {
    const response = await axiosInstance.post('/gallery', {
      imageUrl,
      featured,
      order
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const updateGalleryPhoto = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/gallery/${id}`, data);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const deleteGalleryPhoto = async (id) => {
  const response = await axiosInstance.delete(`/gallery/${id}`);
  return response.data;
};

