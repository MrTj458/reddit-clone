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

  type PostConnection {
    pageInfo: PageInfo!
    nodes: [Post]!
  }

  extend type Query {
    posts(page: Int!, limit: Int!, topicId: Int!): PostConnection!
    post(id: Int!): Post!
  }

  extend type Mutation {
    createPost(title: String!, body: String!, topicId: Int!): Post!
    deletePost(id: Int!): DeleteMessage!
  }
`
