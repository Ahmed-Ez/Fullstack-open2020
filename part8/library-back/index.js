const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server');
const mongoose = require('mongoose');
const config = require('./utils/config');
const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./utils/config');
mongoose
  .connect(config.MONGODB_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('mongodb connected'))
  .catch((error) => console.log(error));

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      password: String!
      favouriteGenre: String!
    ): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({});
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({}).populate('author', {
        name: 1,
        born: 1,
        _id: 0,
      });
      if (args.author)
        filteredBooks = filteredBooks.filter(
          (book) => book.author.name === args.author
        );
      if (args.genre)
        filteredBooks = filteredBooks.filter((book) =>
          book.genres.includes(args.genre)
        );
      return filteredBooks;
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: (root, args, context) => {
      console.log(context.currentUser);
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({});
      let bookCount = 0;
      books.forEach((book) => {
        book.author.toString() === root.id ? bookCount++ : null;
      });
      return bookCount;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError('Not authenticated');
      let author = await Author.findOne({ name: args.author });
      if (!author) author = new Author({ name: args.author });
      const newBook = new Book({
        author: author._id,
        title: args.title,
        published: args.published,
        genres: args.genres,
      });
      try {
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return newBook;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError('Not authenticated');
      let newAuthor = await Author.findOne({ name: args.name });
      if (!newAuthor) return null;
      newAuthor.born = args.setBornTo;
      await newAuthor.save();
      return newAuthor;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || user.password !== args.password)
        throw new UserInputError('invalid credentials');
      const token = { username: user.username, id: user._id };
      return { value: jwt.sign(token, config.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decoded = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decoded.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
