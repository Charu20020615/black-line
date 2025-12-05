import axiosInstance from './axiosInstance';

const getSessionId = () => {
  return localStorage.getItem('sessionId');
};

export const createOrder = async (orderData) => {
  const sessionId = getSessionId();
  const response = await axiosInstance.post('/orders', orderData, {
    headers: { 'x-session-id': sessionId }
  });
  return response.data;
};

export const getOrders = async () => {
  const response = await axiosInstance.get('/orders');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await axiosInstance.put(`/orders/${id}/status`, { status });
  return response.data;
};


