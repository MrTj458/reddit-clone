import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const CREATE_TOPIC_MUTATION = gql`
  mutation CREATE_TOPIC_MUTATION($name: String!, $description: String!) {
    createTopic(name: $name, description: $description) {
      id
    }
  }
`

const TopicForm = ({ history }) => {
  const [name, setName] = React.useState('')
  const [desc, setDesc] = React.useState('')

  const [createTopic, { loading, error }] = useMutation(CREATE_TOPIC_MUTATION)

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await createTopic({ variables: { name, description: desc } })

    history.push(`/topic/${res.data.createTopic.id}/1`)
  }

  return (
    <>
      {error && <h2>{error.message}</h2>}
      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <input
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            name="description"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
          <button type="submit">
            {loading ? 'Creating...' : 'Create Topic'}
          </button>
        </fieldset>
      </form>
    </>
  )
}

export default TopicForm
