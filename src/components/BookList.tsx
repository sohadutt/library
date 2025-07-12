import React from 'react';
import type { Book } from '../types.ts';

interface BookListProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onSelectBook }) => {
  return (
    <div className="book-list">
      {books.map(book => (
        <div className="book" data-id={book.id} key={book.id}>
          <div className="list-r">
            <div className="rating">{book.rating.toFixed(1)}</div>
            <div className="book-details">
              <span className="book-title">{book.title}</span>
              <span className="book-author">{book.author}</span>
            </div>
            <div className="hidden-book-details">
              <span className="year">{book.year}</span>
              <span className="pages">{book.pages}</span>
            </div>
          </div>
          <input
            type="checkbox"
            className="book-checkbox"
            onChange={() => onSelectBook(book)}
          />
        </div>
      ))}
    </div>
  );
};

export default BookList;