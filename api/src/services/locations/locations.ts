import type {
  QueryResolvers,
  MutationResolvers,
  LocationRelationResolvers,
} from 'types/graphql'

import { context } from '@cedarjs/graphql-server'

import { db } from 'src/lib/db'

export const locations: QueryResolvers['locations'] = () => {
  return db.location.findMany({
    where: { createdById: context.currentUser?.id },
  })
}

export const location: QueryResolvers['location'] = ({ id }) => {
  return db.location.findUnique({
    where: { id, createdById: context.currentUser?.id },
  })
}

export const createLocation: MutationResolvers['createLocation'] = ({
  input,
}) => {
  return db.location.create({
    data: {
      ...input,
      createdById: context.currentUser?.id,
    },
  })
}

export const updateLocation: MutationResolvers['updateLocation'] = ({
  id,
  input,
}) => {
  return db.location.update({
    data: input,
    where: { id, createdById: context.currentUser?.id },
  })
}

export const deleteLocation: MutationResolvers['deleteLocation'] = ({ id }) => {
  return db.location.delete({
    where: { id, createdById: context.currentUser?.id },
  })
}

export const Location: LocationRelationResolvers = {
  createdBy: (_obj, { root }) => {
    return db.location.findUnique({ where: { id: root?.id } }).createdBy()
  },
}
