const { ApolloError, AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../models')
const validateUser = require('../validators/newUser')

/**
 * User resolvers
 */
module.exports = {
  Query: {
    users(parent, args, ctx, info) {
      return User.findAll()
    },
    async user(parent, args, ctx, info) {
      const user = await User.findByPk(args.id)

      if (!user) {
        throw new ApolloError('User not found', 404)
      }

      return user
    },
  },
  Mutation: {
    async createUser(parent, args, ctx, info) {
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

        newUser.token = token

        return newUser
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
    async signin(parent, args, ctx, info) {
      try {
        const user = await User.findOne({ where: { email: args.email } })

        if (!user) {
          throw new ApolloError(`No user with email ${args.email}`)
        }

        const valid = await bcrypt.compare(args.password, user.password)
        if (!valid) {
          throw new AuthenticationError('Incorrect password')
        }

        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

        user.token = token

        return user
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
  },
}
