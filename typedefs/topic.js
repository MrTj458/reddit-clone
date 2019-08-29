const { gql } = require('apollo-server-express')

/**
 * Topic graphql types
 */
module.exports = gql`
  type Topic {
    id: ID!
    name: String!
    user: User!
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    topics: [Topic]!
    topic(id: Int!): Topic!
  }

  extend type Mutation {
    createTopic(name: String!, userId: Int!): Topic!
    deleteTopic(id: Int!): DeleteMessage!
  }
`
