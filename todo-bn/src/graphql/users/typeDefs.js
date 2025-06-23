const { gql } = require('apollo-server-express')

const userTypeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        role: Role
        todos: [Todo]
    }

    type Role{
        id: ID!
        name: String!
    }

    type Todo {
        id: ID!
        todo: String!
        isCompleted: Boolean!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        addUser(name: String!, email: String!, password: String!, roleId: String!): User
    }

`


module.exports = userTypeDefs