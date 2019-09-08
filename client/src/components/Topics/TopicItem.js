import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Box = styled.div`
  border: 1px solid black;
  margin-bottom: 0.25rem;
  padding: 0;

  h1 {
    font-size: 2rem;
    padding: 0;
    margin: 0;
  }

  a {
    padding: 1rem;
    height: 100%;
    text-decoration: none;
    color: black;
  }

  a:hover {
    color: blue;
  }
`

const Topic = ({ topic }) => {
  return (
    <Box>
      <Link to={`/topic/${topic.id}`}>
        <h1>{topic.name}</h1>
        <p>{topic.description}</p>
      </Link>
    </Box>
  )
}

export default Topic
