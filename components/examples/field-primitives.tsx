'use client'

import { useState } from 'react'

import { ExRow, ExItem } from '@/components/examples/common'
import {
  InputWrapper,
  TextareaWrapper,
  RadioWrapper,
  CheckboxWrapper,
  SwitchWrapper,
  SelectWrapper,
  DatePickerWrapper,
  ComboboxWrapper,
} from '@/components/ui/field-wrapper'

const countryOptions = [
  { value: 'in', label: 'India' },
  { value: 'us', label: 'USA' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
]

const fruitOptions = ['Apple', 'Banana', 'Mango', { value: 'berry', label: 'Blueberry' }]

const roleOptions = ['Admin', 'Editor', 'Viewer']

const tagOptions = ['Design', 'Engineering', 'Marketing', 'Sales']

function InputExamples() {
  return (
    <div className="flex flex-wrap gap-6">
      <InputWrapper name="text" label="Username" placeholder="Enter username" />
      <InputWrapper name="email" label="Email" type="email" placeholder="user@example.com" />
      <InputWrapper name="password" label="Password" type="password" placeholder="••••••••" />
    </div>
  )
}

function TextareaExample() {
  return (
    <TextareaWrapper name="bio" label="Bio" placeholder="Tell us about yourself" className="w-64" />
  )
}

function RadioExample() {
  const [value, setValue] = useState<allowedPrimitiveT>('Editor')

  return (
    <RadioWrapper
      name="role"
      label="Role"
      options={roleOptions}
      value={value}
      onValueChange={setValue}
      className="w-64"
    />
  )
}

function CheckboxExample() {
  const [values, setValues] = useState<allowedPrimitiveT[]>(['Design'])

  return (
    <CheckboxWrapper
      name="tags"
      label="Tags"
      options={tagOptions}
      value={values}
      onValueChange={setValues}
      className="w-72"
    />
  )
}

function SwitchExample() {
  const [checked, setChecked] = useState(false)

  return (
    <SwitchWrapper
      name="notifications"
      label="Email notifications"
      checked={checked}
      onCheckedChange={setChecked}
      className="w-64"
    />
  )
}

function SelectExample() {
  const [value, setValue] = useState<allowedPrimitiveT>('')

  return (
    <SelectWrapper
      name="country"
      label="Country"
      options={countryOptions}
      value={value}
      onValueChange={setValue}
      className="w-64"
    />
  )
}

function ComboboxSingleExample() {
  const [value, setValue] = useState<allowedPrimitiveT>('')

  return (
    <ComboboxWrapper
      name="fruit"
      label="Favorite fruit"
      items={fruitOptions}
      value={value}
      onValueChange={val => setValue(val as allowedPrimitiveT)}
      className="w-64"
    />
  )
}

function ComboboxMultiExample() {
  const [values, setValues] = useState<allowedPrimitiveT[]>([])

  return (
    <ComboboxWrapper
      multiple
      name="hobbies"
      label="Hobbies"
      items={['Music', 'Sports', 'Travel', 'Gaming', 'Reading']}
      value={values}
      onValueChange={val => setValues(val as allowedPrimitiveT[])}
      className="w-64"
    />
  )
}

function DatePickerExample() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <DatePickerWrapper
      name="dob"
      label="Date of birth"
      value={date}
      onSelect={setDate}
      className="w-64"
    />
  )
}

function ErrorStateExamples() {
  return (
    <div className="flex flex-wrap gap-6">
      <InputWrapper
        name="err-email"
        label="Email"
        type="email"
        value="notanemail"
        invalid
        error={{ message: 'Enter a valid email address' }}
        className="w-64"
        readOnly
      />
      <SelectWrapper
        name="err-country"
        label="Country"
        options={countryOptions}
        invalid
        error={{ message: 'Please select a country' }}
        className="w-64"
      />
      <RadioWrapper
        name="err-role"
        label="Role"
        options={roleOptions}
        invalid
        error={{ message: 'Please select a role' }}
        className="w-64"
      />
    </div>
  )
}

export function FieldPrimitivesExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Text">
        <ExItem label="Input — text, email, password variants">
          <InputExamples />
        </ExItem>
        <ExItem label="Textarea — multiline text input">
          <TextareaExample />
        </ExItem>
      </ExRow>

      <ExRow label="Choice">
        <ExItem label="Radio — single selection from options">
          <RadioExample />
        </ExItem>
        <ExItem label="Checkbox — multiple selection from options">
          <CheckboxExample />
        </ExItem>
        <ExItem label="Switch — boolean toggle">
          <SwitchExample />
        </ExItem>
      </ExRow>

      <ExRow label="Select">
        <ExItem label="Select — dropdown single selection">
          <SelectExample />
        </ExItem>
        <ExItem label="Combobox — searchable single selection">
          <ComboboxSingleExample />
        </ExItem>
        <ExItem label="Combobox multiple — searchable multi-selection">
          <ComboboxMultiExample />
        </ExItem>
      </ExRow>

      <ExRow label="Date">
        <ExItem label="DatePicker — calendar date selection">
          <DatePickerExample />
        </ExItem>
      </ExRow>

      <ExRow label="Error state">
        <ExItem label="invalid + error prop — destructive label, border, message">
          <ErrorStateExamples />
        </ExItem>
      </ExRow>
    </div>
  )
}
