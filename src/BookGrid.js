import React, { Component } from 'react';
import Book from './Book';

class BookGrid extends Component {

  render() {
    const {
      shelfBooks,
      onMoveShelf,
    } = this.props;
    // console.log(shelfBooks);

    const bookList = shelfBooks.map(bookData => {
      return (
        <li key={bookData.id}>
          <Book bookData={bookData} onMoveShelf={onMoveShelf} />
        </li>
      )
    })

    return (
      <ol className="books-grid">
        {bookList}
      </ol>
    )
  }
}

export default BookGrid;