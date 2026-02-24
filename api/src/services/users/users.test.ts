import type { User } from '@prisma/client'

import { users, user, createUser, updateUser, deleteUser } from './users.js'
import type { StandardScenario } from './users.scenarios.js'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://cedarjs.com/docs/testing#testing-services
// https://cedarjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async () => {
    const result = await createUser({
      input: {
        email: 'foo7239623@bar.com',
        updatedAt: '2026-02-24T20:40:16.834Z',
      },
    })

    expect(result.email).toEqual('foo7239623@bar.com')
    expect(result.updatedAt).toEqual(new Date('2026-02-24T20:40:16.834Z'))
  })

  scenario('updates a user', async (scenario: StandardScenario) => {
    const original = (await user({ id: scenario.user.one.id })) as User
    const result = await updateUser({
      id: original.id,
      input: { email: 'foo6766608@bar.com2' },
    })

    expect(result.email).toEqual('foo6766608@bar.com2')
  })

  scenario('deletes a user', async (scenario: StandardScenario) => {
    const original = (await deleteUser({ id: scenario.user.one.id })) as User
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
