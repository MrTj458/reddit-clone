import React from 'react'

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'

import Topic from './TopicItem'
import Pagination from '../shared/Pagination'

export const TOPICS_QUERY = gql`
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

const TopicsList = ({ match }) => {
  const page = Number(match.params.page)

  const { data, loading, error } = useQuery(TOPICS_QUERY, {
    variables: { page, limit: 5 },
  })

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error: {error.message}</h1>

  const topics = data.topics.nodes
  const pageInfo = data.topics.pageInfo

  return (
    <>
      <Pagination page={page} pages={pageInfo.pages} url="/home" />
      {topics.map(topic => (
        <Topic key={topic.id} topic={topic} />
      ))}
      <Pagination page={page} pages={pageInfo.pages} url="/home" />
    </>
  )
}

export default withRouter(TopicsList)
