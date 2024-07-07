import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [error, setError] = useState("");
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  const calculateOrderTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const handleConfirmOrder = () => {
    const validationError = validateShippingDetails();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    setTimeout(() => {
      localStorage.removeItem("cart");

      window.alert("Thanh toán thành công!");

      navigate("/BuyYourBook/Shopping");
    }, 1000);
  };

  const validateShippingDetails = () => {
    if (shippingDetails.name.trim() === "") {
      return "Nhập tên.";
    }
    if (shippingDetails.address.trim() === "") {
      return "Nhập địa chỉ.";
    }
    if (shippingDetails.phoneNumber.trim() === "") {
      return "Nhập số điện thoại.";
    }
    if (shippingDetails.email.trim() === "") {
      return "Nhập email.";
    }
    return null;
  };

  return (
    <div className="mt-20 p-8 flex">
      <div className="w-1/2 pr-8">
        <h2 className="text-4xl font-bold mb-8">Tổng đơn hàng</h2>
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center mb-4">
            <img
              src={item.imageURL}
              alt={item.bookTitle}
              className="h-24 w-24 object-cover rounded-md mr-4"
            />
            <div>
              <p className="text-gray-700 font-semibold text-xl">
                {item.bookTitle}
              </p>
              <p className="text-gray-500 text-lg">Số lượng: {item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="mt-4 border-t pt-4 text-red-500">
          <p className="text-2xl font-bold">
            Tổng tiền: {calculateOrderTotal().toFixed(2)} VND
          </p>
        </div>
      </div>

      <div className="w-1/2">
        <h2 className="text-4xl font-bold mb-8">Thanh toán cho đơn hàng</h2>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Thông tin giao hàng</h3>
          <div className="mb-4 flex flex-col">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-lg font-bold text-gray-700 mb-1"
              >
                Tên
              </label>
              <input
                type="text"
                id="name"
                value={shippingDetails.name}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    name: e.target.value,
                  })
                }
                className="p-3 border w-full"
                placeholder="Nhập tên"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-lg font-bold text-gray-700 mb-1"
              >
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                value={shippingDetails.address}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    address: e.target.value,
                  })
                }
                className="p-3 border w-full"
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-lg font-bold text-gray-700 mb-1"
              >
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={shippingDetails.phoneNumber}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    phoneNumber: e.target.value,
                  })
                }
                className="p-3 border w-full"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-bold text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={shippingDetails.email}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    email: e.target.value,
                  })
                }
                className="p-3 border w-full"
                placeholder="Nhập email"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Payment Method</h3>
          {["creditCard", "paypal", "cashOnDelivery"].map((method) => (
            <label key={method} className="block mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />{" "}
              {method === "creditCard"
                ? "Thẻ tín dụng ngân hàng"
                : method === "paypal"
                ? "PayPal"
                : "Thanh toán khi nhận hàng"}
            </label>
          ))}
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {isOrderSuccessful ? (
          <p className="text-green-500 mb-4">Thanh toán thành công</p>
        ) : (
          <button
            onClick={handleConfirmOrder}
            className="bg-blue-700 text-white rounded-md text-xl hover:bg-teal-500 px-7 py-2 mb-10"
          >
            Thanh toán
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
