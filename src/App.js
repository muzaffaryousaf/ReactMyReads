import React from 'react';
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import './App.css';
import BooksList from './BooksList';
import SearchBook from './SearchBook';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then(booksList => {
      this.setState({ books: booksList });
    });
  }

  handleBookShelfChange = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;

        // Filter out the book and append it to the end of the list
        // so it appears at the end of whatever shelf it was added to.
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book]),
        }));
      });
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BooksList
              books={this.state.books}
              handleBookShelfChange={this.handleBookShelfChange}
            />
          )}
        />

        <Route
          exact
          path="/search"
          render={() => (
            <SearchBook
              booksOnShelf={this.state.books}
              handleBookShelfChange={this.handleBookShelfChange}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
