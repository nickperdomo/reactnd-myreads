import React, { Component } from 'react';

class Book extends Component {
  constructor(props) {
    super(props);
    this.bookData = props.bookData;
    this.onMoveShelf = props.onMoveShelf;
    this.state = {
      shelf: this.bookData.shelf,
    }
  }

  updateShelf(newShelf) {
    this.setState(() => ({
      shelf: newShelf,
    }))
    this.onMoveShelf(this.bookData, newShelf)
  }




  render() {
    const bookData = this.bookData;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${bookData.imageLinks.thumbnail})` }}></div>
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
        <div className="book-authors">{bookData.authors.join(", ")}</div>
      </div>
    )
  }
}

export default Book;