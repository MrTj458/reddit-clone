import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router } from 'react-router-dom'

import FetchUser from './components/auth/FetchUser'
import App from './App'

const getClient = () => {
  const headers = {
    Authorization: localStorage.getItem('token') || '',
  }

  const link = new HttpLink({
    uri: '/graphql',
    credentials: 'include',
    headers,
  })

  const cache = new InMemoryCache()

  return new ApolloClient({
    cache,
    link,
  })
}

ReactDOM.render(
  <ApolloProvider client={getClient()}>
    <FetchUser>
      <Router>
        <App />
      </Router>
    </FetchUser>
  </ApolloProvider>,
  document.getElementById('root')
)
