import React from "react";
import { Link, Route } from "react-router-dom"
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf.js";

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  };

  componentDidMount() {
    BooksAPI.getAll().then(booksData => {
      // console.log(booksData)
      this.setState(() => ({
        books: booksData
      }))

    })
  }

  filterByShelf(booksData, shelfName) {
    const booksOnShelf = booksData.filter(book => book.shelf === shelfName);
    return booksOnShelf;
  }

  handleMoveShelf = (movedBook, newShelf) => {
    BooksAPI.update(movedBook, newShelf).then(res => {
      movedBook.shelf = newShelf;
      this.setState(prevState => ({
        books: prevState.books
          .filter(book => book.id !== movedBook.id)
          .concat(movedBook)
      }));
    })
    console.log(movedBook);
  }




  render() {
    const books = this.state.books;
    const currentlyReading = this.filterByShelf(books, 'currentlyReading');
    const wantToRead = this.filterByShelf(books, 'wantToRead');
    const read = this.filterByShelf(books, 'read');


    return (
      <div className="app">

        <Route path={"/search"} render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                to='/'
                className="close-search"
              >
                Close
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        )} />

        <Route exact path={"/"} render={() => (
          <div className="list-books">
            <header className="list-books-title">
              <h1>MyReads</h1>
            </header>
            <div className="list-books-content">
              <div>
                <BookShelf
                  shelfId="currentlyReading"
                  shelfBooks={currentlyReading}
                  shelfTitle="Currently Reading"
                  onMoveShelf={this.handleMoveShelf}
                />
                <BookShelf
                  shelfId="wantToRead"
                  shelfBooks={wantToRead}
                  shelfTitle="Want to Read"
                  onMoveShelf={this.handleMoveShelf}
                />
                <BookShelf
                  shelfId="read"
                  shelfBooks={read}
                  shelfTitle="Read"
                  onMoveShelf={this.handleMoveShelf}
                />
              </div>
            </div>
            {/* <div className="open-search"> */}
            <Link
              to='/search'
              className="open-search">
              <button>
                Add a book
              </button>
            </Link>
          </div>
        )} />
      </div>
    );
  }
}

export default BooksApp;
