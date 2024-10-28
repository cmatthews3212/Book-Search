const typeDefs = `
    type User {
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String!
        image: String
        link: String
        title: String!
    }

    input BookInput {
        bookId: ID!
         authors: [String]
        description: String!
        image: String
        link: String
        title: String!

    }

    type Auth {
        token: String!
        user: User
    }

    type Query {
        me: User!
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(userId: ID!, book: BookInput!): User
        removeBook(userId: ID!, bookId: ID!): User
    }
`;

module.exports = typeDefs;