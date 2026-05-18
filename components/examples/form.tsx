'use client'

import { useState } from 'react'

import { ExRow, ExItem } from '@/components/examples/common'
import {
  InputWrapper,
  TextareaWrapper,
  SelectWrapper,
  RadioWrapper,
  SwitchWrapper,
  DatePickerWrapper,
  ComboboxWrapper,
} from '@/components/ui/field-wrapper'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

const countryOptions = [
  { value: 'in', label: 'India' },
  { value: 'us', label: 'USA' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
]

type ProfileForm = {
  name: string
  email: string
  bio: string
  country: allowedPrimitiveT
  role: allowedPrimitiveT
  newsletter: boolean
  dob: Date | undefined
}

type ProfileErrors = Partial<Record<keyof ProfileForm, { message: string }>>

function ProfileFormExample() {
  const [values, setValues] = useState<ProfileForm>({
    name: '',
    email: '',
    bio: '',
    country: '',
    role: '',
    newsletter: false,
    dob: undefined,
  })
  const [errors, setErrors] = useState<ProfileErrors>({})

  function validate(): ProfileErrors {
    const e: ProfileErrors = {}
    if (!values.name.trim()) e.name = { message: 'Name is required' }
    if (!values.email.trim()) e.email = { message: 'Email is required' }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = { message: 'Enter a valid email' }
    if (!values.country) e.country = { message: 'Select a country' }
    if (!values.role) e.role = { message: 'Select a role' }
    return e
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      console.log('Submitted:', values)
    }
  }

  function set<K extends keyof ProfileForm>(key: K, val: ProfileForm[K]) {
    setValues(prev => ({ ...prev, [key]: val }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  return (
    <Form onSubmit={handleSubmit} className="w-80 gap-4">
      <InputWrapper
        name="name"
        label="Full name"
        value={values.name}
        onChange={e => set('name', e.target.value)}
        error={errors.name}
        invalid={!!errors.name}
      />
      <InputWrapper
        name="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={e => set('email', e.target.value)}
        error={errors.email}
        invalid={!!errors.email}
      />
      <TextareaWrapper
        name="bio"
        label="Bio"
        value={values.bio}
        onChange={e => set('bio', e.target.value)}
      />
      <SelectWrapper
        name="country"
        label="Country"
        options={countryOptions}
        value={values.country}
        onValueChange={val => set('country', val)}
        error={errors.country}
        invalid={!!errors.country}
      />
      <RadioWrapper
        name="role"
        label="Role"
        options={['Admin', 'Editor', 'Viewer']}
        value={values.role}
        onValueChange={val => set('role', val)}
        error={errors.role}
        invalid={!!errors.role}
      />
      <DatePickerWrapper
        name="dob"
        label="Date of birth"
        value={values.dob}
        onSelect={date => set('dob', date)}
      />
      <SwitchWrapper
        name="newsletter"
        label="Subscribe to newsletter"
        checked={values.newsletter}
        onCheckedChange={val => set('newsletter', val)}
      />
      <Button type="submit">Save profile</Button>
    </Form>
  )
}

type SignupForm = {
  username: string
  email: string
  password: string
  skills: allowedPrimitiveT[]
}

type SignupErrors = Partial<Record<keyof SignupForm, { message: string }>>

function SignupFormExample() {
  const [values, setValues] = useState<SignupForm>({
    username: '',
    email: '',
    password: '',
    skills: [],
  })
  const [errors, setErrors] = useState<SignupErrors>({})

  function validate(): SignupErrors {
    const e: SignupErrors = {}
    if (!values.username.trim()) e.username = { message: 'Username is required' }
    else if (values.username.length < 3) e.username = { message: 'Min 3 characters' }
    if (!values.email.trim()) e.email = { message: 'Email is required' }
    if (!values.password) e.password = { message: 'Password is required' }
    else if (values.password.length < 8) e.password = { message: 'Min 8 characters' }
    return e
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      console.log('Signed up:', values)
    }
  }

  function set<K extends keyof SignupForm>(key: K, val: SignupForm[K]) {
    setValues(prev => ({ ...prev, [key]: val }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  return (
    <Form onSubmit={handleSubmit} className="w-80 gap-4">
      <InputWrapper
        name="username"
        label="Username"
        value={values.username}
        onChange={e => set('username', e.target.value)}
        error={errors.username}
        invalid={!!errors.username}
      />
      <InputWrapper
        name="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={e => set('email', e.target.value)}
        error={errors.email}
        invalid={!!errors.email}
      />
      <InputWrapper
        name="password"
        label="Password"
        type="password"
        value={values.password}
        onChange={e => set('password', e.target.value)}
        error={errors.password}
        invalid={!!errors.password}
      />
      <ComboboxWrapper
        multiple
        name="skills"
        label="Skills"
        items={['React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Rust']}
        value={values.skills}
        onValueChange={val => set('skills', val as allowedPrimitiveT[])}
      />
      <Button type="submit">Create account</Button>
    </Form>
  )
}

export function FormExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Profile form">
        <ExItem label="Full form — all wrapper types, client-side validation on submit">
          <ProfileFormExample />
        </ExItem>
      </ExRow>

      <ExRow label="Signup form">
        <ExItem label="Signup — field-level validation, error clears on change">
          <SignupFormExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
