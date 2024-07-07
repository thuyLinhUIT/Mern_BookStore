import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Cart = () => {
  const { bookTitle, authorName, imageURL, bookDescription, price } =
    useLoaderData();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleOrderBooks = () => {
    navigate("/BuyYourBook/checkoutpage");
  };

  const updateCartItemQuantity = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  return (
    <div className="mt-40 px-40 lg:px-40">
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden mb-8"
        >
          <div className="md:w-1/2 overflow-hidden">
            <img
              src={item.imageURL}
              alt={item.bookTitle}
              className="h-40 w-60 object-cover rounded-md mx-auto"
            />
          </div>
          <div className="md:w-1/2 md:ml-8 mt-4 md:mt-0 p-6">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Tên sách: {item.bookTitle}
            </h1>

            <p className="text-gray-700 text-xl leading-relaxed italic">
              Tác giả: {item.authorName}
            </p>

            <div className="flex items-center mb-4 mt-4">
              <span className="text-xl font-semibold text-gray-700 italic">
                Giá:{" "}
                {item.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
                VND
              </span>
            </div>
            <div className="flex items-center font-bold mb-4">
              <button
                className="bg-blue-500 text-white px-3 py-1 text-xl"
                onClick={() => updateCartItemQuantity(index, item.quantity - 1)}
              >
                -
              </button>
              <p className="text-xl mx-3">{item.quantity}</p>
              <button
                className="bg-blue-500 text-xl font-bold text-white px-3 py-1"
                onClick={() => updateCartItemQuantity(index, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <div>
              <span className="text-2xl font-semibold text-red-500 ">
                Tổng tiền:{" "}
                {(item.price * item.quantity).toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={handleOrderBooks}
        className="right-4 mt-8 mb-8 bg-blue-700 text-white rounded-md text-l hover:bg-teal-500 px-10 py-3"
      >
        Mua ngay
      </button>
    </div>
  );
};

export default Cart;
