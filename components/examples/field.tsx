'use client'

import { useState } from 'react'
import { AtSignIcon } from 'lucide-react'

import {
  InputWrapper,
  RadioWrapper,
  SelectWrapper,
  SwitchWrapper,
  TextareaWrapper,
  ComboboxWrapper,
  CheckboxWrapper,
  DatePickerWrapper,
  NumberWrapper,
  SliderWrapper,
  OTPWrapper,
  InputGroupWrapper,
} from '@/components/ui/field-wrapper'
import { InputGroupText } from '@/components/ui/input-group'
import { Button } from '@/components/ui/button'

export function FieldExample() {
  const [value, setValue] = useState({
    name: '',
    description: '',
    gender: '',
    interest: [],
    country: '',
    fruit: '',
    hobbies: [],
    dob: undefined,
    isCompleted: false,
    quantity: null as number | null,
    volume: [50] as number[],
    otp: '',
    username: '',
  })

  const genderOptions = ['male', 'female', 'other']
  const interestOptions = ['Book reading', 'Music', 'TV', 'Movie']

  const countryOptions = [
    { value: 'in', label: 'India' },
    { value: 'us', label: 'USA' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]

  const fruitOptions = [
    'Apple',
    'Banana',
    'Mango',
    'Grapes',
    { value: 'berry', label: 'Blueberry' },
  ]

  const hobbiesOptions = [
    'Music',
    'Sports',
    'Travel',
    { value: 'coding', label: 'Coding' },
    'Gaming',
  ]

  function onChange(key: string, value: allowedPrimitiveT | allowedPrimitiveT[]) {
    setValue(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  function onSubit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(value)
  }

  return (
    <form onSubmit={onSubit} className="space-y-6 my-8 w-96">
      <InputWrapper
        name="name"
        label="Full Name"
        value={value.name}
        onChange={e => onChange('name', e.target.value)}
      />

      <TextareaWrapper
        name="description"
        label="Description"
        value={value.description}
        onChange={e => onChange('description', e.target.value)}
      />

      <RadioWrapper
        name="gender"
        label="Gender"
        value={value.gender}
        options={genderOptions}
        onValueChange={val => onChange('gender', val)}
      />

      <CheckboxWrapper
        name="interest"
        label="Interest"
        value={value.interest}
        options={interestOptions}
        onValueChange={val => onChange('interest', val)}
      />

      <SwitchWrapper
        name="isCompleted"
        label="Is completed"
        checked={value.isCompleted}
        onCheckedChange={val => onChange('isCompleted', val)}
      />

      <SelectWrapper
        name="country"
        label="Country"
        value={value.country}
        options={countryOptions}
        onValueChange={val => onChange('country', val)}
      />

      <DatePickerWrapper
        name="dob"
        label="Date of Birth"
        value={value.dob}
        onSelect={val => onChange('dob', val?.toISOString() || '')}
      />

      <ComboboxWrapper
        name="fruit"
        label="Favorite Fruit"
        value={value.fruit}
        items={fruitOptions}
        onValueChange={val => onChange('fruit', val as any)}
      />

      <ComboboxWrapper
        multiple
        name="hobbies"
        label="Hobbies"
        value={value.hobbies}
        items={hobbiesOptions}
        onValueChange={val => onChange('hobbies', val as any)}
      />

      <NumberWrapper
        name="quantity"
        label="Quantity"
        value={value.quantity}
        onValueChange={val => setValue(prev => ({ ...prev, quantity: val }))}
        min={0}
        step={1}
      />

      <SliderWrapper
        name="volume"
        label="Volume"
        value={value.volume}
        onValueChange={val => setValue(prev => ({ ...prev, volume: val as number[] }))}
        min={0}
        max={100}
      />

      <OTPWrapper
        name="otp"
        label="Verification Code"
        length={6}
        separator
        value={value.otp}
        onValueChange={val => setValue(prev => ({ ...prev, otp: val }))}
      />

      <InputGroupWrapper
        name="username"
        label="Username"
        placeholder="username"
        value={value.username}
        onChange={e => setValue(prev => ({ ...prev, username: e.target.value }))}
        addonStart={<InputGroupText><AtSignIcon /></InputGroupText>}
      />

      <Button type="submit">Submit</Button>
    </form>
  )
}
