import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf.js'

class BooksApp extends React.Component {
  state = {
    books: {
      all: [],
      wantToRead: [],
      currentlyReading: [],
      read: [],
    },
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  filterByShelf(booksData, shelfName) {
    const booksOnShelf = booksData.filter(book => book.shelf === shelfName);
    return booksOnShelf;
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(booksData =>
        this.setState(() => ({
          books: {
            all: booksData,
            currentlyReading: this.filterByShelf(booksData, 'currentlyReading'),
            wantToRead: this.filterByShelf(booksData, 'wantToRead'),
            read: this.filterByShelf(booksData, 'read'),
          }
        }))
      );
  }

  render() {

    // const bookPropertyTest = this.state.books.all.length && console.log(this.state.books.read);
    const {currentlyReading, wantToRead, read} = this.state.books;

    return (
     

      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
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
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <header className="list-books-title">
                <h1>MyReads</h1>
              </header>
              <div className="list-books-content">
                <div>
                  <BookShelf shelfId="currentlyReading" shelfBooks={currentlyReading} shelfTitle="Currently Reading" ></BookShelf>
                  <BookShelf shelfId="wantToRead" shelfBooks={wantToRead} shelfTitle="Want to Read" ></BookShelf>
                  <BookShelf shelfId="read" shelfBooks={read} shelfTitle="Read" ></BookShelf>
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
