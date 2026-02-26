import type { Prisma, Feedback } from '@prisma/client'

import type { ScenarioData } from '@cedarjs/testing/api'

export const standard = defineScenario<Prisma.FeedbackCreateArgs>({
  feedback: {
    one: {
      data: {
        feedback: 'String',
        updatedAt: '2026-02-26T20:12:04.626Z',
        author: {
          create: {
            email: 'foo2794412@bar.com',
            updatedAt: '2026-02-26T20:12:04.630Z',
          },
        },
      },
    },
    two: {
      data: {
        feedback: 'String',
        updatedAt: '2026-02-26T20:12:04.630Z',
        author: {
          create: {
            email: 'foo5344499@bar.com',
            updatedAt: '2026-02-26T20:12:04.633Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Feedback, 'feedback'>
