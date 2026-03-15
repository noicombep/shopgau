import { useEffect, useState } from "react";
import { orderApi } from "../api/orderApi";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderApi
      .getMyOrders()
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Đang tải đơn hàng...
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Bạn chưa có đơn hàng nào
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      <h1 className="text-3xl font-bold mb-8">Lịch sử đơn hàng</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
          >

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold text-lg">
                Đơn #{order.id}
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  order.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* INFO */}
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">

              <div>
                <p className="text-gray-500">Ngày đặt</p>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <div>
                <p className="text-gray-500">Thanh toán</p>
                <p>{order.statusFee}</p>
              </div>

              <div>
                <p className="text-gray-500">Địa chỉ</p>
                <p>{order.shippingAddress}</p>
              </div>

            </div>

            {/* ITEMS */}
            <div className="border-t pt-4 space-y-2">

              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm"
                >
                  <div className="font-medium">
                    {item.productName}
                  </div>

                  <div>x{item.quantity}</div>

                  <div className="font-semibold">
                    {item.price.toLocaleString()} đ
                  </div>
                </div>
              ))}

            </div>

            {/* TOTAL */}
            <div className="text-right mt-4 text-lg font-bold text-red-500">
              Tổng tiền: {order.totalAmount.toLocaleString()} đ
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}