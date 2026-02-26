import { Mail, User } from 'lucide-react'

import { Link, routes } from '@cedarjs/router'

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from 'src/components/ui/item'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip'
import { formatDate } from 'src/lib/formatters.js'

const GuestFeedbacks = ({ feedbacks }: any) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Feedbacks</h2>

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
        <div className="space-y-2">
          {feedbacks.map((feedback: any) => (
            <Item key={feedback.id}>
              <ItemMedia>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                        <User className="w-5 h-5 text-blue-600" />
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
                <div className="text-xs">{formatDate(feedback.updatedAt)}</div>
                <div className="text-xs font-medium text-gray-700 mt-1">
                  {feedback.status &&
                    feedback.status.charAt(0).toUpperCase() +
                      feedback.status.slice(1).replace('_', ' ')}
                </div>
              </div>
              <ItemActions className="flex gap-2">
                <Link
                  to={routes.editFeedback({ id: feedback.id })}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </Link>
              </ItemActions>
            </Item>
          ))}
        </div>
      )}
    </div>
  )
}

export default GuestFeedbacks
