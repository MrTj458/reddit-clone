const { gql } = require('apollo-server-express')

/**
 * Post graphql types
 */
module.exports = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    user: User!
    topic: Topic!
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    posts: [Post]!
    post(id: Int!): Post!
  }

  extend type Mutation {
    createPost(
      title: String!
      body: String!
      userId: Int!
      topicId: Int!
    ): Post!
    deletePost(id: Int!): DeleteMessage!
  }
`
