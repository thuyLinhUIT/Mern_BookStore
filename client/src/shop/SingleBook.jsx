// import React from "react";
import { useLoaderData } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { Input, initMDB } from "mdb-ui-kit";
import Service from "../routers/service.jsx";

initMDB({ Input });

const SingleBook = () => {
  const {
    bookTitle,
    imageURL,
    category,
    authorName,
    bookDescription,
    price,
    _id,
  } = useLoaderData();

  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");

  const [reviews, setReviews] = useState([]);

  const updateQuantity = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const handleQuantityChange = (change) => {
    updateQuantity(quantity + change);
  };
  const totalPrice = price * quantity;

  const fetchReviews = async () => {
    try {
      const response = await Service.getReviewsById(_id);
      console.log("Response from getReviewsById:", response);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [reviews]);

  const handleReviewSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");

      // Kiểm tra xem người dùng đã có review cho sách này chưa
      const existingReview = reviews.find((review) => review.userId === userId);

      if (existingReview) {
        // Nếu đã có, thực hiện yêu cầu cập nhật thay vì đăng mới
        await Service.updateReview(existingReview._id, { text: reviewText });
        // Cập nhật lại danh sách reviews sau khi cập nhật thành công
        fetchReviews();
      } else {
        // Nếu chưa có, thực hiện yêu cầu đăng mới
        const data = {
          bookId: _id,
          userId,
          text: reviewText,
        };

        if (reviewText === "") {
          alert("Please enter your review");
          return;
        }
        await Service.createReview(data);
      }
      // Sau mỗi trường hợp (đăng mới hoặc cập nhật), làm mới danh sách reviews
      fetchReviews();

      // Reset reviewText sau khi đăng hoặc cập nhật
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  //

  const handleEditReview = async (reviewId) => {
    try {
      // Lấy danh sách reviews từ server
      const response = await Service.getReviewsById(_id);
      const reviewsFromServer = response.data;

      // Tìm review cần cập nhật dựa trên reviewId
      const reviewToEdit = reviewsFromServer.find(
        (review) => review._id === reviewId
      );

      //Gán giá trị mới cho reviewText trước khi cập nhật
      // setReviewText(reviewToEdit.text);

      // Gửi yêu cầu cập nhật với giá trị mới của reviewText
      await Service.updateReview(reviewId, { text: reviewToEdit.text });

      // Cập nhật lại danh sách reviews
      const updatedReviews = reviews.map((review) =>
        review._id === reviewId
          ? { ...review, text: reviewToEdit.text }
          : review
      );
      setReviews(updatedReviews);

      // Reset reviewText sau khi cập nhật
      setReviewText(reviewToEdit.text);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      console.log("Review ID:", reviewId);
      await Service.deleteReview(reviewId);

      const updatedReviews = reviews.filter(
        (review) => review._id !== reviewId
      );
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error deleting review:", error);
      console.error("Server response:", error.response);
    }
  };

  return (
    <div
      className="bg-white mt-10 ml-10 lg:flex lg:space-x-8"
      style={{ margin: "150px" }}
    >
      {/* Image */}
      <div
        className="card"
        style={{
          border: "none",
          height: "800px",
          width: "450px",
          marginRight: "50px",
        }}
      >
        <div className="row g-0">
          <div className="">
            <img
              src={imageURL}
              alt=""
              className="object-cover object-center rounded-lg book-image "
              style={{ minHeight: "800px", minWidth: "450px" }}
            />
          </div>
        </div>
      </div>

      {/* Title & Author*/}
      <div className="flex-1">
        <div className="max-w-2xl px-0 pb-16 pt-10 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {bookTitle}
          </h1>
          <p
            className="text-3xl tracking-tight text-gray-900 "
            style={{ fontSize: "100%" }}
          >
            {authorName}
          </p>
        </div>

        {/* Description */}
        <div className="py-10">
          <div>
            <h2 className="text-sm font-medium text-gray-900 mb-4">
              Tóm tắt nội dung
            </h2>
            <div className="space-y-6">
              <p className="text-base text-gray-900">{bookDescription}</p>
            </div>
          </div>

          {/* Category */}
          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Thể loại</h2>
            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-0 text-sm">
                {category}
              </ul>
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-10">
            <label className="text-sm font-medium text-gray-900">
              Số lượng
            </label>
            <div className="mt-2 flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="text-teal-500 hover:text-teal-700 focus:outline-none focus:ring focus:border-teal-300 rounded-md px-3 py-1 mr-1"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                onChange={(e) =>
                  updateQuantity(parseInt(e.target.value, 10) || 1)
                }
                className="w-12 border border-teal-500 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring focus:border-teal-300"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="text-teal-500 hover:text-teal-700 focus:outline-none focus:ring focus:border-teal-300 rounded-md px-3 py-1 ml-1"
              >
                +
              </button>
            </div>
          </div>

          {/*Price */}
          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Tổng tiền</h2>
            <div className="mt-4">
              <span className="text-sm">{totalPrice} VND</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-10 flex w-1/3 items-center justify-center rounded-md border border-transparent bg-teal-500 px-3 py-3 text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Thêm vào giỏ hàng
            <MDBIcon fas icon="shopping-cart" className="ml-2" />
          </button>
        </div>

        <div className="card">
          <h5 className="card-header">Review</h5>
          <div className="card-body">
            <div className="form-outline" data-mdb-input-init>
              <textarea
                className="form-control"
                id="textAreaExample"
                rows="4"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={handleReviewSubmit}
              className="btn btn-primary mr-5 mt-2"
              data-mdb-ripple-init
            >
              Đăng
            </button>
          </div>
        </div>

        {/* Reviews Table */}
        <table className="table mt-10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nội dung review</th>
              <th>Sửa-Xóa</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.text}</td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleEditReview(review._id)}
                  >
                    Cập nhật
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteReview(review._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SingleBook;
