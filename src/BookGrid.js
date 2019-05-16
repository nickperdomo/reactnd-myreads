import React, { Component } from 'react';
import Book from './Book';

class BookGrid extends Component {

  render() {
    const { shelfBooks } = this.props;
    // console.log(shelfBooks);

    const bookList = shelfBooks.map( bookData => {
      return (
        <li key={bookData.id}>
          <Book bookData={bookData} />
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