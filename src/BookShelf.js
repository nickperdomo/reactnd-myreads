import React, { Component } from 'react';
import BookGrid from './BookGrid';

class BookShelf extends Component {


  render() {
    const {
      allBooks,
      shelfBooks,
      shelfTitle,
      onMoveShelf,
    } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <BookGrid allBooks={allBooks} shelfBooks={shelfBooks} onMoveShelf={onMoveShelf} />
        </div>
      </div>
    )
  }
}

export default BookShelf;