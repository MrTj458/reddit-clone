import React from 'react'

import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const PaginationButton = styled.button`
  font-size: 1.5rem;
`

const Pagination = ({ page, pages, setPage, history }) => {
  return (
    <PaginationContainer>
      <PaginationButton
        onClick={() => history.push(`/home/${page - 1}`)}
        disabled={page === 1}
      >
        Last
      </PaginationButton>
      <PaginationButton
        onClick={() => history.push(`/home/${page + 1}`)}
        disabled={page === pages}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  )
}

export default withRouter(Pagination)
