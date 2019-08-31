import React from 'react'

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import Topic from './Topic'

const TOPICS_QUERY = gql`
  query TOPICS_QUERY($page: Int!, $limit: Int!) {
    topics(page: $page, limit: $limit) {
      pageInfo {
        page
        pages
        count
      }
      nodes {
        id
        name
        description
      }
    }
  }
`

const TopicsList = () => {
  const [page, setPage] = React.useState(1)

  const { data, loading, error } = useQuery(TOPICS_QUERY, {
    variables: { page, limit: 10 },
  })

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error: {error.message}</h1>

  const topics = data.topics.nodes

  return (
    <>
      {topics.map(topic => (
        <Topic key={topic.id} topic={topic} />
      ))}
    </>
  )
}

export default TopicsList
