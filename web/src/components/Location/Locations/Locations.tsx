import { Trash } from 'lucide-react'
import type {
  DeleteLocationMutation,
  DeleteLocationMutationVariables,
  FindLocations,
} from 'types/graphql'

import { Link, routes } from '@cedarjs/router'
import { useMutation } from '@cedarjs/web'
import type { TypedDocumentNode } from '@cedarjs/web'
import { toast } from '@cedarjs/web/toast'

import { QUERY } from 'src/components/Location/LocationsCell'
import { Badge } from 'src/components/ui/badge'
import { Button } from 'src/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  // ItemMedia,
  ItemTitle,
} from 'src/components/ui/item'
import {
  checkboxInputTag,
  formatEnum,
  timeTag,
  truncate,
} from 'src/lib/formatters.js'
import { getLocationTypeVariant, uppercaseFirst } from 'src/lib/utils'

const DELETE_LOCATION_MUTATION: TypedDocumentNode<
  DeleteLocationMutation,
  DeleteLocationMutationVariables
> = gql`
  mutation DeleteLocationMutation($id: String!) {
    deleteLocation(id: $id) {
      id
    }
  }
`

const LocationsList = ({ locations }: FindLocations) => {
  const [deleteLocation] = useMutation(DELETE_LOCATION_MUTATION, {
    onCompleted: () => {
      toast.success('Location deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (location: (typeof locations)[0]) => {
    if (
      confirm('Delete Location: ' + location.name + ' (' + location.type + ')?')
    ) {
      deleteLocation({ variables: { id: location.id } })
    }
  }

  const activeLocations = locations.filter((loc) => loc.isActive)
  const inactiveLocations = locations.filter((loc) => !loc.isActive)

  const LocationItem = ({
    location,
    muted = false,
  }: {
    location: (typeof locations)[0]
    muted?: boolean
  }) => (
    <Item key={location.id} variant={muted ? 'muted' : 'default'}>
      <ItemContent>
        <ItemTitle className="flex items-center gap-4 text-xl">
          {truncate(uppercaseFirst(location.name))}
          <Badge variant={getLocationTypeVariant(location.type)}>
            {formatEnum(location.type)}
          </Badge>
        </ItemTitle>
        <ItemDescription>
          {truncate(uppercaseFirst(location.description))}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button asChild variant="blue">
          <Link
            to={routes.editLocation({ id: location.id })}
            title={'Edit location ' + location.id}
          >
            Edit
          </Link>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDeleteClick(location)}
        >
          <Trash />
        </Button>
      </ItemActions>
    </Item>
  )

  return (
    <div className="space-y-8">
      {activeLocations.length > 0 && (
        <div className="rw-segment">
          <h2 className="text-lg font-semibold mb-2">Active Locations</h2>
          <div className="space-y-1">
            {activeLocations.map((location) => (
              <LocationItem key={location.id} location={location} />
            ))}
          </div>
        </div>
      )}

      {inactiveLocations.length > 0 && (
        <div className="rw-segment">
          <h2 className="text-lg font-semibold mb-4">Inactive Locations</h2>
          <div className="space-y-2">
            {inactiveLocations.map((location) => (
              <LocationItem key={location.id} location={location} muted />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LocationsList
