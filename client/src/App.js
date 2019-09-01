import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import NavBar from './components/shared/NavBar'
import Home from './pages/Home'
import Topic from './pages/Topic'
import Signup from './components/auth/Signup'

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
          {/* Home page / topics page */}
          <Route exact path="/" render={() => <Redirect to="/home/1" />} />
          <Route exact path="/home/:page" component={Home} />

          {/* Posts page */}
          <Route
            exact
            path="/topic/:id"
            render={({ match }) => (
              <Redirect to={`/topic/${match.params.id}/1`} />
            )}
          />
          <Route exact path="/topic/:id/:page" component={Topic} />

          {/* Auth */}
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Container>
    </>
  )
}

export default App
