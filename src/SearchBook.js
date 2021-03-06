import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';

import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBook extends Component {
  state = {
    searchResults: [],
    query: '',
  };

  onBookSearch(query) {
    this.setState({ query: query });
    if (query) {
      BooksAPI.search(query, 25).then(resp => {
        // In case of error, show default search page
        if (resp.error) {
          console.log(
            'The search is limited to a particular set of search terms'
          );
          this.setState({ searchResults: [] });
        } else {
          this.setState({ searchResults: resp });
        }
      });
    }
  }

  // Need this to show the state of book on shelf.
  UpdateShelf(booksOnShelf, book) {
    if (booksOnShelf) {
      booksOnShelf.filter(bookOnShelf => {
        if (bookOnShelf.id === book.id) {
          book.shelf = bookOnShelf.shelf;
        }
        return book;
      });
      return book;
    }
  }

  render() {
    const handleBookShelfChange = this.props.handleBookShelfChange;
    const booksOnShelf = this.props.booksOnShelf;

    const searchResults = this.state.searchResults || [];

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <Debounce time="1000" handler="onBookSearch">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={event => {
                  this.onBookSearch(event.target.value.trim());
                }}
              />
            </Debounce>
          </div>
        </div>

        <div className="search-books-results">
          <div className="loading" />
          <ol className="books-grid">
            {searchResults.map(book => (
              <Book
                key={book.id}
                book={this.UpdateShelf(booksOnShelf, book)}
                handleBookShelfChange={handleBookShelfChange}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBook.propTypes = {
  handleBookShelfChange: PropTypes.func.isRequired,
  booksOnShelf: PropTypes.array.isRequired,
};

export default SearchBook;
