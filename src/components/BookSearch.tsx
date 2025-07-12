import React, { useState } from "react";
import type { Book } from '../types';
import { useLibrary } from '../components/libraryCont';


const BookSearch: React.FC = () => {
    const { myLibrary, setMyLibrary } = useLibrary();
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState<Book[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setQuery(input);

    if (input.trim() === "") {
        setSearchResult([]);
        return;
    }

    const filtered = myLibrary.filter((book: Book) =>
        book.title.toLowerCase().includes(input) ||
        book.author.toLowerCase().includes(input)
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
            <ul className="space-y-2">
                {searchResult.map((book) => (
                    <li key={book.id} className="border p-2 rounded shadow">
                        <strong>{book.title}</strong> by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookSearch;
