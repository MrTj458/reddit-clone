const { ApolloError, AuthenticationError } = require('apollo-server-express')

const { Comment, User, Post } = require('../models')

const validateComment = require('../validators/newComment')

module.exports = {
  Query: {
    comments(parent, args, ctx, info) {
      return Comment.findAll({ where: { postId: args.postId } })
    },
  },
  Mutation: {
    async createComment(parent, args, ctx, info) {
      const userId = ctx.req.userId

      if (!userId) {
        throw new AuthenticationError('You must be logged in to comment')
      }

      let newComment = {
        body: args.body,
        postId: args.postId,
        userId,
      }

      await validateComment(newComment)

      try {
        newComment = await Comment.create(newComment)

        return newComment
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
    async deleteComment(parent, args, ctx, info) {
      if (!ctx.req.userId) {
        throw new AuthenticationError('You must sign in to delete comments')
      }

      const comment = await Comment.findByPk(args.id)

      if (!comment) {
        throw new ApolloError('That comment does not exist')
      }

      if (ctx.req.userId !== post.userId) {
        throw new AuthenticationError('Unable to delete other users comments')
      }

      try {
        await comment.destroy()

        return { msg: 'Comment deleted' }
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
  },
  Comment: {
    user(comment) {
      return User.findByPk(comment.userId)
    },
    post(comment) {
      return Post.findByPk(comment.postId)
    },
  },
}
