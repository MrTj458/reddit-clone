import React from 'react'

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import { UserProvider } from './userContext'

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      username
      email
    }
  }
`

const FetchUser = ({ children }) => {
  const { data, loading, error } = useQuery(ME_QUERY)

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error: {error.message}</h1>

  return <UserProvider value={data.me}>{children}</UserProvider>
}

export default FetchUser
