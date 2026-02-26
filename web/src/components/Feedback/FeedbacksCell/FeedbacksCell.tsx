import type { FindFeedbacks, FindFeedbacksVariables } from 'types/graphql'

import { Link, routes } from '@cedarjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@cedarjs/web'

import { useAuth } from 'src/auth'
import Feedbacks from 'src/components/Feedback/Feedbacks'
import GuestFeedbacks from 'src/components/Feedback/Feedbacks/GuestFeedbacks'

export const QUERY: TypedDocumentNode<FindFeedbacks, FindFeedbacksVariables> =
  gql`
    query FindFeedbacks {
      feedbacks {
        id
        subject
        feedback
        slug
        authorId
        status
        createdAt
        updatedAt
        author {
          id
          email
        }
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No feedbacks yet.{' '}
      <Link to={routes.newFeedback()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindFeedbacks>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  feedbacks,
}: CellSuccessProps<FindFeedbacks, FindFeedbacksVariables>) => {
  const { currentUser } = useAuth()
  const isAdmin = currentUser?.roles?.includes('admin')

  return isAdmin ? (
    <Feedbacks feedbacks={feedbacks} />
  ) : (
    <GuestFeedbacks feedbacks={feedbacks} />
  )
}
