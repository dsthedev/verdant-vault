import type { EditLocationById, UpdateLocationInput } from 'types/graphql'

import type { RWGqlError } from '@cedarjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  CheckboxField,
  NumberField,
  Submit,
} from '@cedarjs/forms'

type FormLocation = NonNullable<EditLocationById['location']>

interface LocationFormProps {
  location?: EditLocationById['location']
  onSave: (data: UpdateLocationInput, id?: FormLocation['id']) => void
  error: RWGqlError
  loading: boolean
}

const LocationForm = (props: LocationFormProps) => {
  const onSubmit = (data: FormLocation) => {
    props.onSave(data, props?.location?.id)
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

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="location-type-0"
            name="type"
            defaultValue="SHELF"
            defaultChecked={props.location?.type?.includes('SHELF')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Shelf</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="location-type-1"
            name="type"
            defaultValue="BIN"
            defaultChecked={props.location?.type?.includes('BIN')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Bin</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="location-type-2"
            name="type"
            defaultValue="BACKROOM"
            defaultChecked={props.location?.type?.includes('BACKROOM')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Backroom</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="location-type-3"
            name="type"
            defaultValue="GREENHOUSE"
            defaultChecked={props.location?.type?.includes('GREENHOUSE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Greenhouse</div>
        </div>

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.location?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="isActive"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is active
        </Label>

        <CheckboxField
          name="isActive"
          defaultChecked={props.location?.isActive}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isActive" className="rw-field-error" />

        <Label
          name="createdById"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Created by id
        </Label>

        <NumberField
          name="createdById"
          defaultValue={props.location?.createdById}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="createdById" className="rw-field-error" />

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
