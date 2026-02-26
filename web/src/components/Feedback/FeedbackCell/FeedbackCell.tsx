import type { FindFeedbackById, FindFeedbackByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@cedarjs/web'

import Feedback from 'src/components/Feedback/Feedback'

export const QUERY: TypedDocumentNode<
  FindFeedbackById,
  FindFeedbackByIdVariables
> = gql`
  query FindFeedbackById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Feedback not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindFeedbackByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  feedback,
}: CellSuccessProps<FindFeedbackById, FindFeedbackByIdVariables>) => {
  return <Feedback feedback={feedback} />
}
