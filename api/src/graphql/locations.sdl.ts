export const schema = gql`
  type Location {
    id: String!
    name: String!
    type: LocationType!
    description: String
    isActive: Boolean!
    createdById: Int!
    createdBy: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum LocationType {
    SHELF
    BIN
    BACKROOM
    GREENHOUSE
  }

  type Query {
    locations: [Location!]! @requireAuth
    location(id: String!): Location @requireAuth
  }

  input CreateLocationInput {
    name: String!
    type: LocationType!
    description: String
    isActive: Boolean!
    createdById: Int!
  }

  input UpdateLocationInput {
    name: String
    type: LocationType
    description: String
    isActive: Boolean
    createdById: Int
  }

  type Mutation {
    createLocation(input: CreateLocationInput!): Location! @requireAuth
    updateLocation(id: String!, input: UpdateLocationInput!): Location!
      @requireAuth
    deleteLocation(id: String!): Location! @requireAuth
  }
`
