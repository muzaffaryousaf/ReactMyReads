import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class BooksList extends Component {

	render () {
		const books = this.props.books;
		const onShiftShelf = this.props.onShiftShelf;
		
		return ( 
				<div className='list-books'>
					<div className='list-books-title'>
						<h1>MyReads</h1>
					</div>
					<div className='list-books-content'>
						<BookShelf books={books.filter(book => book.shelf === 'currentlyReading')} title='Currently Reading' onShiftShelf={onShiftShelf}/>
						<BookShelf books={books.filter(book => book.shelf === 'wantToRead')} title='Want to Read' onShiftShelf={onShiftShelf}/>
						<BookShelf books={books.filter(book => book.shelf === 'read')} title='Read' onShiftShelf={onShiftShelf}/>
					</div>
					<div className='open-search'>
						<Link to='/search'>Search book</Link>
					</div>
			</div>
	  )   
	}
}

export default BooksList;