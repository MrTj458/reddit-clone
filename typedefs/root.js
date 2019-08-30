const { gql } = require('apollo-server-express')

/**
 * Global graphql types
 */
module.exports = gql`
  scalar Date

  type DeleteMessage {
    msg: String!
  }

  type PageInfo {
    page: Int!
    pages: Int!
    count: Int!
  }

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`
