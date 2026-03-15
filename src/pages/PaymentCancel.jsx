import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { orderApi } from "../api/orderApi";

export default function PaymentCancel() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Đang kiểm tra trạng thái đơn hàng...");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get("orderCode");
    if (!orderId) {
      setStatus("Order ID không hợp lệ");
      return;
    }

    const checkPayment = async () => {
      try {
        const res = await orderApi.checkPayment(orderId);
        console.log("Payment check response:", res);

        if (res.data.status === "PAID") {
          setStatus("Thanh toán đã hoàn tất! Đang chuyển tới đơn hàng...");
          setTimeout(() => navigate("/order"), 3000);
        } else {
          setStatus("❌ Thanh toán đã bị huỷ hoặc chưa hoàn tất.");
        }
      } catch (err) {
        console.error(err);
        setStatus("Có lỗi xảy ra khi kiểm tra đơn hàng.");
      }
    };

    checkPayment();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{status}</h2>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => navigate("/checkout")}
          style={{ marginRight: 10 }}
        >
          Quay lại thanh toán
        </button>

        <button onClick={() => navigate("/order")}>
          Xem đơn hàng
        </button>
      </div>
    </div>
  );
}