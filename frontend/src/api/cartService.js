import axiosInstance from './axiosInstance';

// Generate or get session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random()}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export const getCart = async () => {
  const sessionId = getSessionId();
  const response = await axiosInstance.get('/cart', {
    headers: { 'x-session-id': sessionId }
  });
  return response.data;
};

export const addToCart = async (productId, quantity = 1, size = null, color = null) => {
  const sessionId = getSessionId();
  const response = await axiosInstance.post('/cart', {
    productId,
    quantity,
    size,
    color
  }, {
    headers: { 'x-session-id': sessionId }
  });
  return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const sessionId = getSessionId();
  const response = await axiosInstance.put(`/cart/${itemId}`, {
    quantity
  }, {
    headers: { 'x-session-id': sessionId }
  });
  return response.data;
};

export const removeFromCart = async (itemId) => {
  const sessionId = getSessionId();
  const response = await axiosInstance.delete(`/cart/${itemId}`, {
    headers: { 'x-session-id': sessionId }
  });
  return response.data;
};

export const clearCart = async () => {
  const sessionId = getSessionId();
  const response = await axiosInstance.delete('/cart', {
    headers: { 'x-session-id': sessionId }
  });
  return response.data;
};


