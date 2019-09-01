import React from 'react'

import TopicsList from '../components/Topics/TopicsList'
import styled from 'styled-components'

const Header = styled.h1`
  font-size: 3rem;
  text-align: center;
`

const Hr = styled.hr`
  margin: 1rem 0;
`

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
