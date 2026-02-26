import type {
  DeleteFeedbackMutation,
  DeleteFeedbackMutationVariables,
  FindFeedbacks,
} from 'types/graphql'

import { Link, routes } from '@cedarjs/router'
import { useMutation } from '@cedarjs/web'
import type { TypedDocumentNode } from '@cedarjs/web'
import { toast } from '@cedarjs/web/toast'

import { QUERY } from 'src/components/Feedback/FeedbacksCell'
import { Button } from 'src/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table'
import { formatDate, formatEnum } from 'src/lib/formatters.js'

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

const GuestFeedbacksList = ({ feedbacks }: FindFeedbacks) => {
  const [deleteFeedback] = useMutation(DELETE_FEEDBACK_MUTATION, {
    onCompleted: () => {
      toast.success('Feedback deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteFeedbackMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete feedback ' + id + '?')) {
      deleteFeedback({ variables: { id } })
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Feedback</h2>

      {feedbacks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No feedbacks yet.{' '}
          <Link
            to={routes.newFeedback()}
            className="text-blue-500 hover:text-blue-700"
          >
            Create one?
          </Link>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell className="font-medium">
                  {feedback.subject || 'No subject'}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {feedback.feedback}
                </TableCell>
                <TableCell>{formatEnum(feedback.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Link
                      to={routes.editFeedback({ id: feedback.id })}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 text-sm"
                      onClick={() => onDeleteClick(feedback.id)}
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default GuestFeedbacksList
