import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import Navbar from "../components/NavBar";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Shopping = () => {
  const [books, setBooks] = useState([]);
  const [cartState, setCartState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartState(JSON.parse(storedCart));
    }

    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/v1/all-books", {
          method: "GET",
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Server Response:", data);
        setBooks(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBuyNow = (book, quantity = 1) => {
    console.log("Adding to Cart:", book);
    const existingItemIndex = cartState.findIndex(
      (item) => item._id === book._id
    );

    if (existingItemIndex !== -1) {
      setCartState((prevCart) => {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
    } else {
      setCartState((prevCart) => {
        const updatedCart = [...prevCart, { ...book, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });

      const totalQuantity =
        cartState.reduce((total, item) => total + item.quantity, 0) + 1;
      localStorage.setItem("cartQuantity", totalQuantity.toString());
    }
  };
  const formattedPrice = (price) => {
    if (price !== undefined && price !== null) {
      return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
    return "";
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          <Navbar cartState={cartState} />
          <div className="mt-28 px-8 lg:px-24">
            <h2 className="text-5xl font-bold text-center">
              Tất cả sách ở đây
            </h2>
            <div className="grid gap-4 my-14 lg:grid-cols-6 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
              {books.map((book) => (
                <Card key={book._id}>
                  <Link to={`/orderbook/${book._id}`}>
                    <div className="relative">
                      <img
                        src={book.imageURL}
                        alt=""
                        className="object-cover w-full h-48"
                      />
                      <div className="absolute top-3 right-3 bg-blue-600 hover:bg-black p-3 rounded">
                        <FaCartShopping className="w-4 h-4 text-white" />
                        <span className="text-white font-bold text-l absolute -top-1 -right-0">
                          {(
                            cartState?.find((item) => item._id === book._id) ||
                            {}
                          ).quantity || 0}
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 h-14 overflow-hidden">
                      <p className="font-normal text-xl overflow-hidden text-red-700 dark:text-gray-400">
                        Giá: {formattedPrice(book.price)} VND
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleBuyNow(book)}
                    className="bg-blue-700 font-semibold hover:bg-teal-500 text-white py-2 rounded"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shopping;
