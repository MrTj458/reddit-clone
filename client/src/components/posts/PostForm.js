import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION(
    $title: String!
    $body: String!
    $topicId: Int!
  ) {
    createPost(title: $title, body: $body, topicId: $topicId) {
      id
    }
  }
`

const PostForm = ({ match, history }) => {
  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')

  const [createPost, { error, loading }] = useMutation(CREATE_POST_MUTATION)

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await createPost({
      variables: {
        title,
        body,
        topicId: Number(match.params.topicId),
      },
    })

    history.push(`/post/${res.data.createPost.id}`)
  }

  return (
    <>
      {error && <h2>{error.message}</h2>}
      <form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <input name="title" onChange={e => setTitle(e.target.value)} />
          <textarea name="body" onChange={e => setBody(e.target.value)} />
          <button type="submit">
            {loading ? 'Creating post...' : 'Create Post'}
          </button>
        </fieldset>
      </form>
    </>
  )
}

export default PostForm
