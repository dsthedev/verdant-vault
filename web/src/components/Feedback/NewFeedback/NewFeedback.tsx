import type {
  CreateFeedbackMutation,
  CreateFeedbackInput,
  CreateFeedbackMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@cedarjs/router'
import { useMutation } from '@cedarjs/web'
import type { TypedDocumentNode } from '@cedarjs/web'
import { toast } from '@cedarjs/web/toast'

import FeedbackForm from 'src/components/Feedback/FeedbackForm'

const CREATE_FEEDBACK_MUTATION: TypedDocumentNode<
  CreateFeedbackMutation,
  CreateFeedbackMutationVariables
> = gql`
  mutation CreateFeedbackMutation($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      id
    }
  }
`

const NewFeedback = () => {
  const [createFeedback, { loading, error }] = useMutation(
    CREATE_FEEDBACK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Feedback created')
        navigate(routes.feedbacks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateFeedbackInput) => {
    createFeedback({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Feedback</h2>
      </header>
      <div className="rw-segment-main">
        <FeedbackForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFeedback
