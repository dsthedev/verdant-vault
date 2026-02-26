import type {
  DeleteFeedbackMutation,
  DeleteFeedbackMutationVariables,
  FindFeedbackById,
} from 'types/graphql'

import { Link, routes, navigate } from '@cedarjs/router'
import { useMutation } from '@cedarjs/web'
import type { TypedDocumentNode } from '@cedarjs/web'
import { toast } from '@cedarjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters.js'

const DELETE_FEEDBACK_MUTATION: TypedDocumentNode<
  DeleteFeedbackMutation,
  DeleteFeedbackMutationVariables
> = gql`
  mutation DeleteFeedbackMutation($id: Int!) {
    deleteFeedback(id: $id) {
      id
    }
  }
`

interface Props {
  feedback: NonNullable<FindFeedbackById['feedback']>
}

const Feedback = ({ feedback }: Props) => {
  const [deleteFeedback] = useMutation(DELETE_FEEDBACK_MUTATION, {
    onCompleted: () => {
      toast.success('Feedback deleted')
      navigate(routes.feedbacks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteFeedbackMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete feedback ' + id + '?')) {
      deleteFeedback({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Feedback {feedback.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{feedback.id}</td>
            </tr>
            <tr>
              <th>Subject</th>
              <td>{feedback.subject}</td>
            </tr>
            <tr>
              <th>Feedback</th>
              <td>{feedback.feedback}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{feedback.slug}</td>
            </tr>
            <tr>
              <th>Author id</th>
              <td>{feedback.authorId}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{formatEnum(feedback.status)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(feedback.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(feedback.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFeedback({ id: feedback.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(feedback.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Feedback
