import type {
  EditFeedbackById,
  UpdateFeedbackInput,
  UpdateFeedbackMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@cedarjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@cedarjs/web'
import { useMutation } from '@cedarjs/web'
import { toast } from '@cedarjs/web/toast'

import FeedbackForm from 'src/components/Feedback/FeedbackForm'

export const QUERY: TypedDocumentNode<EditFeedbackById> = gql`
  query EditFeedbackById($id: Int!) {
    feedback: feedback(id: $id) {
      id
      subject
      feedback
      slug
      authorId
      status
      createdAt
      updatedAt
    }
  }
`

const UPDATE_FEEDBACK_MUTATION: TypedDocumentNode<
  EditFeedbackById,
  UpdateFeedbackMutationVariables
> = gql`
  mutation UpdateFeedbackMutation($id: Int!, $input: UpdateFeedbackInput!) {
    updateFeedback(id: $id, input: $input) {
      id
      subject
      feedback
      slug
      authorId
      status
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ feedback }: CellSuccessProps<EditFeedbackById>) => {
  const [updateFeedback, { loading, error }] = useMutation(
    UPDATE_FEEDBACK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Feedback updated')
        navigate(routes.feedbacks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateFeedbackInput,
    id: EditFeedbackById['feedback']['id']
  ) => {
    updateFeedback({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Feedback {feedback?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FeedbackForm
          feedback={feedback}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
