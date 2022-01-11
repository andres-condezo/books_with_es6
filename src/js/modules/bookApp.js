import Book from './book.js';
import { $, $$ } from './utilities.js';

const $bookContainer = $('#list-book');
const $errorMsgContainer = $('.error-msg-container');
const [$titleInput, $authorInput] = $$('input');

// ***************
// BookApp Class
// ***************

class BookApp {
  constructor() {
    this.bookCollection = [];
  }

  // Local Storage

  saveLocal = () => {
    const catchCollection = JSON.stringify(this.bookCollection);
    localStorage.setItem('bookCollection', catchCollection);
  }

  getLocal = () => {
    if (localStorage.getItem('bookCollection')) {
      this.bookCollection = JSON.parse(localStorage.getItem('bookCollection'));
    }
  }

  // main functions

  bookTemplate = (book) => `
  <h3 class="bookTitle">"${book.title}" by ${book.author}</h3>
  <button type='button' class="removeBookBtn">Remove</button>
  `;

  renderBooks = () => {
    $bookContainer.innerHTML = '';
    this.bookCollection.forEach((book) => {
      const article = document.createElement('article');
      article.className = 'article-book';
      article.innerHTML = this.bookTemplate(book);
      $bookContainer.appendChild(article);
    });
  }

  createRemoveFunction = () => {
    const removeBtnArray = document.querySelectorAll('.removeBookBtn');
    removeBtnArray.forEach((button, index) => {
      button.addEventListener('click', () => {
        this.bookCollection.splice(index, 1);
        this.renderBooks();
        this.createRemoveFunction();
        this.saveLocal();
      });
    });
  }

  displayBookCollection = () => {
    this.renderBooks();
    this.createRemoveFunction();
  }

  clearFields = () => {
    $titleInput.value = '';
    $authorInput.value = '';
  }

  isNotValid = (newTitle, newAuthor) => {
    const bool = this.bookCollection.find(
      (item) => item.title.toLowerCase() === newTitle.toLowerCase()
            && item.author.toLowerCase() === newAuthor.toLowerCase(),
    );
    return bool;
  }

  displayError = () => {
    $errorMsgContainer.innerHTML = '* The book is already in the collection';
    setTimeout(() => { $errorMsgContainer.innerHTML = ''; this.clearFields(); }, 2000);
  }

  createBook() {
    const newBook = new Book($titleInput.value, $authorInput.value);
    this.bookCollection.push(newBook);
    this.displayBookCollection();
    this.clearFields();
    this.saveLocal();
  }

  addBook = () => {
    if (this.isNotValid($titleInput.value, $authorInput.value)) {
      this.displayError();
      return;
    }
    this.createBook();
  }
}

export default BookApp;
