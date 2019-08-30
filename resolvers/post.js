const { ApolloError, AuthenticationError } = require('apollo-server-express')

const { Post, User, Topic, Like } = require('../models')

const validatePost = require('../validators/newPost.js')

/**
 * Post resolver
 */
module.exports = {
  Query: {
    // Get all posts
    async posts(parent, args, ctx, info) {
      const posts = await Post.findAll({
        where: { topicId: args.topicId },
        limit: args.limit,
        offset: args.page * args.limit - args.limit,
      })
      const count = await Post.count()

      const pageInfo = {
        page: args.page,
        pages: Math.ceil(count / args.limit),
        count,
      }

      return { pageInfo, nodes: posts }
    },
    // Get a post by ID
    async post(parent, args, ctx, info) {
      // Get the post
      const post = await Post.findByPk(args.id)

      // Post does not exist
      if (!post) {
        throw new ApolloError('Post not found', 404)
      }

      return post
    },
  },
  Mutation: {
    // Create a new post
    async createPost(parent, args, ctx, info) {
      // Get current user
      const userId = ctx.req.userId

      // There is no user
      if (!userId) {
        throw new AuthenticationError('You must be signed in to create a post')
      }

      // Scaffold new post
      let newPost = {
        title: args.title,
        body: args.body,
        topicId: args.topicId,
        userId,
      }

      // Validate new post
      await validatePost(newPost)

      try {
        // Add post to db
        newPost = await Post.create(newPost)

        return newPost
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
    // Delete a post by id
    async deletePost(parent, args, ctx, info) {
      if (!ctx.req.userId) {
        throw new AuthenticationError('You must sign in to delete posts')
      }
      // Get post
      const post = await Post.findByPk(args.id)

      // The post does not exist
      if (!post) {
        throw new ApolloError('That post does not exist')
      }

      // The post belongs to a different user
      if (ctx.req.userId !== post.userId) {
        throw new AuthenticationError('Unable to delete other users posts')
      }

      try {
        // Delete post from db
        await post.destroy()

        return { msg: 'Post deleted' }
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
  },
  Post: {
    // Get the posts user
    user(post) {
      return User.findByPk(post.userId)
    },
    // Get the posts topic
    topic(post) {
      return Topic.findByPk(post.topicId)
    },
    likes(post) {
      return Like.findAll({ where: { postId: post.id } })
    },
  },
}
