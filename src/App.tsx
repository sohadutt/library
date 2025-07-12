import React, { useState, useEffect, useCallback } from 'react';
import type { Book } from './types';
import { useDarkMode } from './helper/useDarkMode';
import BookList from './components/BookList';
import BookFormModal from './components/BookFormModal';
import EditBookActionsModal from './components/EditBookActionModal';
import initialBooks from './data/books.json'; 
import CollapsingSearchBar from './components/SearchBar';
import { useLibrary } from './components/libraryCont';
import "tailwindcss";

const App: React.FC = () => {
  const { myLibrary, setMyLibrary } = useLibrary();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditActionsModalOpen, setIsEditActionsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedBookForActions, setSelectedBookForActions] = useState<Book | null>(null);
  const [, toggleDarkMode] = useDarkMode(); 

  const unreadBooks = myLibrary.filter(book => !book.completed);
  const readBooks = myLibrary.filter(book => book.completed);

  const handleAddBook = (book: Book, isEdit: boolean) => {
    if (isEdit) {
      setMyLibrary(prevLibrary =>
        prevLibrary.map(b => (b.id === book.id ? book : b))
      );
    } else {
      setMyLibrary(prevLibrary => [...prevLibrary, book]);
    }
  };

  const loadBooksFromJson = useCallback(() => {
    setMyLibrary(initialBooks);
    if (myLibrary.length === initialBooks.length) {
      setMyLibrary([]);
    }
  }, [myLibrary.length])

  const clearBooks = useCallback(() => {
      setMyLibrary([]);
  }, [myLibrary.length]);

  const handleclear = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'c') {
    e.preventDefault();
    clearBooks();
  }
};


useEffect(() => {
  document.addEventListener('keydown', handleclear);
  return () => document.removeEventListener('keydown', handleclear);
}, [clearBooks]);

const handleLoadBook = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'g') {
    e.preventDefault();
    loadBooksFromJson();
  }
};

useEffect(() => {
  document.addEventListener('keydown', handleLoadBook);
  return () => document.removeEventListener('keydown', handleLoadBook);
}, [loadBooksFromJson]);

  const handleSelectBookForActions = (book: Book) => {
    setSelectedBookForActions(book);
    setIsEditActionsModalOpen(true);
  };

  const handleToggleReadStatus = (bookId: string) => {
    setMyLibrary(prevLibrary =>
      prevLibrary.map(book =>
        book.id === bookId ? { ...book, completed: !book.completed } : book
      )
    );
    setIsEditActionsModalOpen(false);
    setSelectedBookForActions(null);
  };

  const handleDeleteBook = (bookId: string) => {
    setMyLibrary(prevLibrary => prevLibrary.filter(book => book.id !== bookId));
    setIsEditActionsModalOpen(false);
    setSelectedBookForActions(null);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFormModalOpen(false);
        setIsEditActionsModalOpen(false);
        setEditingBook(null);
        setSelectedBookForActions(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <button className="toggle-theme" id="toggle-theme" onClick={toggleDarkMode}>
        <span className="material-symbols-outlined">brightness_4</span>
      </button>
      <main>
        <div className="container">
          <div className="header">
            <h1 className="logo">Reading List</h1>
            <CollapsingSearchBar/>
            <div className="head-btn">
              <button className="add-book" onClick={() => { setIsFormModalOpen(true); setEditingBook(null); }}>
                Add Book
              </button>
              <button
                className="edit-book"
                onClick={() => {
                  if (selectedBookForActions) {
                    handleSelectBookForActions(selectedBookForActions);
                  } else {
                    alert('Please select a book to edit.');
                  }
                }}
              >
                Edit
              </button>
            </div>
          </div>
          <div className="Library">
            {unreadBooks.length > 0 && (
              <div className="unread">
                <div className="section-header">
                  <p>Want to read</p>
                </div>
                <BookList books={unreadBooks} onSelectBook={handleSelectBookForActions} />
              </div>
            )}

            {readBooks.length > 0 && (
              <div className="read">
                <div className="section-header">
                  <p>Already read</p>
                </div>
                <BookList books={readBooks} onSelectBook={handleSelectBookForActions} />
              </div>
            )}

            {unreadBooks.length === 0 && readBooks.length === 0 && (
              <p className="empty-library-message">Your library is empty. Add some books!</p>
            )}
          </div>
        </div>
      </main>

      <BookFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleAddBook}
        initialBook={editingBook}
      />

      <EditBookActionsModal
        isOpen={isEditActionsModalOpen}
        onClose={() => setIsEditActionsModalOpen(false)}
        book={selectedBookForActions}
        onToggleReadStatus={handleToggleReadStatus}
        onDeleteBook={handleDeleteBook}
      />
    </>
  );
};

export default App;