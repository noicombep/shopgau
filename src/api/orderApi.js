import orderAxiosClient from "../utils/orderAxiosClient"; 

export const orderApi = {
  createOrder: (data) => orderAxiosClient.post("/order", data),
  getMyOrders: () => orderAxiosClient.get("/order/my-orders"),
    checkPayment: (orderId) => orderAxiosClient.get(`/order/check-payment/${orderId}`)
};
