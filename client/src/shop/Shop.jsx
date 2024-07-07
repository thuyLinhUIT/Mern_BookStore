import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Ripple, initMDB } from "mdb-ui-kit";
import { Pagination } from "react-bootstrap";

initMDB({ Input, Ripple });

const Shop = () => {
  const [books, setBooks] = useState([]);

  const categories = [
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

  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchMode, setCurrentSearchMode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    retrieveBooks();
  }, [currentPage, currentSearchMode]);

  const booksPerPage = 12;

  const onPageChange = (page) => {
    setCurrentPage(page);
    navigate(`/shop?page=${page}`, { replace: true });
  };
  const handleSearchByTitle = () => {
    setCurrentPage(1);
    setCurrentSearchMode("findByTitle");
    findByTitle(searchTitle);
  };

  const handleSearchByCategory = () => {
    setCurrentPage(1);
    setCurrentSearchMode("findByCategory");
    findByCategories([searchCategory]);
  };

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const onChangeSearchCategory = (e) => {
    setSearchCategory(e.target.value);
  };

  const findByCategories = async (categories) => {
    try {
      const response = await fetch("/api/v1/books-by-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categories }),
      });

      if (!response.ok) {
        throw new Error("Can't find anything");
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books by category:", error);
    }
  };

  const findByTitle = async (title) => {
    console.log("Title:", title);
    try {
      const response = await fetch(`/api/v1/books-by-title/${title}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Can't find anything");
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books by title:", error);
    }
  };

  const retrieveBooks = () => {
    if (currentSearchMode === "findByCategory") {
      findByCategories([searchCategory]);
    } else if (currentSearchMode === "findByTitle") {
      findByTitle(searchTitle);
    } else {
      const apiUrl = `/api/v1/all-books?page=${currentPage}&title=${searchTitle}&category=${searchCategory}&searchMode=${currentSearchMode}`;

      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);
        })
        .finally(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
  };

  const startIndex = (currentPage - 1) * booksPerPage;
  const visibleBooks = books.slice(startIndex, startIndex + booksPerPage);

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-5xl font-bold text-center">Danh mục sách</h2>
      <div className="row mb-3">
        {/* tìm theo tên sách */}
        <div className="col-md-6"></div>

        <div className="input-group">
          <div className="form-outline" data-mdb-input-init>
            <input
              type="text"
              id="form1"
              className="form-control"
              value={searchTitle}
              onChange={onChangeSearchTitle}
              placeholder="Tìm theo tên sách"
            />
          </div>
          <button
            onClick={handleSearchByTitle}
            type="button"
            className="btn btn-primary ml-1"
            data-mdb-ripple-init
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      {/* tìm theo danh mục */}
      <div className="col-md-6">
        <div className="input-group">
          <div className="form-outline" data-mdb-input-init>
            <select
              value={searchCategory}
              onChange={onChangeSearchCategory}
              className="form-control ml-1 p-2 border border-gray-300"
            >
              <option value="">Tất cả</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSearchByCategory}
            type="button"
            className="btn btn-primary ml-2"
            data-mdb-ripple-init
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className="grid gap-2 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {visibleBooks.map((book) => (
          <Link key={book._id} to={{ pathname: `/book/${book._id}` }}>
            <Card
              key={book._id}
              className="max-w-xs auto text-center"
              style={{ height: "650px" }}
            >
              <img src={book.imageURL} alt="" className="h-96" />
              <h5
                className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white book-card"
                style={{ textDecoration: "none" }}
              >
                <p>{book.bookTitle}</p>
              </h5>
              <p
                className="font-normal text-gray-700 dark:text-gray-400 description book-card px-1"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {book.bookDescription}
              </p>

              <button
                className="bg-blue-700 hover:bg-blue-600 font-semibold text-white py-2 rounded transition-colors duration-300 book-card"
                style={{ textDecoration: "none" }}
              >
                Xem
              </button>
            </Card>
          </Link>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {[...Array(Math.ceil(books.length / booksPerPage)).keys()].map(
            (page) => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => onPageChange(page + 1)}
              >
                {page + 1}
                <span
                  className="visually-hidden"
                  style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    margin: "-1px",
                    padding: "0",
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    border: "0",
                  }}
                >
                  (current)
                </span>
              </Pagination.Item>
            )
          )}

          <Pagination.Next
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(books.length / booksPerPage)}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default Shop;
