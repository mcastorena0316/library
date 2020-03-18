
const firebaseConfig = {
  apiKey: 'AIzaSyD6hxwAmFRu0bM38tQfw4_0ihdfh4TfU0o',
  authDomain: 'my-library-681b1.firebaseapp.com',
  databaseURL: 'https://my-library-681b1.firebaseio.com',
  projectId: 'my-library-681b1',
  storageBucket: 'my-library-681b1.appspot.com',
  messagingSenderId: '261869283629',
  appId: '1:261869283629:web:4897de4a2b52dd49100ba4',
  measurementId: 'G-S1W30G7EQH',
};
// Initialize Firebase
const firebase;
firebase.initializeApp(firebaseConfig);
this.database = firebase.database();

function writeData() {
  firebase.database().ref('Books').push({
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    pages: document.getElementById('pages').value,
    read: document.getElementById('read').checked,
  });
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.deleteBook = () => {
    function deleteBookFunc(e) {
      if (e.target.classList.contains('delete_book')) {
        const id = e.target.id;
        document.getElementById(id).parentElement.parentElement.remove();
      }
    }
    document.getElementById('book-info-body').addEventListener('click', deleteBookFunc);

  };
}

function UI() {
  this.render = (parent, child) => {
    document.getElementById(parent).innerHTML = child;
  };

  this.clearInput = () => {
    document.getElementById('book-form').reset();
  };

  this.displayForm = () => {
    const newBook = document.querySelector('#new-book-btn');
    newBook.addEventListener('click', (e) => {
      document.querySelector('#book-form-content').style.display = 'block';
      e.preventDefault();
    });
  };

  this.readStatus = () => {
    document.getElementById('book-info-body').addEventListener('click', (e) => {
      if (e.target.classList.contains('readStatus')) {
        const id = e.target.id;
        const readContent = document.getElementById(id).textContent;

        if (readContent === 'Read') {
          document.getElementById(id).innerText = 'Unread';
          document.getElementById(id).parentElement.previousElementSibling.previousElementSibling.innerText = 'Read';
        } else if (readContent === 'Unread') {
          document.getElementById(id).innerText = 'Read';
          document.getElementById(id).parentElement.previousElementSibling.previousElementSibling.innerText = 'Unread';
        }
      }
    });
  };
}

const ui = new UI();
const book = new Book();
const myLibrary = [];


function addBookToLibrary(e) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

  if (title !== '' || author !== '') {
    let bookContent = '';
    myLibrary.forEach((item, index) => {
      const read = item.read ? 'Read' : 'Unread';
      const readStatus = item.read ? 'Unread' : 'Read';
      bookContent += `<tr>
                      <th scope='row'>${item.title}</th>
                      <td>${item.author}</td>
                      <td>${item.pages}</td>
                      <td>${read}</td>
                      <td><button type='button' class='btn-danger btn btn-sm delete_book' id='delete_book_${index}'>Delete</button></td>
                      <td><button type='button' class='btn-secondary btn btn-sm readStatus' id='readStatus_${index}'>${readStatus}</button></td>
                      </tr>`;
    });

    ui.render('book-info-body', bookContent);

    const bookContainer = document.getElementById('all-books');
    bookContainer.style.display = 'block';


    ui.clearInput();
  } else {
    document.querySelector('.msg-alert').innerHTML = '<span class="alert alert-danger">Please fill in all inputs</span>';
  }
  e.preventDefault();
}

const addButton = document.querySelector('#add-book-button');
addButton.addEventListener('click', writeData);
addButton.addEventListener('click', addBookToLibrary);

ui.displayForm();
ui.readStatus();
book.deleteBook();
