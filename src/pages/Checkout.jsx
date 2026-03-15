import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { orderApi } from "../api/orderApi";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const navigate = useNavigate();

  const cartItems = useCartStore(state => state.cartItems);
  const fetchCart = useCartStore(state => state.fetchCart);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const clearCart = useCartStore(state => state.clearCart);

  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then(res => res.json())
      .then(data => setProvinces(data));
  }, []);

  useEffect(() => {
    if (!selectedProvince) return;

    fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
      .then(res => res.json())
      .then(data => setDistricts(data.districts));

  }, [selectedProvince]);

  useEffect(() => {

    if (!selectedDistrict) return;

    fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
      .then(res => res.json())
      .then(data => setWards(data.wards));

  }, [selectedDistrict]);


  const handleOrder = async () => {

    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;

    if (!selectedProvince || !selectedDistrict || !selectedWard || !detailAddress || !paymentMethod) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại không hợp lệ");
      return;
    }

    const provinceName = provinces.find(p => p.code == selectedProvince)?.name;
    const districtName = districts.find(d => d.code == selectedDistrict)?.name;
    const wardName = wards.find(w => w.code == selectedWard)?.name;

    const fullAddress = `${detailAddress}, ${wardName}, ${districtName}, ${provinceName}`;

    const orderPayload = {
      phone,
      shippingAddress: fullAddress,
      paymentMethod,
      totalPrice: getTotalPrice(),
      items: cartItems.map(item => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {

      const res = await orderApi.createOrder(orderPayload);

      if (res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
        return;
      }

      clearCart();
      navigate("/order");

    } catch (err) {
      console.error(err);
      alert("Đặt hàng thất bại");
    }

  };



  return (

    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Thanh toán đơn hàng
      </h1>

      {/* CART */}

      <div className="bg-white shadow-md rounded-xl p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Sản phẩm
        </h2>

        {cartItems.length === 0 ? (
          <p>Không có sản phẩm trong giỏ hàng</p>
        ) : (

          <div className="space-y-3">

            {cartItems.map(item => (

              <div
                key={item.productId}
                className="flex justify-between border-b pb-2"
              >

                <div>
                  {item.productName} x{item.quantity}
                </div>

                <div className="font-semibold">
                  {item.price.toLocaleString()} đ
                </div>

              </div>

            ))}

          </div>

        )}

        <div className="text-right mt-4 text-xl font-bold text-red-500">
          Tổng: {getTotalPrice().toLocaleString()} đ
        </div>

      </div>


      {/* ADDRESS */}

      <div className="bg-white shadow-md rounded-xl p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Địa chỉ giao hàng
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="block mb-1 text-sm font-medium">
              Tỉnh / Thành phố
            </label>

            <select
              className="w-full border rounded-lg p-2"
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setDistricts([]);
                setWards([]);
                setSelectedDistrict("");
                setSelectedWard("");
              }}
            >

              <option value="">Chọn tỉnh</option>

              {provinces.map(p => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}

            </select>

          </div>


          <div>

            <label className="block mb-1 text-sm font-medium">
              Quận / Huyện
            </label>

            <select
              className="w-full border rounded-lg p-2"
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setWards([]);
                setSelectedWard("");
              }}
              disabled={!districts.length}
            >

              <option value="">Chọn quận</option>

              {districts.map(d => (
                <option key={d.code} value={d.code}>
                  {d.name}
                </option>
              ))}

            </select>

          </div>


          <div>

            <label className="block mb-1 text-sm font-medium">
              Phường / Xã
            </label>

            <select
              className="w-full border rounded-lg p-2"
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              disabled={!wards.length}
            >

              <option value="">Chọn phường</option>

              {wards.map(w => (
                <option key={w.code} value={w.code}>
                  {w.name}
                </option>
              ))}

            </select>

          </div>


          <div>

            <label className="block mb-1 text-sm font-medium">
              Số điện thoại
            </label>

            <input
              className="w-full border rounded-lg p-2"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

          </div>


          <div className="md:col-span-2">

            <label className="block mb-1 text-sm font-medium">
              Địa chỉ chi tiết
            </label>

            <input
              className="w-full border rounded-lg p-2"
              placeholder="Số nhà, tên đường..."
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />

          </div>

        </div>

      </div>


      {/* PAYMENT */}

      <div className="bg-white shadow-md rounded-xl p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Phương thức thanh toán
        </h2>

        <div className="space-y-3">

          <label className="flex items-center gap-3">
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Thanh toán khi nhận hàng
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              value="BANKING"
              checked={paymentMethod === "BANKING"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Chuyển khoản ngân hàng
          </label>

        </div>

      </div>


      {/* BUTTON */}

      <button
        onClick={handleOrder}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-lg font-semibold transition"
      >
        Đặt hàng
      </button>

    </div>

  );

}