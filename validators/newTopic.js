const { ApolloError } = require('apollo-server-express')

/**
 * Validate new Topic
 */
module.exports = async ({ name }) => {
  // Make sure a name was given
  if (name.length === 0) {
    throw new ApolloError('Topics must be given a name')
  }
}
