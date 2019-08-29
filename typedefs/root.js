const { gql } = require('apollo-server-express')

/**
 * Global graphql types
 */
module.exports = gql`
  scalar Date

  type DeleteMessage {
    msg: String!
  }

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`
