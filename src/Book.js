import React from 'react';
import PropTypes from 'prop-types';

import ShelfChanger from './ShelfChanger';

const Book = ({ book, handleBookShelfChange }) => {
  const imageLinks = book.imageLinks || {};

  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: 'url(' + imageLinks.thumbnail + ')',
            }}
          />
          {
            <ShelfChanger
              book={book}
              handleBookShelfChange={handleBookShelfChange}
            />
          }
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  handleBookShelfChange: PropTypes.func.isRequired,
};
export default Book;
