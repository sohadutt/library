import React, { useState } from "react";
import type { Book } from '../types';
import { useLibrary } from '../components/libraryCont';


type BookSearchProps = {
  setSearchResult: React.Dispatch<React.SetStateAction<Book[] | null>>;
};

const BookSearch: React.FC<BookSearchProps> = ({ setSearchResult }) => {
  const { myLibrary } = useLibrary();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setQuery(input);

    if (input.trim() === "") {
      setSearchResult(null);
      return;
    }

    const filtered = myLibrary.filter((book: Book) =>
      book.title.toLowerCase().includes(input) ||
      book.author.toLowerCase().includes(input) ||
      book.year.toString().includes(input)
    );

    setSearchResult(filtered);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={handleSearch}
        className="border p-2 w-full mb-4"
      />
    </div>
  );
};

export default BookSearch;
