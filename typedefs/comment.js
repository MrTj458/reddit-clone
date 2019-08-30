const { gql } = require('apollo-server-express')

module.exports = gql`
  type Comment {
    id: ID!
    body: String!
    user: User!
    post: Post!
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    comments(postId: Int!): [Comment]!
  }

  extend type Mutation {
    createComment(body: String!, postId: Int!): Comment!
    deleteComment(id: Int!): DeleteMessage!
  }
`
