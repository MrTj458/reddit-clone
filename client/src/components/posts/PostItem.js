import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

const Post = ({ post }) => {
  return (
    <Box>
      <Link to={`/post/${post.id}`}>
        <h1>{post.title}</h1>
        <p>
          Posted by: {post.user.username} on{' '}
          {moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
        </p>
      </Link>
    </Box>
  )
}

export default Post
