const { ApolloError } = require('apollo-server-express')

/**
 * Validate a new user
 */
module.exports = ({ username, email, password }) => {
  if (username.length === 0) {
    throw new ApolloError('You must provide a username', 400)
  }

  if (email.length === 0) {
    throw new ApolloError('You must provide a email', 400)
  }

  if (
    !email.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
  ) {
    throw new ApolloError('Please enter a valid email', 400)
  }

  if (password.length < 8) {
    throw new ApolloError('Password must be at least 8 characters', 400)
  }
}
