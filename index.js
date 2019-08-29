require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const cookieParser = require('cookie-parser')

const typeDefs = require('./typedefs')
const resolvers = require('./resolvers')

// Create Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({ ...req }),
})

// Make express server
const app = express()

// Middleware
app.use(cookieParser())
server.applyMiddleware({ app })

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
