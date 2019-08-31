const { gql } = require('apollo-server-express')

/**
 * Topic graphql types
 */
module.exports = gql`
  type Topic {
    id: ID!
    name: String!
    description: String!
    user: User!
    createdAt: Date
    updatedAt: Date
  }

  type TopicConnection {
    pageInfo: PageInfo!
    nodes: [Topic]!
  }

  extend type Query {
    topics(page: Int!, limit: Int!): TopicConnection!
    topic(id: Int!): Topic!
  }

  extend type Mutation {
    createTopic(name: String!, description: String!): Topic!
    deleteTopic(id: Int!): DeleteMessage!
  }
`
