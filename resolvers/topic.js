const { ApolloError, AuthenticationError } = require('apollo-server-express')

const { Topic, User } = require('../models')

const validateTopic = require('../validators/newTopic')

module.exports = {
  Query: {
    topics(parent, args, ctx, info) {
      return Topic.findAll()
    },
    async topic(parent, args, ctx, info) {
      const topic = await Topic.findByPk(args.id)

      if (!topic) {
        throw new ApolloError('Topic not found', 404)
      }

      return topic
    },
  },
  Mutation: {
    async createTopic(parent, args, ctx, info) {
      let newTopic = {
        name: args.name,
        userId: args.userId,
      }

      await validateTopic(newTopic)

      try {
        newTopic = await Topic.create(newTopic)

        return newTopic
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
  },
  Topic: {
    user(topic) {
      return User.findByPk(topic.userId)
    },
  },
}
