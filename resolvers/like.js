const { ApolloError, AuthenticationError } = require('apollo-server-express')

const { Like, User, Post } = require('../models')

const validateLike = require('../validators/newLike')

module.exports = {
  Mutation: {
    async createLike(parent, args, ctx, info) {
      let userId = ctx.req.userId

      if (!userId) {
        throw new AuthenticationError('You must be logged in to like posts')
      }

      let newLike = {
        postId: args.postId,
        userId,
      }

      await validateLike(newLike)

      try {
        newLike = await Like.create(newLike)

        return newLike
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
    async deleteLike(parent, args, ctx, info) {
      if (!ctx.req.userId) {
        throw new AuthenticationError('You must sign in to delete likes')
      }

      const like = await Like.findOne({
        where: { userId: ctx.req.userId, postId: args.postId },
      })

      if (!like) {
        throw new ApolloError('That like does not exist')
      }

      if (ctx.req.userId !== like.userId) {
        throw new AuthenticationError('Unable to delete other users likes')
      }

      try {
        await like.destroy()

        return { msg: 'Like deleted' }
      } catch (e) {
        throw new ApolloError(e.message, 400)
      }
    },
  },
  Like: {
    user(like) {
      return User.findByPk(like.userId)
    },
    post(like) {
      return Post.findByPk(like.postId)
    },
  },
}
