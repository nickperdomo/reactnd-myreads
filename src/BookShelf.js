import React, { Component } from 'react';
import BookGrid from './BookGrid';

class BookShelf extends Component {


  render() {
    const {shelfId, shelfBooks, shelfTitle} = this.props;

    return (
      <div id={shelfId} className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <BookGrid shelfBooks={shelfBooks}/>
        </div>
      </div>
    )
  }
}

export default BookShelf;