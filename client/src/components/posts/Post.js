import React from 'react'
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

const POST_QUERY = gql`
  query POST_QUERY($id: Int!) {
    post(id: $id) {
      id
      title
      body
      createdAt
      user {
        id
        username
      }
    }
  }
`

const Post = ({ match }) => {
  const { data, error, loading } = useQuery(POST_QUERY, {
    variables: { id: Number(match.params.id) },
  })

  const { post } = data

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error: {error.message}</h1>

  return (
    <>
      <h1>{post.title}</h1>
      <p>
        Posted by <Link to={`/user/${post.user.id}`}>{post.user.username}</Link>{' '}
        on {moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
      </p>
      <p>{post.body}</p>
      <hr />
    </>
  )
}

export default Post
