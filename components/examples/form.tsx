"use client"

import { FormProvider, useForm } from "react-hook-form"

import {
  InputWrapper,
  RadioWrapper,
  SelectWrapper,
  TextareaWrapper,
  ComboboxWrapper,
  CheckboxWrapper,
  DatePickerWrapper,
  MultiSelectComboboxWrapper,
} from "@/components/ui/form-wrapper";
import { Button } from "@/components/ui/button";

export function FormExample() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      gender: "",
      interest: [],
      country: "",
      fruit: "",
      hobbies: [],
      dob: undefined,
    },
  })

  const genderOptions = ["male", "female", "other"]
  const interestOptions = ["Book reading", "Music", "TV", "Movie"]

  const countryOptions = [
    { value: "in", label: "India" },
    { value: "us", label: "USA" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ]

  const fruitOptions = [
    "Apple",
    "Banana",
    "Mango",
    "Grapes",
    { value: "berry", label: "Blueberry" },
  ]

  const hobbiesOptions = [
    "Music",
    "Sports",
    "Travel",
    { value: "coding", label: "Coding" },
    "Gaming",
  ]

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((d) => console.log(d))}
        className="space-y-6 my-8 w-96"
      >
        <InputWrapper
          name="name"
          label="Full Name"
          control={form.control}
        />

        <TextareaWrapper
          name="description"
          label="Description"
          control={form.control}
        />

        <RadioWrapper
          name="gender"
          label="Gender"
          control={form.control}
          options={genderOptions}
        />

        <CheckboxWrapper
          name="interest"
          label="Interest"
          control={form.control}
          options={interestOptions}
        />

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
          options={fruitOptions}
        />

        <MultiSelectComboboxWrapper
          name="hobbies"
          label="Hobbies"
          control={form.control}
          options={hobbiesOptions}
        />

        <DatePickerWrapper
          name="dob"
          label="Date of Birth"
          control={form.control}
        />

        <Button type="submit">
          Submit
        </Button>
      </form>
    </FormProvider>
  )
}
