import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './components/shared/NavBar'
import Home from './pages/Home'

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/1" />} />
        <Route path="/:page" component={Home} />
      </Switch>
    </>
  )
}

export default App
