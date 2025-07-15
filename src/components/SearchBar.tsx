import { useState, useRef, useEffect } from "react";
import { useLibrary } from "../components/libraryCont";
import type { Book } from "../types";
import "./SearchBar.css";

type CollapsingSearchBarProps = {
  setSearchResult: React.Dispatch<React.SetStateAction<Book[] | null>>;
};

function CollapsingSearchBar({ setSearchResult }: CollapsingSearchBarProps) {
  const { myLibrary } = useLibrary();
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
        setSearchTerm("");
        setSearchResult(null); 
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSearchResult]);

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target.value.toLowerCase().trim();
  setSearchTerm(input);

  if (input === "") {
    setSearchResult(null);
    return;
  }

  const terms = input.split(" ");

  const filtered = myLibrary.filter((book: Book) =>
    terms.every((term) =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.year.toString().includes(term)
    )
  );

  setSearchResult(filtered);
};

  
  return (
    
    <div ref={wrapperRef} className={`search-bar ${expanded ? "expanded" : ""}`}>
      {!expanded && (
        <button className="search-button" onClick={() => setExpanded(true)}>
          <span className="material-symbols-outlined">search</span>
        </button>
      )}
      {expanded && (
        <input
           ref={inputRef}
           type="search"
           className="search-input"
           placeholder="Search books..."
           value={searchTerm}
              onChange={handleSearch}
        />
      )}
    </div>
  );
}

export default CollapsingSearchBar;