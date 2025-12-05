import axiosInstance from './axiosInstance';

export const getProducts = async (category = null) => {
  const params = category ? { category } : {};
  const response = await axiosInstance.get('/products', { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/products', productData);
    return response.data;
  } catch (error) {
    // Re-throw with better error message
    if (error.response?.data?.errors) {
      const errorMessage = error.response.data.errors.map(err => err.msg).join(', ');
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    // Re-throw with better error message
    if (error.response?.data?.errors) {
      const errorMessage = error.response.data.errors.map(err => err.msg).join(', ');
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};

