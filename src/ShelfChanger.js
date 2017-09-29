import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShelfChanger extends Component {
  constructor(props) {
    super(props);
    this.book = this.props.book;
    this.handleBookShelfChange = this.props.handleBookShelfChange;

    this.state = {
      bookShelf: this.book.shelf,
    };
  }

  handleChange(newShelf) {
    this.setState({ bookShelf: newShelf });
    this.handleBookShelfChange(this.book, newShelf);
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          id={this.book.id}
          value={this.state.bookShelf || 'none'}
          onChange={event => this.handleChange(event.target.value)}
        >
          <option value="noneMove" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

ShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  handleBookShelfChange: PropTypes.func.isRequired,
};

export default ShelfChanger;
