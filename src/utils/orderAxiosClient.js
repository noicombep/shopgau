import axios from 'axios';

const orderAxiosClient = axios.create({
  baseURL: 'https://api.shopgau.store/api',
  withCredentials: true, // gửi cookie
});

// ví dụ checkout
export const checkout = async (orderData) => {
  const response = await orderAxiosClient.post('/order', orderData);
  return response.data;
};
export default orderAxiosClient;
