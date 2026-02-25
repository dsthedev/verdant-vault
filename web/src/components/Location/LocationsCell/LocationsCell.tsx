import type { FindLocations, FindLocationsVariables } from 'types/graphql'

import { Link, routes } from '@cedarjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@cedarjs/web'

import Locations from 'src/components/Location/Locations'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card'

export const QUERY: TypedDocumentNode<FindLocations, FindLocationsVariables> =
  gql`
    query FindLocations {
      locations {
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

export const Empty = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>No Locations Yet</CardTitle>
        <CardDescription>
          Locations are labeled containers and designated places where your
          plants are stored and organized.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Create your first location to start organizing your plant collection.
          Examples include greenhouses, shelves, rooms, or outdoor garden beds.
        </p>
      </CardContent>
      <CardFooter>
        <Link
          to={routes.newLocation()}
          className="rw-button rw-button-green text-sm"
        >
          <div className="rw-button-icon">+</div> New Location
        </Link>
      </CardFooter>
    </Card>
  )
}

export const Failure = ({ error }: CellFailureProps<FindLocations>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  locations,
}: CellSuccessProps<FindLocations, FindLocationsVariables>) => {
  return <Locations locations={locations} />
}
