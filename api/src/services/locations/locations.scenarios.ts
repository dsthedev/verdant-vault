import type { Prisma, Location } from '@prisma/client'

import type { ScenarioData } from '@cedarjs/testing/api'

export const standard = defineScenario<Prisma.LocationCreateArgs>({
  location: {
    one: {
      data: {
        name: 'String',
        type: 'SHELF',
        updatedAt: '2026-02-25T00:02:41.293Z',
        createdBy: {
          create: {
            email: 'foo8059502@bar.com',
            updatedAt: '2026-02-25T00:02:41.296Z',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        type: 'SHELF',
        updatedAt: '2026-02-25T00:02:41.296Z',
        createdBy: {
          create: {
            email: 'foo4027899@bar.com',
            updatedAt: '2026-02-25T00:02:41.298Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Location, 'location'>
