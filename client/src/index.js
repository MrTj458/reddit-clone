import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router } from 'react-router-dom'

import './styles/app.css'

import FetchUser from './components/auth/FetchUser'
import App from './App'

const httpLink = new HttpLink({
  uri: '/graphql',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || '',
    },
  })
  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <FetchUser>
      <Router>
        <App />
      </Router>
    </FetchUser>
  </ApolloProvider>,
  document.getElementById('root')
)
