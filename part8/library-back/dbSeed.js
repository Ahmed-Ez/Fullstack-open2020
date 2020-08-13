const config = require('./utils/config');
const Author = require('./models/Author');
const Book = require('./models/Book');
const mongoose = require('mongoose');
mongoose
  .connect(config.MONGODB_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('mongodb connected'))
  .catch((error) => console.log(error));

let authors = [
  {
    name: 'Robert Martin',

    born: 1952,
  },
  {
    name: 'Martin Fowler',

    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',

    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
  },
  {
    name: 'Sandi Metz', // birthyear not known
  },
];

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: '5f3542779bac7b19c09e7006',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: '5f3542779bac7b19c09e7006',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: '5f3542779bac7b19c09e700a',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: '5f3542779bac7b19c09e700a',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: '5f3542779bac7b19c09e700a',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: '5f3542779bac7b19c09e7008',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: '5f3542779bac7b19c09e7008',
    genres: ['classic', 'revolution'],
  },
];

const addBooks = async () => {
  const bookObjects = books.map((book) => new Book(book));
  const promises = bookObjects.map((object) => object.save());
  await Promise.all(promises);
};

const addAuthors = async () => {
  const authorObjects = authors.map((author) => new Author(author));
  const promises = authorObjects.map((object) => object.save());
  await Promise.all(promises);
};
// addAuthors();
addBooks();
