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

    // const bookList = shelfBooks.length > 0
    //   ? shelfBooks.map(bookData => {
    //       return (
    //         <li key={bookData.id}>
    //           <Book bookData={bookData} onMoveShelf={onMoveShelf} />
    //         </li>
    //       )
    //     })
    //   : <div>No results</div>

    return (
      <ol className="books-grid">
        {bookList}
      </ol>
    )
  }
}

export default BookGrid;