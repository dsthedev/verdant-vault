import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@cedarjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'foo4460039@bar.com',
        updatedAt: '2026-02-25T00:04:09.015Z',
      },
    },
    two: {
      data: {
        email: 'foo6895443@bar.com',
        updatedAt: '2026-02-25T00:04:09.015Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
