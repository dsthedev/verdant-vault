import { Mail, Trash2, User } from 'lucide-react'
import type {
  DeleteFeedbackMutation,
  DeleteFeedbackMutationVariables,
  FindFeedbacks,
  UpdateFeedbackMutation,
  UpdateFeedbackMutationVariables,
} from 'types/graphql'

import { Link, routes } from '@cedarjs/router'
import { useMutation } from '@cedarjs/web'
import type { TypedDocumentNode } from '@cedarjs/web'
import { toast } from '@cedarjs/web/toast'

import { QUERY } from 'src/components/Feedback/FeedbacksCell'
import { Button } from 'src/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from 'src/components/ui/item'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'src/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip'
import { formatDate } from 'src/lib/formatters.js'

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

const UPDATE_FEEDBACK_STATUS_MUTATION: TypedDocumentNode<
  UpdateFeedbackMutation,
  UpdateFeedbackMutationVariables
> = gql`
  mutation UpdateFeedbackStatusMutation(
    $id: Int!
    $input: UpdateFeedbackInput!
  ) {
    updateFeedback(id: $id, input: $input) {
      id
      status
    }
  }
`

const FeedbacksList = ({ feedbacks }: FindFeedbacks) => {
  const [deleteFeedback] = useMutation(DELETE_FEEDBACK_MUTATION, {
    onCompleted: () => {
      toast.success('Feedback deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const [updateFeedback] = useMutation(UPDATE_FEEDBACK_STATUS_MUTATION, {
    onCompleted: () => {
      toast.success('Status updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteFeedbackMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete feedback ' + id + '?')) {
      deleteFeedback({ variables: { id } })
    }
  }

  const onDeleteAll = () => {
    feedbacks.forEach((feedback) => {
      deleteFeedback({ variables: { id: feedback.id } })
    })
  }

  const onStatusChange = (
    id: UpdateFeedbackMutationVariables['id'],
    status: string
  ) => {
    updateFeedback({
      variables: {
        id,
        input: { status: status as any },
      },
    })
  }

  const groupedByStatus = {
    unassigned: feedbacks.filter((f) => f.status === 'unassigned'),
    in_progress: feedbacks.filter((f) => f.status === 'in_progress'),
    complete: feedbacks.filter((f) => f.status === 'complete'),
  }

  const renderFeedbackItem = (feedback: any) => (
    <Item key={feedback.id}>
      <ItemMedia>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{feedback.author?.email || 'Unknown'}</span>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{feedback.subject || 'No subject'}</ItemTitle>
        <ItemDescription>{feedback.feedback}</ItemDescription>
      </ItemContent>
      <div className="flex flex-col text-xs text-gray-500 gap-1">
        <div>{formatDate(feedback.createdAt)}</div>
        <div>{formatDate(feedback.updatedAt)}</div>
      </div>
      <ItemActions className="flex gap-2">
        <Select
          value={feedback.status}
          onValueChange={(value) => onStatusChange(feedback.id, value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
          </SelectContent>
        </Select>
        <Link
          to={routes.editFeedback({ id: feedback.id })}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </Link>
        <button
          onClick={() => onDeleteClick(feedback.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </ItemActions>
    </Item>
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Feedback</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="destructive" disabled={feedbacks.length === 0}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete All
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="space-y-4">
              <div className="text-sm font-medium">
                Are you sure you want to delete all feedback? This action cannot
                be undone.
              </div>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm" onClick={onDeleteAll}>
                  Delete All
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {feedbacks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No feedbacks yet.</div>
      ) : (
        <Tabs defaultValue="unassigned" className="w-full">
          <TabsList>
            <TabsTrigger value="unassigned">
              Unassigned ({groupedByStatus.unassigned.length})
            </TabsTrigger>
            <TabsTrigger value="in_progress">
              In Progress ({groupedByStatus.in_progress.length})
            </TabsTrigger>
            <TabsTrigger value="complete">
              Complete ({groupedByStatus.complete.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="unassigned" className="space-y-2">
            {groupedByStatus.unassigned.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No unassigned feedbacks
              </div>
            ) : (
              groupedByStatus.unassigned.map(renderFeedbackItem)
            )}
          </TabsContent>

          <TabsContent value="in_progress" className="space-y-2">
            {groupedByStatus.in_progress.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No in progress feedbacks
              </div>
            ) : (
              groupedByStatus.in_progress.map(renderFeedbackItem)
            )}
          </TabsContent>

          <TabsContent value="complete" className="space-y-2">
            {groupedByStatus.complete.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No completed feedbacks
              </div>
            ) : (
              groupedByStatus.complete.map(renderFeedbackItem)
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

export default FeedbacksList
