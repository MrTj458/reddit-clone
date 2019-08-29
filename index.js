require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./typedefs')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express()
server.applyMiddleware({ app })

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
