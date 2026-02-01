import axiosClient from "../utils/axiosClient"; 

export const orderApi = {
  createOrder: (data) => axiosClient.post("/order", data),
  getMyOrders: () => axiosClient.get("/order/my-orders"),
    checkPayment: (orderId) => axiosClient.get(`/order/check-payment/${orderId}`)
};
