import React, { Component } from 'react';
import PropTypes from 'prop-types'

import ShelfChanger from './ShelfChanger'


class Book extends Component {

  render () {
    const book = this.props.book;
    const imageLinks = book.imageLinks || {};
    const onShiftShelf = this.props.onShiftShelf;

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:'url(' + imageLinks.thumbnail + ')'}}></div>
            { 
              <ShelfChanger book={book} onShiftShelf={onShiftShelf} /> 
            }
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onShiftShelf: PropTypes.func.isRequired
}
export default Book;