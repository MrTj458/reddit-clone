require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const jwt = require('jsonwebtoken')

const { User } = require('./models')
const typeDefs = require('./typedefs')
const resolvers = require('./resolvers')

// Create Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({ ...req }),
})

// Make express server
const app = express()

// Middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)

    req.userId = userId
  }

  next()
})

server.applyMiddleware({ app })

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
