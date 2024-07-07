// import { useState } from "react";
// import { Button, Textarea, Label, TextInput } from "flowbite-react";
import { Button, Form } from "react-bootstrap";

const CreateAuthor = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    if (
      !form.authorName.value ||
      !form.imageURL.value ||
      !form.authorBio.value
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const authorObj = {
      authorName: form.authorName.value,
      imageURL: form.imageURL.value,
      authorBio: form.authorBio.value,
    };

    console.log(authorObj);

    fetch("/api/v1/create-author", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(authorObj),
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
      <h2 className="mb-8 text-3xl font-bold">Tạo thông tin tác giả</h2>
      <Form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <Form.Group controlId="authorName">
                  <Form.Label>Tên tác giả</Form.Label>
                  <Form.Control
                    type="text"
                    id="authorName"
                    name="authorName"
                    required
                    placeholder="Nhập tên tác giả"
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

              <div className="col-span-full">
                <Form.Group controlId="bookDescription">
                  <Form.Label>Thông tin tác giả</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    required
                    placeholder="Nội dung"
                  />
                </Form.Group>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6 ml-auto">
                <Button
                  type="submit"
                  variant="outline-info"
                  style={{ width: "100px", borderRadius: "10px" }}
                >
                  Lưu
                </Button>
                <Button
                  variant="outline-danger"
                  style={{ width: "100px", borderRadius: "10px" }}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateAuthor;
