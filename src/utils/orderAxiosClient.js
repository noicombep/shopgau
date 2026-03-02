import axios from 'axios';

const orderAxiosClient = axios.create({
  baseURL: 'http://noicombep.southeastasia.cloudapp.azure.com/api',
  withCredentials: true, // gửi cookie
});

// ví dụ checkout
export const checkout = async (orderData) => {
  const response = await orderAxiosClient.post('/order', orderData);
  return response.data;
};
export default orderAxiosClient;
