import axiosClient from "../utils/axiosClient";

export const adminApi = {

  getStats: () => axiosClient.get("/admin/stats"),

  getRevenueChart: () => axiosClient.get("/admin/revenue-chart"),
  getAllOrders: () => axiosClient.get("/admin/orders"),
  updateOrderStatus: (id, status) => axiosClient.put(`/admin/orders/${id}`, { status }),
  getAllUsers: () => axiosClient.get("/admin/users"),
  updateUserRole: (id, roleId) => axiosClient.put(`/admin/users/${id}`, { roleId }),
  getAllProducts: () => axiosClient.get("/admin/products"),
  createProduct: (data) => axiosClient.post("/admin/products", data),
  updateProduct: (id, data) => axiosClient.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => axiosClient.delete(`/admin/products/${id}`),
  getAllCategories: () => axiosClient.get("/admin/categories"),
  createCategory: (data) => axiosClient.post("/admin/categories", data),
  updateCategory: (id, data) => axiosClient.put(`/admin/categories/${id}`, data),
  deleteCategory: (id) => axiosClient.delete(`/admin/categories/${id}`),
  getOrderById: (id) => axiosClient.get(`/admin/orders/${id}`)
};