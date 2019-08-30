const { ApolloError } = require('apollo-server-express')
const { Post } = require('../models')

/**
 * Validate new Topic
 */
module.exports = async ({ body, postId }) => {
  // Make sure a body was give
  if (body.length === 0) {
    throw new ApolloError('Comment must be given a body')
  }

  // Make sure the given topicId actually exists
  const post = await Post.findByPk(postId)
  if (!post) {
    throw new ApolloError('Comments must be given a valid post id')
  }
}
