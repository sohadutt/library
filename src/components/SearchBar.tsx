import { useState, useRef, useEffect } from "react";
import "./SearchBar.css"; // We'll write this next

function CollapsingSearchBar() {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  return (
    <div ref={wrapperRef} className={`search-bar ${expanded ? "expanded" : ""}`}>
      {!expanded && (
        <button className="search-button" onClick={() => setExpanded(true)}>
          🔍
        </button>
      )}
      {expanded && (
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
    </div>
  );
}

export default CollapsingSearchBar;
