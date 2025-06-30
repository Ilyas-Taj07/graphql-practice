const { gql } = require('apollo-server-express')


const todoTypeDefs = gql`

    type Todo {
        id: ID!
        todo: String!
        isCompleted: Boolean!
    }

    type User {
        id: ID!
        name: String!
        todos: [Todo]
    }

    type Query{
        todos(userId: String!): User
    }

    type Mutation {
        addTodo(todo: String!, userId: String!): Todo
        updateTodo(id: String!, todo:String!, isCompleted: Boolean!): Todo
        deleteTodo(id:String!): Todo
    }

`

module.exports = todoTypeDefs