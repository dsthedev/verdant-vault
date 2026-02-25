import type {
  EditLocationById,
  UpdateLocationInput,
  UpdateLocationMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@cedarjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@cedarjs/web'
import { useMutation } from '@cedarjs/web'
import { toast } from '@cedarjs/web/toast'

import LocationForm from 'src/components/Location/LocationForm'

export const QUERY: TypedDocumentNode<EditLocationById> = gql`
  query EditLocationById($id: String!) {
    location: location(id: $id) {
      id
      name
      type
      description
      isActive
      createdById
      createdAt
      updatedAt
    }
  }
`

const UPDATE_LOCATION_MUTATION: TypedDocumentNode<
  EditLocationById,
  UpdateLocationMutationVariables
> = gql`
  mutation UpdateLocationMutation($id: String!, $input: UpdateLocationInput!) {
    updateLocation(id: $id, input: $input) {
      id
      name
      type
      description
      isActive
      createdById
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ location }: CellSuccessProps<EditLocationById>) => {
  const [updateLocation, { loading, error }] = useMutation(
    UPDATE_LOCATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Location updated')
        navigate(routes.locations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateLocationInput,
    id: EditLocationById['location']['id']
  ) => {
    updateLocation({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Editing <strong className="text-xl">{location?.name}</strong>
        </h2>
      </header>
      <div className="rw-segment-main">
        <LocationForm
          location={location}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
