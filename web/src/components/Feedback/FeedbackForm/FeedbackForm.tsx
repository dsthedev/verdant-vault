import { useEffect, useState } from 'react'

import type { EditFeedbackById, UpdateFeedbackInput } from 'types/graphql'

import type { RWGqlError } from '@cedarjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label as CedarLabel,
  TextField,
  TextAreaField,
} from '@cedarjs/forms'

import { useAuth } from 'src/auth'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select'
import { Textarea } from 'src/components/ui/textarea'

type FormFeedback = NonNullable<EditFeedbackById['feedback']>

interface FeedbackFormProps {
  feedback?: EditFeedbackById['feedback']
  onSave: (data: UpdateFeedbackInput, id?: FormFeedback['id']) => void
  error: RWGqlError
  loading: boolean
  initialSubject?: string
  initialFeedback?: string
  onFormChange?: (subject: string, feedback: string) => void
}

const generateSlugFromPath = (path: string): string => {
  return (
    path
      .split('/')
      .filter(Boolean)
      .pop()
      ?.toLowerCase()
      .replace(/[^\w-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || ''
  )
}

const FeedbackForm = (props: FeedbackFormProps) => {
  const { currentUser } = useAuth()
  const [generatedSlug, setGeneratedSlug] = useState('')
  const [statusValue, setStatusValue] = useState(
    props.feedback?.status || 'unassigned'
  )
  const [subjectValue, setSubjectValue] = useState(
    props.feedback?.subject || props.initialSubject || ''
  )
  const [feedbackValue, setFeedbackValue] = useState(
    props.feedback?.feedback || props.initialFeedback || ''
  )
  const isAdmin = currentUser?.roles?.includes('admin')

  useEffect(() => {
    const slug = generateSlugFromPath(window.location.pathname)
    setGeneratedSlug(slug)
  }, [])

  useEffect(() => {
    setStatusValue(props.feedback?.status || 'unassigned')
  }, [props.feedback?.status])

  useEffect(() => {
    setSubjectValue(props.feedback?.subject || props.initialSubject || '')
    setFeedbackValue(props.feedback?.feedback || props.initialFeedback || '')
  }, [props.initialSubject, props.initialFeedback, props.feedback])

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSubjectValue(value)
    props.onFormChange?.(value, feedbackValue)
  }

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setFeedbackValue(value)
    props.onFormChange?.(subjectValue, value)
  }

  const onSubmit = (data: FormFeedback) => {
    props.onSave(data, props?.feedback?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormFeedback> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <div className="mb-4">
          <CedarLabel
            name="subject"
            className="mb-2 block text-sm font-medium leading-none"
          >
            Subject
          </CedarLabel>

          <Input asChild className="w-full">
            <TextField
              name="subject"
              defaultValue={
                props.feedback?.subject || props.initialSubject || ''
              }
              onChange={handleSubjectChange}
            />
          </Input>

          <FieldError name="subject" className="mt-1 text-sm text-red-500" />
        </div>

        <div className="mb-4">
          <CedarLabel
            name="feedback"
            className="mb-2 block text-sm font-medium leading-none"
          >
            Feedback
          </CedarLabel>

          <Textarea asChild className="w-full">
            <TextAreaField
              name="feedback"
              defaultValue={
                props.feedback?.feedback || props.initialFeedback || ''
              }
              validation={{ required: true }}
              onChange={handleFeedbackChange}
            />
          </Textarea>

          <FieldError name="feedback" className="mt-1 text-sm text-red-500" />
        </div>

        <div className={isAdmin ? 'mb-4' : 'hidden'}>
          <CedarLabel
            name="slug"
            className="mb-2 block text-sm font-medium leading-none"
          >
            Slug
          </CedarLabel>

          <Input asChild className="w-full">
            <TextField
              name="slug"
              defaultValue={props.feedback?.slug || generatedSlug}
              readOnly
            />
          </Input>

          <FieldError name="slug" className="mt-1 text-sm text-red-500" />
        </div>

        <div className={isAdmin ? 'mb-4' : 'hidden'}>
          <CedarLabel
            name="status"
            className="mb-2 block text-sm font-medium leading-none"
          >
            Status
          </CedarLabel>

          <Select value={statusValue} onValueChange={setStatusValue}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
            </SelectContent>
          </Select>

          <TextField
            name="status"
            defaultValue={statusValue}
            className="hidden"
          />

          <FieldError name="status" className="mt-1 text-sm text-red-500" />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="green"
            size="lg"
            type="submit"
            disabled={props.loading}
          >
            {props.feedback?.id ? 'Update' : 'Send'}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default FeedbackForm
