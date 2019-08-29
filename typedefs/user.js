const { gql } = require('apollo-server-express')

/**
 * User Graphql types
 */
module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String!
    createdAt: Date
    updatedAt: Date
    token: String
    topics: [Topic]!
  }

  extend type Query {
    user(id: Int!): User!
    users: [User]!
    me: User!
  }

  extend type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    signin(email: String!, password: String!): User!
  }
`
