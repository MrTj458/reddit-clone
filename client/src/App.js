import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from './components/shared/NavBar'
import Home from './pages/Home'

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

const App = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/1" />} />
          <Route exact path="/:page" component={Home} />
        </Switch>
      </Container>
    </>
  )
}

export default App
