const { ApolloError } = require('apollo-server-express')
const bcrypt = require('bcryptjs')

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

      newUser.password = await bcrypt.hash(newUser.password, 10)

      try {
        newUser = await User.create(newUser)

        return newUser
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
  },
}
