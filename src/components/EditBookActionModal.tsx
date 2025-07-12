import React from 'react';
import type { Book } from '../types.ts';

interface EditBookActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onToggleReadStatus: (bookId: string) => void;
  onDeleteBook: (bookId: string) => void;
}

const EditBookActionsModal: React.FC<EditBookActionsModalProps> = ({
  isOpen,
  onClose,
  book,
  onToggleReadStatus,
  onDeleteBook,
}) => {
  if (!isOpen || !book) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`} id="edit-modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="edit-modal-title" onClick={(e) => e.stopPropagation()}>
        <h2 id="edit-modal-title">Edit Book</h2>
        <div className="modal-content">
          <p id="edit-book-info">
            "{book.title}" by {book.author} ({book.year}) — {book.pages} pages. Status: {book.completed ? 'Read' : 'Unread'}
          </p>
          <div className="modal-buttons">
            <button id="toggle-read-status" className="neumorphic" onClick={() => onToggleReadStatus(book.id)}>
              Mark as {book.completed ? 'Unread' : 'Read'}
            </button>
            <button id="delete-book" className="neumorphic delete-btn" onClick={() => onDeleteBook(book.id)}>
              Delete Book
            </button>
            <button id="close-edit-modal" className="neumorphic cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBookActionsModal;