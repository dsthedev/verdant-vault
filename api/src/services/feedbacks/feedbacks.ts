import type {
  QueryResolvers,
  MutationResolvers,
  FeedbackRelationResolvers,
} from 'types/graphql'

import { context } from '@cedarjs/graphql-server'

import { db } from 'src/lib/db'

export const feedbacks: QueryResolvers['feedbacks'] = () => {
  const isAdmin = context.currentUser?.roles?.includes('admin')

  if (isAdmin) {
    return db.feedback.findMany()
  }

  return db.feedback.findMany({ where: { authorId: context.currentUser?.id } })
}

export const feedback: QueryResolvers['feedback'] = ({ id }) => {
  const isAdmin = context.currentUser?.roles?.includes('admin')

  if (isAdmin) {
    return db.feedback.findUnique({ where: { id } })
  }

  return db.feedback.findUnique({
    where: { id, authorId: context.currentUser?.id },
  })
}

export const createFeedback: MutationResolvers['createFeedback'] = ({
  input,
}) => {
  return db.feedback.create({
    data: {
      ...input,
      authorId: context.currentUser?.id,
    },
  })
}

export const updateFeedback: MutationResolvers['updateFeedback'] = ({
  id,
  input,
}) => {
  const isAdmin = context.currentUser?.roles?.includes('admin')

  const where = isAdmin ? { id } : { id, authorId: context.currentUser?.id }

  return db.feedback.update({
    data: input,
    where,
  })
}

export const deleteFeedback: MutationResolvers['deleteFeedback'] = ({ id }) => {
  const isAdmin = context.currentUser?.roles?.includes('admin')

  const where = isAdmin ? { id } : { id, authorId: context.currentUser?.id }

  return db.feedback.delete({
    where,
  })
}

export const Feedback: FeedbackRelationResolvers = {
  author: (_obj, { root }) => {
    return db.feedback.findUnique({ where: { id: root?.id } }).author()
  },
}
