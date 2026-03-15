import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { adminApi } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";

const statusOptions = ["PENDING", "CONFIRMED", "SHIPPING", "DELIVERED", "CANCEL"];

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await adminApi.getAllOrders();
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminApi.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {

    const matchStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    const matchSearch =
      order.username
        ?.toLowerCase()
        .includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="flex gap-4 mb-4">

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="ALL">All Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

        </div>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.username || "N/A"}</td>
                <td className="p-4">{order.totalAmount?.toLocaleString()}đ</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4">{order.paymentStatus || "N/A"}</td>
                <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <button
                    onClick={() => navigate(`/admin/orders/${order.id}`)}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </button>                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}