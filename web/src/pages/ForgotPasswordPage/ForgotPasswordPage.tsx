import { useEffect, useRef, useTransition } from 'react'

import { validateEmail } from 'api/src/lib/validation'

import { Form, Label, TextField, Submit, FieldError } from '@cedarjs/forms'
import { navigate, routes } from '@cedarjs/router'
import { Metadata } from '@cedarjs/web'
import { toast, Toaster } from '@cedarjs/web/toast'

import { useAuth } from 'src/auth'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef?.current?.focus()
  }, [])

  const onSubmit = async (data: { email: string }) => {
    startTransition(async () => {
      const response = await forgotPassword(data.email)

      if (response.error) {
        toast.error(response.error)
      } else {
        toast.success(
          'A link to reset your password was sent to ' + response.email
        )
        navigate(routes.login())
      }
    })
  }

  return (
    <>
      <Metadata title="Forgot Password" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Forgot Password
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <Label
                      name="email"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Email
                    </Label>
                    <TextField
                      name="email"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      ref={emailRef}
                      validation={{
                        required: {
                          value: true,
                          message: 'Email is required',
                        },
                        validate: (value) => {
                          const validation = validateEmail(value)
                          return validation.valid || validation.error
                        },
                      }}
                    />

                    <FieldError name="email" className="rw-field-error" />
                  </div>

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Submit</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
