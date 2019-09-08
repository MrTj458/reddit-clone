import React from 'react'
import { Link } from 'react-router-dom'

import TopicsList from '../components/Topics/TopicsList'
import { Header, Hr } from '../styles/Header'

const Home = ({ match, history }) => {
  return (
    <>
      <Header>Topics</Header>
      <Link to="/new/topic">Create new Topic</Link>
      <Hr />
      <TopicsList />
    </>
  )
}

export default Home
