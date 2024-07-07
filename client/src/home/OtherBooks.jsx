import { useEffect, useState } from "react";
import BookCards from "../components/BookCards";

const OtherBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/v1/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(4, 10)));
  }, []);
  return (
    <div>
      <BookCards books={books} headline="Những đầu sách khác" />
    </div>
  );
};

export default OtherBooks;
