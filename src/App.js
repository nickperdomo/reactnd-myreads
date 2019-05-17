import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf.js";

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  componentDidMount() {
    BooksAPI.getAll().then(booksData => {
      console.log(booksData)

      this.setState(() => ({
        books: booksData
      }))

    })
  }

  filterByShelf(booksData, shelfName) {
    const booksOnShelf = booksData.filter(book => book.shelf === shelfName);
    return booksOnShelf;
  }

  handleMoveShelf(movedBook, newShelf) {
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
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
        ) : (
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
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>
                  Add a book
              </button>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default BooksApp;
