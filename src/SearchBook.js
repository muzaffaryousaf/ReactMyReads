import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as BooksAPI from './BooksAPI'
import Book from './Book'


class SearchBook extends Component {
	
	static PropTypes = {
		onShiftShelf: PropTypes.func.isRequired,
		booksOnShelf: PropTypes.array.isRequired
	}
	
  state = {
		searchResults: []
	}
		
	onBookSearch(query) {
		if (query) {
			BooksAPI.search(query, 25).then((resp) => {
				// In case of error, show default search page
				if (resp.error) {
					console.log('The search is limited to a particular set of search terms')
					this.setState({ searchResults: [] })
				} else {
					this.setState({ searchResults: resp })
				}
			})
		}
	}
		
	ComputeShelf (book) {
		// We need this due to inconsistency between data returned by All & Search API.
		if (this.props.booksOnShelf) {
			this.props.booksOnShelf.filter((bookOnShelf) => {
				if (bookOnShelf.id === book.id) {
					book.shelf = bookOnShelf.shelf
					return book
				}
			})
		}
	}

	render() {
			const searchResults = this.state.searchResults || []
			const onShiftShelf = this.props.onShiftShelf	

			return (
				<div className="search-books">
					<div className="search-books-bar">
						<Link to="/" className="close-search">Close</Link>
						<div className="search-books-input-wrapper">
							<input type="text" placeholder="Search by title or author" onChange={(event) => this.onBookSearch(event.target.value.trim())} />
						</div>
					</div>

					<div className="search-books-results">
						<ol className="books-grid">
							{
								searchResults.map(book => (
										<Book key={book.id} book={book} shelf={this.ComputeShelf(book)} onShiftShelf={onShiftShelf} />
								))
							}
						</ol>
					</div>
				</div>
			)
	}
}

export default SearchBook;
