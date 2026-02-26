import type { Feedback } from '@prisma/client'

import {
  feedbacks,
  feedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from './feedbacks.js'
import type { StandardScenario } from './feedbacks.scenarios.js'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://cedarjs.com/docs/testing#testing-services
// https://cedarjs.com/docs/testing#jest-expect-type-considerations

describe('feedbacks', () => {
  scenario('returns all feedbacks', async (scenario: StandardScenario) => {
    const result = await feedbacks()

    expect(result.length).toEqual(Object.keys(scenario.feedback).length)
  })

  scenario('returns a single feedback', async (scenario: StandardScenario) => {
    const result = await feedback({ id: scenario.feedback.one.id })

    expect(result).toEqual(scenario.feedback.one)
  })

  scenario('creates a feedback', async (scenario: StandardScenario) => {
    const result = await createFeedback({
      input: {
        feedback: 'String',
        authorId: scenario.feedback.two.authorId,
        updatedAt: '2026-02-26T20:12:04.602Z',
      },
    })

    expect(result.feedback).toEqual('String')
    expect(result.authorId).toEqual(scenario.feedback.two.authorId)
    expect(result.updatedAt).toEqual(new Date('2026-02-26T20:12:04.602Z'))
  })

  scenario('updates a feedback', async (scenario: StandardScenario) => {
    const original = (await feedback({
      id: scenario.feedback.one.id,
    })) as Feedback
    const result = await updateFeedback({
      id: original.id,
      input: { feedback: 'String2' },
    })

    expect(result.feedback).toEqual('String2')
  })

  scenario('deletes a feedback', async (scenario: StandardScenario) => {
    const original = (await deleteFeedback({
      id: scenario.feedback.one.id,
    })) as Feedback
    const result = await feedback({ id: original.id })

    expect(result).toEqual(null)
  })
})
