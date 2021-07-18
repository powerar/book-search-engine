import { gql } from 'graphql-tag';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        username
        bookCount
      }
      token
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      username
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: savedBook!) {
    saveBook(input: $input) {
      username
      bookCount
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;
