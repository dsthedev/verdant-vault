export const schema = gql`
  type Feedback {
    id: Int!
    subject: String
    feedback: String!
    slug: String
    authorId: Int!
    status: FeedbackStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
    author: User!
  }

  enum FeedbackStatus {
    unassigned
    in_progress
    complete
  }

  type Query {
    feedbacks: [Feedback!]! @requireAuth
    feedback(id: Int!): Feedback @requireAuth
  }

  input CreateFeedbackInput {
    subject: String
    feedback: String!
    slug: String
    status: FeedbackStatus!
  }

  input UpdateFeedbackInput {
    subject: String
    feedback: String
    slug: String
    status: FeedbackStatus
  }

  type Mutation {
    createFeedback(input: CreateFeedbackInput!): Feedback! @requireAuth
    updateFeedback(id: Int!, input: UpdateFeedbackInput!): Feedback!
      @requireAuth
    deleteFeedback(id: Int!): Feedback! @requireAuth
  }
`
