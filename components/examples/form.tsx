'use client'

import { useState } from 'react'

import { ExRow, ExItem } from '@/components/examples/common'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldNativeError } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function CustomValidateExample() {
  return (
    <Form
      className="w-64 gap-4"
      validationMode="onChange"
      onFormSubmit={values => console.log('Submitted:', values)}
    >
      <Field
        name="username"
        validate={val => {
          if (!val) return 'Required'
          if ((val as string).length < 3) return 'Min 3 characters'
          if (/\s/.test(val as string)) return 'No spaces allowed'
          return null
        }}
      >
        <FieldLabel>Username</FieldLabel>
        <Input name="username" placeholder="Pick a username" />
        <FieldNativeError />
      </Field>
      <Button type="submit" size="sm">Submit</Button>
    </Form>
  )
}

function NativeRequiredExample() {
  return (
    <Form className="w-64 gap-4" onFormSubmit={values => console.log('Submitted:', values)}>
      <FieldGroup>
        <Field name="email">
          <FieldLabel>Email</FieldLabel>
          <Input name="email" type="email" placeholder="user@example.com" required />
          <FieldNativeError match="valueMissing">Email is required</FieldNativeError>
          <FieldNativeError match="typeMismatch">Enter a valid email</FieldNativeError>
        </Field>
        <Field name="password">
          <FieldLabel>Password</FieldLabel>
          <Input name="password" type="password" placeholder="••••••••" required minLength={8} />
          <FieldNativeError match="valueMissing">Password is required</FieldNativeError>
          <FieldNativeError match="tooShort">At least 8 characters</FieldNativeError>
        </Field>
      </FieldGroup>
      <Button type="submit" size="sm">Sign up</Button>
    </Form>
  )
}

function ServerErrorsExample() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({ email: 'This email is already registered.' })
    setSubmitted(true)
  }

  return (
    <Form errors={errors} onSubmit={handleSubmit} className="w-64 gap-4">
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input
          name="email"
          type="email"
          placeholder="user@example.com"
          onChange={() => setErrors({})}
        />
        <FieldNativeError />
      </Field>
      <Button type="submit" size="sm">
        {submitted ? 'Try again' : 'Submit'}
      </Button>
    </Form>
  )
}

function ImperativeValidationExample() {
  const actionsRef = { current: null } as React.MutableRefObject<{ validate: () => void } | null>

  return (
    <Form
      className="w-64 gap-4"
      actionsRef={actionsRef}
      validationMode="onSubmit"
      onFormSubmit={values => console.log('Submitted:', values)}
    >
      <FieldGroup>
        <Field
          name="code"
          validate={val => {
            if (!val) return 'Required'
            if ((val as string).length !== 6) return 'Must be exactly 6 digits'
            if (!/^\d+$/.test(val as string)) return 'Digits only'
            return null
          }}
        >
          <FieldLabel>Verification code</FieldLabel>
          <FieldDescription>Enter the 6-digit code from your authenticator app.</FieldDescription>
          <Input name="code" placeholder="000000" maxLength={6} />
          <FieldNativeError />
        </Field>
      </FieldGroup>
      <div className="flex gap-2">
        <Button type="submit" size="sm">Verify</Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => actionsRef.current?.validate()}
        >
          Validate now
        </Button>
      </div>
    </Form>
  )
}

export function FormExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Native validation">
        <ExItem label="Custom validate — onChange, revalidates as user types">
          <CustomValidateExample />
        </ExItem>
        <ExItem label="HTML constraints — required, type, minLength with match-based errors">
          <NativeRequiredExample />
        </ExItem>
      </ExRow>

      <ExRow label="Server errors">
        <ExItem label="errors prop — server-returned errors displayed via FieldNativeError; clears on change">
          <ServerErrorsExample />
        </ExItem>
      </ExRow>

      <ExRow label="Imperative">
        <ExItem label="actionsRef — trigger validate() programmatically without submitting">
          <ImperativeValidationExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
