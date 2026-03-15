import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { adminApi } from "../../api/adminApi";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await adminApi.getOrderById(id);
        setOrder(res.data);
      } catch (err) {
        console.error("Error loading order:", err);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Order #{order.id}</h1>

      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <p><strong>User:</strong> {order.username}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment:</strong> {order.statusFee}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Total:</strong> {order.totalAmount?.toLocaleString()}đ</p>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {order.orderItems?.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.productName}</td>
                <td className="p-3">{item.price?.toLocaleString()}đ</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">
                  {(item.price * item.quantity).toLocaleString()}đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}