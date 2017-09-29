import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BookShelf from './BookShelf';

const BooksList = ({ books, handleBookShelfChange }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          books={books.filter(book => book.shelf === 'currentlyReading')}
          title="Currently Reading"
          handleBookShelfChange={handleBookShelfChange}
        />
        <BookShelf
          books={books.filter(book => book.shelf === 'wantToRead')}
          title="Want to Read"
          handleBookShelfChange={handleBookShelfChange}
        />
        <BookShelf
          books={books.filter(book => book.shelf === 'read')}
          title="Read"
          handleBookShelfChange={handleBookShelfChange}
        />
      </div>
      <div className="open-search">
        <Link to="/search">Search book</Link>
      </div>
    </div>
  );
};

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  handleBookShelfChange: PropTypes.func.isRequired,
};

export default BooksList;
