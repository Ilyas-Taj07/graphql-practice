const { gql } = require('apollo-server-express')


const roleTypeDefs = gql`

    type Role {
        id: ID!
        name: String!
    }

    type Query {
        roles: [Role]
    }

    type Mutation {
        addRole(name: String!): Role
    }

`

module.exports = roleTypeDefs