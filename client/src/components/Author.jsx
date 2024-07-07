// import React from 'react'
import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

const Author = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch("/api/v1/all-authors")
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-5xl font-bold text-center">Danh sách tác giả</h2>

      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 ">
        {authors.map((author) => (
          <Link key={author._id} to={`/author/${author._id}`}>
            <Card key={author._id} className="max-w-xs text-center">
              <img src={author.imageURL} alt="" className="h-96" />
              <h5
                className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white book-card"
                style={{ textDecoration: "none" }}
              >
                <p>{author.authorName}</p>
              </h5>
              <p
                className="font-normal text-gray-700 dark:text-gray-400 description book-card"
                style={{ textDecoration: "none" }}
              >
                {author.authorBio}
              </p>

              <button
                className="bg-blue-700 hover:bg-blue-600 font-semibold text-white py-2 rounded transition-colors duration-300 book-card"
                style={{ textDecoration: "none" }}
              >
                Xem thông tin
              </button>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Author;
