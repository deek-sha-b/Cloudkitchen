import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getDashboardStats = () => api.get('/dashboard');
export const getAnalyticsData = () => api.get('/dashboard/analytics');

export const getOrders = (params) => api.get('/orders', { params });
export const createOrder = (orderData) => api.post('/orders', orderData);
export const updateOrder = (id, orderData) => api.put(`/orders/${id}`, orderData);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

export default api;
