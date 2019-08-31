import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import App from './App'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: '/graphql',
})
const client = new ApolloClient({
  cache,
  link,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
