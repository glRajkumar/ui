'use client'

import { AtSignIcon } from 'lucide-react'

import { InputGroupText } from '@/components/ui/input-group'
import { useAppForm } from '@/components/ui/field-wrapper-tf'
import { Button } from '@/components/ui/button'

type FormData = {
  firstName: string
  lastName: string
  email: string
  age: number
  bio: string
  country: string
  hobbies: string[]
  newsletter: boolean
  role: string
  birthDate: Date
  quantity: number | null
  volume: number[]
  otp: string
  username: string
}

const defaultValues: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  bio: '',
  country: '',
  hobbies: [],
  newsletter: false,
  role: '',
  birthDate: new Date(),
  quantity: null,
  volume: [50],
  otp: '',
  username: '',
}

export function Field_TF_Example() {
  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value)
    },
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-4 max-w-md mx-auto p-6"
    >
      <form.AppField
        name="firstName"
        validators={{
          onChange: ({ value }) =>
            value.length < 2 ? 'First name must be at least 2 characters' : undefined,
        }}
      >
        {field => <field.InputField label="First Name" placeholder="Enter your first name" />}
      </form.AppField>

      <form.AppField name="lastName">
        {field => <field.InputField label="Last Name" placeholder="Enter your last name" />}
      </form.AppField>

      <form.AppField
        name="email"
        validators={{
          onChange: ({ value }) =>
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : undefined,
        }}
      >
        {field => <field.InputField label="Email" type="email" placeholder="Enter your email" />}
      </form.AppField>

      <form.AppField name="age">
        {field => <field.InputField label="Age" type="number" placeholder="Enter your age" />}
      </form.AppField>

      <form.AppField name="bio">
        {field => <field.TextareaField label="Bio" placeholder="Tell us about yourself" rows={4} />}
      </form.AppField>

      <form.AppField name="country">
        {field => (
          <field.SelectField
            label="Country"
            options={['USA', 'UK', 'Canada', 'Australia', 'India']}
            placeholder="Select your country"
          />
        )}
      </form.AppField>

      <form.AppField name="role">
        {field => (
          <field.RadioField label="Role" options={['Developer', 'Designer', 'Manager', 'Other']} />
        )}
      </form.AppField>

      <form.AppField name="hobbies">
        {field => (
          <field.CheckboxField
            label="Hobbies"
            options={['Reading', 'Gaming', 'Sports', 'Music', 'Travel']}
          />
        )}
      </form.AppField>

      <form.AppField name="newsletter">
        {field => <field.SwitchField label="Subscribe to newsletter" />}
      </form.AppField>

      <form.AppField name="birthDate">
        {field => <field.DatePickerField label="Birth Date" />}
      </form.AppField>

      <form.AppField
        name="quantity"
        validators={{
          onChange: ({ value }) =>
            value !== null && value < 0 ? 'Quantity must be 0 or more' : undefined,
        }}
      >
        {field => <field.NumberField label="Quantity" min={0} step={1} />}
      </form.AppField>

      <form.AppField name="volume">
        {field => <field.SliderField label="Volume" min={0} max={100} />}
      </form.AppField>

      <form.AppField
        name="otp"
        validators={{
          onChange: ({ value }) =>
            value.length > 0 && value.length < 6 ? 'Enter all 6 digits' : undefined,
        }}
      >
        {field => <field.OTPField label="Verification Code" length={6} separator />}
      </form.AppField>

      <form.AppField name="username">
        {field => (
          <field.InputGroupField
            label="Username"
            placeholder="username"
            addonStart={<InputGroupText><AtSignIcon /></InputGroupText>}
          />
        )}
      </form.AppField>

      <form.Subscribe
        selector={state => ({ isSubmitting: state.isSubmitting, canSubmit: state.canSubmit })}
      >
        {({ isSubmitting, canSubmit }) => (
          <Button type="submit" disabled={isSubmitting || !canSubmit}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
