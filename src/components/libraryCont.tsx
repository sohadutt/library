import React, { createContext, useContext, useState } from "react";
import type { Book } from "../types";

type LibraryContextType = {
  myLibrary: Book[];
  setMyLibrary: React.Dispatch<React.SetStateAction<Book[]>>;
};

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [myLibrary, setMyLibrary] = useState<Book[]>([]);

  return (
    <LibraryContext.Provider value={{ myLibrary, setMyLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
};
