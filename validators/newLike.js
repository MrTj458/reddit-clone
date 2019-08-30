const { ApolloError } = require('apollo-server-express')
const { Post, Like } = require('../models')

/**
 * Validate new Topic
 */
module.exports = async ({ postId, userId }) => {
  // Make sure the given postId actually exists
  const post = await Post.findByPk(postId)
  if (!post) {
    throw new ApolloError('Likes must be given a valid post id')
  }

  const like = await Like.findAll({ where: { userId, postId } })
  if (like.length > 0) {
    throw new ApolloError('You have already liked this post')
  }
}
