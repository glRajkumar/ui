'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { AtSignIcon } from 'lucide-react'

import {
  OTPWrapper,
  InputWrapper,
  RadioWrapper,
  SelectWrapper,
  SwitchWrapper,
  NumberWrapper,
  SliderWrapper,
  TextareaWrapper,
  ComboboxWrapper,
  CheckboxWrapper,
  DatePickerWrapper,
  InputGroupWrapper,
} from '@/components/ui/field-wrapper-rhf'
import { InputGroupText } from '@/components/ui/input-group'
import { Button } from '@/components/ui/button'

export function Field_RHF_Example() {
  const form = useForm({
    defaultValues: {
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
    },
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

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(d => console.log(d))} className="space-y-6 my-8 w-96">
        <InputWrapper name="name" label="Full Name" control={form.control} />

        <TextareaWrapper name="description" label="Description" control={form.control} />

        <RadioWrapper name="gender" label="Gender" control={form.control} options={genderOptions} />

        <CheckboxWrapper
          name="interest"
          label="Interest"
          control={form.control}
          options={interestOptions}
        />

        <SwitchWrapper name="isCompleted" label="Is completed" control={form.control} />

        <SelectWrapper
          name="country"
          label="Country"
          control={form.control}
          options={countryOptions}
        />

        <ComboboxWrapper
          name="fruit"
          label="Favorite Fruit"
          control={form.control}
          items={fruitOptions}
        />

        <ComboboxWrapper
          multiple
          name="hobbies"
          label="Hobbies"
          control={form.control}
          items={hobbiesOptions}
        />

        <DatePickerWrapper name="dob" label="Date of Birth" control={form.control} />

        <NumberWrapper name="quantity" label="Quantity" control={form.control} min={0} step={1} />

        <SliderWrapper name="volume" label="Volume" control={form.control} min={0} max={100} />

        <OTPWrapper name="otp" label="Verification Code" control={form.control} length={6} separator />

        <InputGroupWrapper
          name="username"
          label="Username"
          control={form.control}
          placeholder="username"
          addonStart={<InputGroupText><AtSignIcon /></InputGroupText>}
        />

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}
