import React from 'react'

import { Switch, Route } from 'react-router-dom'

import NavBar from './components/shared/NavBar'
import Home from './pages/Home'

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  )
}

export default App
