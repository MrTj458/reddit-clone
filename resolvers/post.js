const { ApolloError, AuthenticationError } = require('apollo-server-express')

const { Post, User, Topic } = require('../models')

const validatePost = require('../validators/newPost.js')

/**
 * Post resolver
 */
module.exports = {
  Query: {
    posts(parent, args, ctx, info) {
      return Post.findAll()
    },
    async post(parent, args, ctx, info) {
      const post = await Post.findByPk(args.id)

      if (!post) {
        throw new ApolloError('Post not found', 404)
      }

      return post
    },
  },
  Mutation: {
    async createPost(parent, args, ctx, info) {
      const userId = ctx.req.userId

      if (!userId) {
        throw new AuthenticationError('You must be signed in to create a post')
      }

      let newPost = {
        title: args.title,
        body: args.body,
        topicId: args.topicId,
        userId,
      }

      await validatePost(newPost)

      try {
        newPost = await Post.create(newPost)

        return newPost
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
    async deletePost(parent, args, ctx, info) {
      const post = await Post.findByPk(args.id)

      if (!post) {
        throw new ApolloError('That post does not exist')
      }

      if (ctx.req.userId !== post.userId) {
        throw new AuthenticationError('Unable to delete other users posts')
      }

      try {
        await post.destroy()

        return { msg: 'Post deleted' }
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
  },
  Post: {
    user(post) {
      return User.findByPk(post.userId)
    },
    topic(post) {
      return Topic.findByPk(post.topicId)
    },
  },
}
