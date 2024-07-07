import { useState, useEffect } from "react";
// import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useAuth } from "../contacts/AuthProvider";

const ManageBook = () => {
  const { isLoggedIn, user } = useAuth();
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`/api/v1/user-books/${user.id}`)
        .then((res) => res.json())
        .then((data) => setUserBooks(data));
    }
  }, [isLoggedIn, user.id]);

  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch("/api/v1/all-books")
      .then((res) => res.json())
      .then((data) => setAllBooks(data));
  }, []);

  const handleDelete = async (id) => {
    const userConfirm = window.confirm("Bạn có chắc chắn muốn xóa?");

    if (userConfirm) {
      console.log(id);
      fetch(`/api/v1/delete-book/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Sách đã được xóa thành công");
          // Cập nhật state sau khi API xóa đã hoàn tất
          setAllBooks(data);

          // Lọc và cập nhật lại state
          const updatedBooks = allBooks.filter((book) => book._id !== id);
          setAllBooks(updatedBooks);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="px-4 my-12 mt-36">
      <h2 className="mb-8 text-3xl font-bold">Quản lý thông tin sách</h2>
      <Table striped bordered hover>
        <thead style={{ backgroundColor: "black", color: "white" }}>
          <tr>
            <th scope="col" className="text-center">
              STT
            </th>
            <th scope="col" className="text-center">
              Tên sách
            </th>
            <th scope="col" className="text-center">
              Tên tác giả
            </th>
            <th scope="col" className="text-center">
              Thể loại
            </th>
            <th scope="col" className="text-center">
              Giá
            </th>
            <th scope="col" className="text-center">
              Hoạt động
            </th>
          </tr>
        </thead>
        <tbody>
          {allBooks.map((book, index) => (
            <tr key={book._id} className="border-t">
              <th scope="row" className="px-4 py-2 text-center">
                {index + 1}
              </th>
              <td className="px-4 py-2 break-all max-w-[200px] text-center">
                <div className="max-w-[200px]">{book.bookTitle}</div>
              </td>
              <td className="px-4 py-2 text-center">{book.authorName}</td>
              <td className="px-4 py-2 text-center">{book.category}</td>
              <td className="px-4 py-2 text-center">{book.price}</td>
              <td className="px-4 py-2 text-center">
                <Link
                  to={`/admin/dashboard/edit-book/${book._id}`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                >
                  Chỉnh sửa
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageBook;
