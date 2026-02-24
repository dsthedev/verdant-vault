import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@cedarjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'foo1737799@bar.com',
        updatedAt: '2026-02-24T20:40:16.849Z',
      },
    },
    two: {
      data: {
        email: 'foo9024756@bar.com',
        updatedAt: '2026-02-24T20:40:16.849Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
