import { useState } from 'react'

import { Check, X } from 'lucide-react'
import type { EditLocationById, UpdateLocationInput } from 'types/graphql'

import type { RWGqlError } from '@cedarjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  Submit,
  SelectField,
} from '@cedarjs/forms'

import { Button } from 'src/components/ui/button'
import { Toggle } from 'src/components/ui/toggle'

type FormLocation = NonNullable<EditLocationById['location']>

interface LocationFormProps {
  location?: EditLocationById['location']
  onSave: (data: UpdateLocationInput, id?: FormLocation['id']) => void
  error: RWGqlError
  loading: boolean
}

const LocationForm = (props: LocationFormProps) => {
  const [isActive, setIsActive] = useState(props.location?.isActive ?? true)

  const onSubmit = (data: FormLocation) => {
    props.onSave({ ...data, isActive }, props?.location?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormLocation> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label
              name="name"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Name
            </Label>

            <TextField
              name="name"
              defaultValue={props.location?.name}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />

            <FieldError name="name" className="rw-field-error" />
          </div>

          <div>
            <Label
              name="type"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Type
            </Label>

            <SelectField
              name="type"
              defaultValue={props.location?.type}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            >
              <option value="">Select a type</option>
              <option value="SHELF">Shelf</option>
              <option value="BIN">Bin</option>
              <option value="BACKROOM">Backroom</option>
              <option value="GREENHOUSE">Greenhouse</option>
            </SelectField>

            <FieldError name="type" className="rw-field-error" />
          </div>
        </div>

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextAreaField
          name="description"
          defaultValue={props.location?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          rows={4}
        />

        <FieldError name="description" className="rw-field-error" />

        <div className="flex items-center gap-3">
          <Label
            name="isActive"
            className="nrw-label m-0 hidden"
            errorClassName="nrw-label rw-label-error m-0 hidden"
          >
            Active
          </Label>

          <Toggle
            pressed={isActive}
            onPressedChange={setIsActive}
            aria-label="Toggle active status"
          >
            {isActive ? <Check className="size-4" /> : <X className="size-4" />}
            {`${isActive ? 'Active' : 'Inactive'}`}
          </Toggle>
        </div>

        <FieldError name="isActive" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default LocationForm
