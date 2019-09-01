import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'

import Post from './Post'

const POSTS_QUERY = gql`
  query POSTS_QUERY($topicId: Int!, $page: Int!, $limit: Int!) {
    posts(topicId: $topicId, page: $page, limit: $limit) {
      pageInfo {
        page
        pages
        count
      }
      nodes {
        id
        title
        user {
          id
          username
        }
        likes {
          user {
            id
          }
        }
      }
    }
  }
`

const PostsList = ({ match }) => {
  const page = Number(match.params.page)
  const topicId = Number(match.params.id)

  const { data, error, loading } = useQuery(POSTS_QUERY, {
    variables: { page, topicId, limit: 5 },
  })

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error: {error.message}</h1>

  const posts = data.posts.nodes

  if (posts.length === 0) return <h1>There are no posts</h1>

  return posts.map(post => <Post key={post.id} post={post} />)
}

export default withRouter(PostsList)
