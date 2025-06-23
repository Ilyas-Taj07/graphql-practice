const userResovlers = require('./users/resolvers')
const userTypeDefs = require('./users/typeDefs')

const roleTypeDefs = require('./role/typeDefs')
const roleResovlers = require('./role/resolvers')

const todoTypeDefs = require('./todos/typeDefs')
const todoResovler = require('./todos/resolvers')

const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')


const typeDefs = mergeTypeDefs([userTypeDefs, roleTypeDefs, todoTypeDefs])
const resolvers = mergeResolvers([userResovlers, roleResovlers, todoResovler])


module.exports = {
    typeDefs,
    resolvers
}