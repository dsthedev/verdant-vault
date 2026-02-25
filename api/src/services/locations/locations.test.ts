import type { Location } from '@prisma/client'

import {
  locations,
  location,
  createLocation,
  updateLocation,
  deleteLocation,
} from './locations.js'
import type { StandardScenario } from './locations.scenarios.js'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://cedarjs.com/docs/testing#testing-services
// https://cedarjs.com/docs/testing#jest-expect-type-considerations

describe('locations', () => {
  scenario('returns all locations', async (scenario: StandardScenario) => {
    const result = await locations()

    expect(result.length).toEqual(Object.keys(scenario.location).length)
  })

  scenario('returns a single location', async (scenario: StandardScenario) => {
    const result = await location({ id: scenario.location.one.id })

    expect(result).toEqual(scenario.location.one)
  })

  scenario('creates a location', async (scenario: StandardScenario) => {
    const result = await createLocation({
      input: {
        name: 'String',
        type: 'SHELF',
        createdById: scenario.location.two.createdById,
        updatedAt: '2026-02-25T00:02:41.275Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.type).toEqual('SHELF')
    expect(result.createdById).toEqual(scenario.location.two.createdById)
    expect(result.updatedAt).toEqual(new Date('2026-02-25T00:02:41.275Z'))
  })

  scenario('updates a location', async (scenario: StandardScenario) => {
    const original = (await location({
      id: scenario.location.one.id,
    })) as Location
    const result = await updateLocation({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a location', async (scenario: StandardScenario) => {
    const original = (await deleteLocation({
      id: scenario.location.one.id,
    })) as Location
    const result = await location({ id: original.id })

    expect(result).toEqual(null)
  })
})
