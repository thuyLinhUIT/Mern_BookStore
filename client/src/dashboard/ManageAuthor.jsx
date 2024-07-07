import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const ManageAuthor = () => {
  const [allAuthors, setAllAuthors] = useState([]);

  useEffect(() => {
    fetch("/api/v1/all-authors")
      .then((res) => res.json())
      .then((data) => setAllAuthors(data));
  }, []);

  const handleDelete = async (id) => {
    const userConfirm = window.confirm("Bạn có chắc chắn muốn xóa?");

    if (userConfirm) {
      console.log(id);
      fetch(`/api/v1/delete-author/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Sách đã được xóa thành công");
          // Cập nhật state sau khi API xóa đã hoàn tất
          setAllAuthors(data);

          // Lọc và cập nhật lại state
          const updatedBooks = allAuthors.filter((author) => author._id !== id);
          setAllAuthors(updatedBooks);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="px-4 my-36">
      <h2 className="mb-8 text-3xl font-bold">Quản lý thông tin tác giả</h2>
      <Table striped bordered hover>
        <thead style={{ backgroundColor: "black", color: "white" }}>
          <tr>
            <th scope="col" className="text-center">
              STT
            </th>
            <th scope="col" className="text-center">
              Tên tác giả
            </th>
            <th scope="col" className="text-center">
              Hoạt động
            </th>
          </tr>
        </thead>
        <tbody>
          {allAuthors.map((author, index) => (
            <tr key={author._id} className="border-t">
              <th scope="row" className="px-4 py-2 text-center">
                {index + 1}
              </th>
              <td className="px-4 py-2 break-all max-w-[200px] text-center">
                <div className="max-w-[200px]">{author.authorName}</div>
              </td>
              <td className="px-4 py-2 text-center">
                <Link
                  to={`/admin/dashboard/edit-author/${author._id}`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                >
                  Chỉnh sửa
                </Link>
                <button
                  onClick={() => handleDelete(author._id)}
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

export default ManageAuthor;
