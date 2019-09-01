import React from 'react'

const Pagination = ({ page, pages, setPage }) => {
  return (
    <>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Last
      </button>
      <button onClick={() => setPage(page + 1)} disabled={page === pages}>
        Next
      </button>
    </>
  )
}

export default Pagination
