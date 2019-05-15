import React, { Component } from 'react';

class BookGrid extends Component {


  render() {
    const { shelfBooks } = this.props;
    console.log(shelfBooks);
    const bookList = shelfBooks.map( book => {
      return (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.join(", ")}</div>
          </div>
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