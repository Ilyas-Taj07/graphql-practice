require('dotenv').config()

const express = require('express')
const connectDB = require('./src/db/db')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')

const { typeDefs, resolvers } = require('./src/graphql/schema')

const startServer = async () => {

    const app = express()
    app.use(cors())
    const server = new ApolloServer({ typeDefs, resolvers })

    await server.start()

    server.applyMiddleware({ app });


    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server is running http://localhost:${process.env.PORt}${server.graphqlPath}`)
        connectDB();
    })

}

startServer()