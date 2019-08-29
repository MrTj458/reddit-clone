const { gql } = require('apollo-server-express')

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
  }
`
