const { ApolloError } = require('apollo-server-express')
const { Topic } = require('../models')

/**
 * Validate new Topic
 */
module.exports = async ({ title, body, userId, topicId }) => {
  // Make sure a name was given
  if (title.length === 0) {
    throw new ApolloError('Posts must be given a title')
  }

  // Make sure a body was given
  if (body.length === 0) {
    throw new ApolloError('Posts must be given a body')
  }

  // Make sure the given topicId actually exists
  const topic = await Topic.findByPk(topicId)
  if (!topic) {
    throw new ApolloError('Posts must be given a valid user id')
  }
}
