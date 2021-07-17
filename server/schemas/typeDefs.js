const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    users: [User]
    savedBooks(username: String): [Book]
  }

  input savedBook {
    userId: String
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBook): User
    removeBook(_id: ID, bookId: ID): User
  }
`;

module.exports = typeDefs;
