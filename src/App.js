import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import SearchBook from './SearchBook'


class BooksApp extends React.Component {
  state = {
    books:[],
  }

  componentDidMount () {
    this.getAll()
  }

  getAll () {
    BooksAPI.getAll().then((booksList) => {
      this.setState({books:booksList});
    })
  }

  onShiftShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then((resp) => {
      this.getAll()
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksList books={this.state.books} onShiftShelf={this.onShiftShelf} />
          )}
        />

        <Route exact path='/search' render={() => (
          <SearchBook booksOnShelf={this.state.books} onShiftShelf={this.onShiftShelf} />
        )}
          
        />
      </div>
    )
  }
}

export default BooksApp
