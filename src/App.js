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
    BooksAPI.getAll().then((booksList) => {
      this.setState({books:booksList})
    })
  }

  onShiftShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(resp => {

      this.setState((prevState) => {
        let oldBooks = prevState.books
        let bookFound = oldBooks.filter(oldBook => oldBook.id === book.id)
    
        if (bookFound.length < 1) { // If book is not present on shelf. Add it.
          BooksAPI.get(book.id).then(newBook => {
            oldBooks.push(newBook)
            return {books: oldBooks}
          })
        } else { // Change the shelf
          let updatedBooks = oldBooks.map(oldBook => {
            if (oldBook.id === book.id) {
              oldBook.shelf = newShelf
            }
            return oldBook
          }) 
          return {books: updatedBooks}
        }
      })
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
