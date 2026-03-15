import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const orderAxiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // gửi cookie
});

// ví dụ checkout
export const checkout = async (orderData) => {
  const response = await orderAxiosClient.post('/order', orderData);
  return response.data;
};
export default orderAxiosClient;
