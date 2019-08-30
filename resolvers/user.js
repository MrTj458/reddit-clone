const { ApolloError, AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User, Topic, Post, Like } = require('../models')
const validateUser = require('../validators/newUser')

/**
 * User resolvers
 */
module.exports = {
  Query: {
    // Get all users
    users() {
      return User.findAll()
    },
    // Get a specific user by id
    async user(parent, args) {
      const user = await User.findByPk(args.id)

      if (!user) {
        throw new ApolloError('User not found', 404)
      }

      return user
    },
    // Get the currently logged in user
    async me(parent, args, ctx) {
      const { userId } = ctx.req

      // No JWT given
      if (!userId) {
        throw new AuthenticationError('You must be signed in to do that')
      }

      // Find the user
      const user = await User.findByPk(userId)

      // The user does not exist
      if (!user) {
        throw new ApolloError('That user does not exist', 404)
      }

      return user
    },
  },
  Mutation: {
    // Create a new user
    async createUser(parent, args) {
      let newUser = {
        username: args.username.toLowerCase(),
        email: args.email,
        password: args.password,
      }

      validateUser(newUser)

      // Hash password
      newUser.password = await bcrypt.hash(newUser.password, 10)

      try {
        // Create user in db
        newUser = await User.create(newUser)

        // Log in user
        const token = jwt.sign({ userId: newUser.id }, process.env.APP_SECRET)

        // Put the token on the newUser object
        newUser.token = token

        return newUser
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
    // Sign in a user
    async signin(parent, args) {
      try {
        // Find the user trying to sign in
        const user = await User.findOne({ where: { email: args.email } })

        // User not found
        if (!user) {
          throw new ApolloError(`No user with email ${args.email}`)
        }

        // Check password is correct
        const valid = await bcrypt.compare(args.password, user.password)
        if (!valid) {
          throw new AuthenticationError('Incorrect password')
        }

        // Make JWT
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

        // Put the token on the user
        user.token = token

        return user
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
  },
  User: {
    // Get the topics that belong to a user
    topics(user) {
      return Topic.findAll({ where: { userId: user.id } })
    },
    posts(user) {
      return Post.findAll({ where: { userId: user.id } })
    },
    likes(user) {
      return Like.findAll({ where: { userId: user.id } })
    },
  },
}
