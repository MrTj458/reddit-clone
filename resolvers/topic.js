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
    async deleteTopic(parent, args, ctx, info) {
      const topic = await Topic.findByPk(args.id)

      if (!topic) {
        throw new ApolloError('That topic does not exist', 404)
      }

      if (ctx.req.userId !== topic.userId) {
        throw new AuthenticationError('Unable to delete other peoples topics')
      }

      try {
        await topic.destroy()

        return { msg: 'Topic deleted' }
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
