import { Mailer } from '@cedarjs/mailer-core'
import { NodemailerMailHandler } from '@cedarjs/mailer-handler-nodemailer'
import { ReactEmailRenderer } from '@cedarjs/mailer-renderer-react-email'

import { logger } from 'src/lib/logger'

export const mailer = new Mailer({
  handling: {
    handlers: {
      nodemailer: new NodemailerMailHandler({
        transport: {
          host: process.env.BREVO_SMTP_URL,
          port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.BREVO_SENDER_EMAIL,
            pass: process.env.BREVO_SMTP_KEY,
          },
        },
      }),
    },
    default: 'nodemailer',
  },

  rendering: {
    renderers: {
      reactEmail: new ReactEmailRenderer(),
    },
    default: 'reactEmail',
  },

  defaults: {
    from: `${process.env.BREVO_SENDER_NAME} <${process.env.BREVO_SENDER_EMAIL}>`,
  },

  development: {
    handler: 'nodemailer',
  },

  logger,
})
