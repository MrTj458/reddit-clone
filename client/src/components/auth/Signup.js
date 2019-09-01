import React from 'react'

import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import userContext from './userContext'

const Label = styled.label`
  display: block;
  margin: 1rem;
`

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createUser(email: $email, username: $username, password: $password) {
      id
      token
    }
  }
`

const Signup = ({ history }) => {
  const [email, setEmail] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [password2, setPassword2] = React.useState('')

  const { refetchMe } = React.useContext(userContext)

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      email,
      username,
      password,
    },
  })

  const handleSubmit = async e => {
    e.preventDefault()
    let user = null

    if (password === password2) {
      user = await signup()
    }

    if (user) {
      localStorage.setItem('token', user.data.createUser.token)
      refetchMe()
      history.push('/')
    }
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
        <Label htmlFor="username">
          Username{' '}
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
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
        <Label htmlFor="password2">
          Confirm Password{' '}
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        </Label>

        <button type="submit">{loading ? 'Signing up...' : 'Sign up!'}</button>
      </fieldset>
    </form>
  )
}

export default withRouter(Signup)
