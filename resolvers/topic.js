const { ApolloError, AuthenticationError } = require('apollo-server-express')

const { Topic, User } = require('../models')

const validateTopic = require('../validators/newTopic')

/**
 * Topic resolvers
 */
module.exports = {
  Query: {
    // Get all topics
    topics(parent, args, ctx, info) {
      return Topic.findAll()
    },
    // Get a specific topic by id
    async topic(parent, args, ctx, info) {
      // Find the topic
      const topic = await Topic.findByPk(args.id)

      // Topic does not exits
      if (!topic) {
        throw new ApolloError('Topic not found', 404)
      }

      return topic
    },
  },
  Mutation: {
    // Create a new topic
    async createTopic(parent, args, ctx, info) {
      // Create topic object
      let newTopic = {
        name: args.name,
        userId: args.userId,
      }

      // Validate topic
      await validateTopic(newTopic)

      try {
        // Create topic in db
        newTopic = await Topic.create(newTopic)

        return newTopic
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
    // Delete a topic
    async deleteTopic(parent, args, ctx, info) {
      // Find the topic
      const topic = await Topic.findByPk(args.id)

      // Topic does not exist
      if (!topic) {
        throw new ApolloError('That topic does not exist', 404)
      }

      // The user is either not logged in or does not own this topic
      if (ctx.req.userId !== topic.userId) {
        throw new AuthenticationError('Unable to delete other users topics')
      }

      try {
        // Delete the topic
        await topic.destroy()

        return { msg: 'Topic deleted' }
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
  },
  Topic: {
    // Get the user a topic belongs to
    user(topic) {
      return User.findByPk(topic.userId)
    },
  },
}
