const { ApolloError } = require('apollo-server-express')
const { User } = require('../models')

module.exports = async ({ name, userId }) => {
  if (name.length === 0) {
    throw new ApolloError('Topics must be given a name')
  }

  const user = await User.findByPk(userId)
  if (!user) {
    throw new ApolloError('Topics must be given a valid user id')
  }
}
