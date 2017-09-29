import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


const BookShelf = ({books, title, handleBookShelfChange}) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map(book => (
              <Book key={book.id} book={book} handleBookShelfChange={handleBookShelfChange} />
            ))
          }
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  handleBookShelfChange: PropTypes.func.isRequired
}

export default BookShelf;