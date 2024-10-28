import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!) {
        login(username: $username) {
            _id
            username
            email
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($userId: ID!, $book: BookInput!) {
        saveBook(userId: $userId, book: $book){
            _id
            username
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($userId: ID!, $book: String!) {
        removeBook(userId: $userId, book: $book) {
            _id
            username
            books
        }
    }
`;
