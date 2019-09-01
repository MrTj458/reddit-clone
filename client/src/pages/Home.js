import React from 'react'

import TopicsList from '../components/Topics/TopicsList'
import { Header, Hr } from '../styles/Header'

const Home = ({ match, history }) => {
  return (
    <>
      <Header>Topics</Header>
      <Hr />
      <TopicsList />
    </>
  )
}

export default Home
