import { useState } from "react";
// import { Button, Textarea, Label, TextInput } from "flowbite-react";
import { Button, Form } from "react-bootstrap";

const UploadBook = () => {
  const bookCategories = [
    "Science",
    "Fiction",
    "History",
    "Literature",
    "Art",
    "Classic",
    "Fantasy",
    "Technology",
    "Adventure",
    "Travel",
    "Novel",
    "Religion",
    "Mystery",
    "Crime",
    "Children",
  ];

  const [selectedCategory, setSelectedCategory] = useState(bookCategories[0]);

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (
      !form.bookTitle.value ||
      !form.authorName.value ||
      !form.imageURL.value ||
      !form.price.value ||
      !form.bookPdfUrl.value
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const bookObj = {
      bookTitle: form.bookTitle.value,
      authorName: form.authorName.value,
      imageURL: form.imageURL.value,
      category: form.category.value,
      bookDescription: form.bookDescription.value,
      price: form.price.value,
      bookPdfUrl: form.bookPdfUrl.value,
    };

    console.log(bookObj);

    fetch("/api/v1/upload-books", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Book Uploaded Successfully");
        form.reset();
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  return (
    <div className="px-4 my-36 w-full max-w-2xl">
      <h2 className="mb-8 text-3xl font-bold">Upload Sách</h2>
      <Form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <Form.Group controlId="bookTitle">
                  <Form.Label>Tên sách</Form.Label>
                  <Form.Control
                    type="text"
                    id="bookTitle"
                    name="bookTitle"
                    required
                    placeholder="Nhập tên sách"
                  />
                </Form.Group>
              </div>

              <div className="sm:col-span-4">
                <Form.Group controlId="authorName">
                  <Form.Label>Tác giả</Form.Label>
                  <Form.Control
                    type="text"
                    id="authorName"
                    name="authorName"
                    required
                    placeholder="Tên tác giả"
                  />
                </Form.Group>
              </div>

              <div className="sm:col-span-3">
                <Form.Group controlId="imageURL">
                  <Form.Label>Hình ảnh minh họa</Form.Label>
                  <Form.Control
                    type="text"
                    id="imageURL"
                    name="imageURL"
                    required
                    placeholder="Link hình ảnh"
                  />
                </Form.Group>
              </div>

              <div className="sm:col-span-3">
                <Form.Group controlId="inputState">
                  <Form.Label>Thể loại</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    {bookCategories.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>

              <div className="col-span-full">
                <Form.Group controlId="bookDescription">
                  <Form.Label>Tóm tắt nội dung</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    required
                    placeholder="Nội dung"
                  />
                </Form.Group>
              </div>

              <div className="sm:col-span-3">
                <Form.Group controlId="price">
                  <Form.Label>Giá bán</Form.Label>
                  <Form.Control
                    type="text"
                    id="price"
                    name="price"
                    required
                    placeholder="Giá"
                  />
                </Form.Group>
              </div>

              <div className="sm:col-span-3">
                <Form.Group controlId="bookPdfUrl">
                  <Form.Label>Link PDF sách</Form.Label>
                  <Form.Control
                    type="url"
                    id="bookPdfUrl"
                    name="bookPdfUrl"
                    required
                    placeholder="Link PDF"
                  />
                </Form.Group>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              variant="outline-danger"
              style={{ width: "100px", borderRadius: "10px" }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="outline-info"
              style={{ width: "100px", borderRadius: "10px" }}
            >
              Lưu
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UploadBook;
