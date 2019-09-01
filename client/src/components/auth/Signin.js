import React from 'react'

import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import userContext from './userContext'

const Label = styled.label`
  display: block;
  margin: 1rem;
`

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      token
    }
  }
`

const Signin = ({ history }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { refetchMe } = React.useContext(userContext)

  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    variables: {
      email,
      password,
    },
  })

  const handleSubmit = async e => {
    e.preventDefault()

    const user = await signin()

    localStorage.setItem('token', user.data.signin.token)
    refetchMe()
    history.push('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <h1>{error.message.split('GraphQL error: ')[1]}</h1>}
      <fieldset disabled={loading}>
        <Label htmlFor="email">
          Email{' '}
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Label>
        <Label htmlFor="password">
          Password{' '}
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Label>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </fieldset>
    </form>
  )
}

export default withRouter(Signin)
