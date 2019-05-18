import React, { Component } from 'react';
import Book from './Book';

class BookGrid extends Component {

  render() {
    const {
      allBooks,
      shelfBooks,
      onMoveShelf,
    } = this.props;

    const bookList = shelfBooks.length > 0 &&
      shelfBooks.map(bookData => {
          const matchingBook = allBooks.filter( existingBook => existingBook.id === bookData.id)[0];
          
          if(matchingBook) {
            bookData.shelf = matchingBook.shelf;
          } else {
            bookData.shelf = 'none';
          }

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