import { useEffect, useState } from "react";
import BookCards from "../components/BookCards";

const BestSellerBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/v1/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(0, 8)));
  }, []);
  return (
    <div>
      <BookCards books={books} headline="Những đầu sách bán chạy nhất" />
    </div>
  );
};

export default BestSellerBooks;
