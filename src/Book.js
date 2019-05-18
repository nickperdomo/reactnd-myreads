import React, { Component } from 'react';

class Book extends Component {
  constructor(props) {
    super(props);
    this.bookData = props.bookData;
    this.onMoveShelf = props.onMoveShelf;
    this.state = { shelf: this.bookData.shelf };
  }

  updateShelf(newShelf) {
    this.setState(() => ({
      shelf: newShelf,
    }))
    this.onMoveShelf(this.bookData, newShelf)
  }


  render() {
    const bookData = this.bookData;
    const authors = bookData.authors && bookData.authors.length > 1
      ? bookData.authors.join(", ")
      : `${bookData.authors}`;
    const thumbnail = bookData.imageLinks && bookData.imageLinks.thumbnail
      ? bookData.imageLinks.thumbnail
      : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTg4Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojY2VjZWNlO308L3N0eWxlPjwvZGVmcz48dGl0bGU+dGh1bWJuYWlsPC90aXRsZT48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxODgiLz48L3N2Zz4=";

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={(event) => this.updateShelf(event.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookData.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

export default Book;