import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookGrid from "./BookGrid.js"
import BookShelf from "./BookShelf.js";

class BooksApp extends React.Component {

  state = {
    books: [],
    query: '',
    results: [],
    queryError: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then(booksData => {
      this.setState(() => ({
        books: booksData
      }))

    })
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
  }

  updateQuery = (target, query) => {
    this.setState(() => ({
      query: query
    }))

    if (query) {
      BooksAPI.search(query.trim()).then(results => {
        results.length > 0
          ? this.setState(() => ({
              results: results,
              queryError: false
            }))
          : this.setState(() => ({
              results: [],
              queryError: true
            }))
      })
    } else {
      this.setState(() => ({
        results: [],
        queryError: false
      }))
    }
  }

  filterByShelf(booksData, shelfName) {
    const booksOnShelf = booksData.filter(book => book.shelf === shelfName);
    return booksOnShelf;
  }



  render() {
    const { books, query, results, queryError } = this.state;
    const currentlyReading = this.filterByShelf(books, 'currentlyReading');
    const wantToRead = this.filterByShelf(books, 'wantToRead');
    const read = this.filterByShelf(books, 'read');
    
    return (
      <div className="app">

        {/* Main view */}
        <Route exact path={"/"} render={() => (
          <div className="list-books">
            <header className="list-books-title">
              <h1>MyReads</h1>
            </header>
            <div className="list-books-content">
              <div>
                <BookShelf
                  allBooks={books}
                  shelfBooks={currentlyReading}
                  shelfTitle="Currently Reading"
                  onMoveShelf={this.handleMoveShelf}
                />
                <BookShelf
                  allBooks={books}
                  shelfBooks={wantToRead}
                  shelfTitle="Want to Read"
                  onMoveShelf={this.handleMoveShelf}
                />
                <BookShelf
                  allBooks={books}
                  shelfBooks={read}
                  shelfTitle="Read"
                  onMoveShelf={this.handleMoveShelf}
                />
              </div>
            </div>
            <Link to='/search' className="open-search">
              <button>
                Add a book
              </button>
            </Link>
          </div>
        )} />

        {/* Search view */}
        <Route path={"/search"} render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">
                Close
              </Link>
              <div className="search-books-input-wrapper">
                <input
                  name="search"
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(e) => {
                    e.preventDefault();
                    this.updateQuery(e.target, e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="search-books-results">
              {results.length > 0 && (
                <BookGrid
                  allBooks={books}
                  shelfBooks={results}
                  onMoveShelf={this.handleMoveShelf} 
                />
              )}
              {queryError && (
                <p>Sorry, no books including {`"${query}"`} were found.</p>
              )}
            </div>
          </div>
        )} />
      </div>
    );
  }
}

export default BooksApp;
