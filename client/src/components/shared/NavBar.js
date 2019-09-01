import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import userContext from '../auth/userContext'

const Nav = styled.div`
  width: 100%;
  height: 50px;
  background: gray;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: white;
    font-size: 2rem;
    padding: 10px;
  }

  button {
    background: none;
    border: none;
    text-decoration: none;
    color: white;
    font-size: 2rem;
    font-weight: normal;
    cursor: pointer;
    padding-right: 10px;
    height: 100%;
  }
`

const handleSignout = refetchMe => {
  localStorage.removeItem('token')
  refetchMe()
}

const NavBar = () => {
  const { user, refetchMe } = React.useContext(userContext)

  return (
    <Nav>
      {/* Left nav */}
      <div>
        <Link to="/">Home</Link>
      </div>

      {/* Right nav */}
      <div>
        {user && <Link to={`/user/${user.id}`}>{user.username}</Link>}
        {user ? (
          <button onClick={() => handleSignout(refetchMe)}>Sign Out</button>
        ) : (
          <Link to="/signin">Sign in</Link>
        )}
        {!user && <Link to="/signup">Sign Up</Link>}
      </div>
    </Nav>
  )
}

export default NavBar
