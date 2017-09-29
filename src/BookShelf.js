import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


class BookShelf extends Component {

	render () {
    const title = this.props.title
    const books = this.props.books

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map(book => (
                <Book key={book.id} book={book} onShiftShelf={this.props.onShiftShelf} />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
}

export default BookShelf;