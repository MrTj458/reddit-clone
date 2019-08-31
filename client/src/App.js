import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const App = () => {
  const { data, loading, error } = useQuery(gql`
    {
      users {
        id
        username
      }
    }
  `)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.users.map(user => (
          <li key={user.id}>
            <h2>{user.username}</h2>
            <br />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
