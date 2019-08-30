const { gql } = require('apollo-server-express')

module.exports = gql`
  type Like {
    id: Int!
    userId: Int!
    postId: Int!
    post: Post!
    user: User!
  }

  extend type Mutation {
    createLike(postId: Int!): Like!
    deleteLike(postId: Int!): DeleteMessage!
  }
`
