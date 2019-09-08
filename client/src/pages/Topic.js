import React from 'react'
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import PostsList from '../components/posts/PostsList'
import { Header, Hr } from '../styles/Header'

const TOPIC_QUERY = gql`
  query TOPIC_QUERY($id: Int!) {
    topic(id: $id) {
      id
      name
      description
      user {
        username
      }
    }
  }
`

const Topic = ({ match }) => {
  const { data, error, loading } = useQuery(TOPIC_QUERY, {
    variables: { id: Number(match.params.id) },
  })

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error: {error.message}</h1>

  const { topic } = data

  return (
    <>
      <Header>{topic.name}</Header>
      <h2>{topic.description}</h2>
      <Link to={`/new/post/${topic.id}`}>Create New Post</Link>
      <p>Topic created by: {topic.user.username}</p>
      <Hr />
      <PostsList />
    </>
  )
}

export default Topic
