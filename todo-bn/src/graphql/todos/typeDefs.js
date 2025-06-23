const { gql } = require('apollo-server-express')


const todoTypeDefs = gql`

    type Todo {
        id: ID!
        todo: String!
        isCompleted: Boolean!
    }

    type Mutation {
        addTodo(todo: String!, userId: String!): Todo
        updateTodo(id: String!, todo:String!, isCompleted: Boolean!): Todo
        deleteTodo(id:String!): ID!
    }

`

module.exports = todoTypeDefs