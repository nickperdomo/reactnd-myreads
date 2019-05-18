import React from "react";
import { Link, Route } from "react-router-dom";
import serializeForm from 'form-serialize';
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookGrid from "./BookGrid.js"
import BookShelf from "./BookShelf.js";

class BooksApp extends React.Component {

  state = {
    books: [],
    query: '',
    results: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then(booksData => {
      // console.log(booksData)
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
      query: query.trim()
    }))
    BooksAPI.search(query).then(results => {
      console.log(results);
      this.setState(() => ({
        results: results
      }))
    })


    // const values = serializeForm(target, { hash: true })
    // console.log('Values: ', values)
  }

  filterByShelf(booksData, shelfName) {
    const booksOnShelf = booksData.filter(book => book.shelf === shelfName);
    return booksOnShelf;
  }



  render() {
    const { books, query, results } = this.state;
    const currentlyReading = this.filterByShelf(books, 'currentlyReading');
    const wantToRead = this.filterByShelf(books, 'wantToRead');
    const read = this.filterByShelf(books, 'read');

    const searchResults = query === ''
      ? <div>No query</div>
      : <BookGrid shelfBooks={results} onMoveShelf={this.handleMoveShelf} />


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
              {searchResults}
              {/* <BookGrid shelfBooks={results} onMoveShelf={this.handleMoveShelf} /> */}
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
