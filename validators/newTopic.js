const { ApolloError } = require('apollo-server-express')
const { User } = require('../models')

/**
 * Validate new Topic
 */
module.exports = async ({ name, userId }) => {
  // Make sure a name was given
  if (name.length === 0) {
    throw new ApolloError('Topics must be given a name')
  }

  // Make sure the given userId actually exists
  const user = await User.findByPk(userId)
  if (!user) {
    throw new ApolloError('Topics must be given a valid user id')
  }
}
