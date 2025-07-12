import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

function CollapsingSearchBar() {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`flex items-center gap-2 transition-all duration-300 ${
        expanded ? "bg-gray-100 px-3 py-1 rounded-full" : ""
      }`}
    >
      <button
        onClick={() => setExpanded(true)}
        className="p-2 text-gray-600 hover:text-black"
      >
        <Search size={20} />
      </button>
      {expanded && (
        <input
          type="text"
          className="outline-none bg-transparent w-40"
          placeholder="Search books..."
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
    </div>
  );
}

export default CollapsingSearchBar;
