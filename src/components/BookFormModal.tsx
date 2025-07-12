import React, { useState, useEffect } from 'react';
import type { Book } from '../types.ts';

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: Book, isEdit: boolean) => void;
  initialBook?: Book | null;
}

const BookFormModal: React.FC<BookFormModalProps> = ({ isOpen, onClose, onSubmit, initialBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [pages, setPages] = useState<number | ''>('');
  const [rating, setRating] = useState<number | ''>('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.title);
      setAuthor(initialBook.author);
      setYear(initialBook.year);
      setPages(initialBook.pages);
      setRating(initialBook.rating);
      setCompleted(initialBook.completed);
    } else {
      // Reset form when adding a new book
      setTitle('');
      setAuthor('');
      setYear('');
      setPages('');
      setRating('');
      setCompleted(false);
    }
  }, [initialBook, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author || typeof year !== 'number' || typeof pages !== 'number' || typeof rating !== 'number') {
      alert('Please fill in all fields correctly.');
      return;
    }

    const newBook: Book = {
      id: initialBook?.id || crypto.randomUUID(),
      title,
      author,
      year,
      pages,
      rating,
      completed,
    };
    onSubmit(newBook, !!initialBook);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`} id="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="add-modal-title" onClick={(e) => e.stopPropagation()}>
        <h2 id="add-modal-title">{initialBook ? 'Edit Book' : 'Add New Book'}</h2>
        <form id="book-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            id="author"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <input
            type="number"
            id="year"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10) || '')}
            required
          />
          <input
            type="number"
            id="pages"
            placeholder="Pages"
            value={pages}
            onChange={(e) => setPages(parseInt(e.target.value, 10) || '')}
            required
          />
          <input
            type="number"
            id="rating"
            placeholder="Rating (0–10)"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value) || '')}
            required
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Mark as Completed
          </label>
          <div className="modal-buttons">
            <button type="submit" className="confirm neumorphic">
              {initialBook ? 'Update Book' : 'Add Book'}
            </button>
            <button type="button" className="cancel neumorphic" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;