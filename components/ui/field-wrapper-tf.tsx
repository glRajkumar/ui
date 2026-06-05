'use client'

import { createFormHookContexts, createFormHook } from '@tanstack/react-form'

import {
  OTPWrapper as OTP,
  InputWrapper as Input,
  RadioWrapper as Radio,
  SwitchWrapper as Switch,
  SelectWrapper as Select,
  SliderWrapper as Slider,
  NumberWrapper as NumberInput,
  TextareaWrapper as Textarea,
  CheckboxWrapper as Checkbox,
  ComboboxWrapper as Combobox,
  DatePickerWrapper as DatePicker,
  InputGroupWrapper as InputGroup,
  AutocompleteWrapper as Autocomplete,
} from './field-wrapper'

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

type inputFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'onBlur'
> & {
  label?: React.ReactNode
}
function InputField(props: inputFieldProps) {
  const field = useFieldContext<string>()

  return (
    <Input
      {...props}
      name={field.name}
      value={field.state.value ?? ''}
      onChange={e => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type textareaFieldProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange' | 'onBlur'
> & {
  label?: React.ReactNode
}
function TextareaField(props: textareaFieldProps) {
  const field = useFieldContext<string>()

  return (
    <Textarea
      {...props}
      name={field.name}
      value={field.state.value ?? ''}
      onChange={e => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type radioFieldProps = {
  label?: React.ReactNode
  items: (allowedPrimitiveT | itemT)[]
  className?: string
}
function RadioField(props: radioFieldProps) {
  const field = useFieldContext<allowedPrimitiveT>()

  return (
    <Radio
      {...props}
      name={field.name}
      value={field.state.value}
      onValueChange={value => field.handleChange(value)}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

function CheckboxField(props: radioFieldProps) {
  const field = useFieldContext<allowedPrimitiveT[]>()

  return (
    <Checkbox
      {...props}
      name={field.name}
      value={field.state.value ?? []}
      onValueChange={value => field.handleChange(value)}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type switchFieldProps = {
  label?: React.ReactNode
  className?: string
}
function SwitchField(props: switchFieldProps) {
  const field = useFieldContext<boolean>()

  return (
    <Switch
      {...props}
      name={field.name}
      checked={field.state.value ?? false}
      onCheckedChange={checked => field.handleChange(checked)}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type selectFieldProps = Omit<
  React.ComponentProps<typeof Select>,
  'name' | 'value' | 'onValueChange' | 'error' | 'invalid'
>
function SelectField(props: selectFieldProps) {
  const field = useFieldContext<allowedPrimitiveT>()

  return (
    <Select
      {...props}
      name={field.name}
      value={field.state.value}
      onValueChange={value => field.handleChange(value)}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type datePickerFieldProps = Omit<
  React.ComponentProps<typeof DatePicker>,
  'name' | 'value' | 'onSelect' | 'error' | 'invalid'
> & {
  label?: React.ReactNode
}
function DatePickerField(props: datePickerFieldProps) {
  const field = useFieldContext<Date | undefined>()

  return (
    <DatePicker
      {...props}
      name={field.name}
      value={field.state.value}
      onSelect={date => field.handleChange(date)}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type comboboxFieldProps = Omit<
  React.ComponentProps<typeof Combobox>,
  'name' | 'value' | 'onValueChange' | 'error' | 'invalid'
>
function ComboboxField(props: comboboxFieldProps) {
  const field = useFieldContext<allowedPrimitiveT | allowedPrimitiveT[]>()

  return (
    <Combobox
      {...props}
      name={field.name}
      value={field.state.value}
      onValueChange={value => field.handleChange(value as allowedPrimitiveT | allowedPrimitiveT[])}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type numberFieldProps = Omit<
  React.ComponentProps<typeof NumberInput>,
  'name' | 'value' | 'onValueChange' | 'error' | 'invalid'
> & { label?: React.ReactNode }
function NumberField(props: numberFieldProps) {
  const field = useFieldContext<number | null>()

  return (
    <NumberInput
      {...props}
      name={field.name}
      value={field.state.value}
      onValueChange={val => field.handleChange(val)}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type sliderFieldProps = Omit<
  React.ComponentProps<typeof Slider>,
  'name' | 'value' | 'onValueChange' | 'error' | 'invalid'
> & { label?: React.ReactNode }
function SliderField(props: sliderFieldProps) {
  const field = useFieldContext<number | number[]>()

  return (
    <Slider
      {...props}
      name={field.name}
      value={field.state.value}
      onValueChange={val => field.handleChange(val as number | number[])}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type autocompleteFieldProps = Omit<
  React.ComponentProps<typeof Autocomplete>,
  'name' | 'value' | 'onValueChange' | 'error' | 'invalid'
> & { label?: React.ReactNode }
function AutocompleteField(props: autocompleteFieldProps) {
  const field = useFieldContext<string>()

  return (
    <Autocomplete
      {...props}
      name={field.name}
      value={field.state.value ?? ''}
      onValueChange={val => field.handleChange(val)}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type otpFieldProps = Omit<
  React.ComponentProps<typeof OTP>,
  'name' | 'value' | 'onValueChange' | 'error' | 'invalid'
> & { label?: React.ReactNode }
function OTPField(props: otpFieldProps) {
  const field = useFieldContext<string>()

  return (
    <OTP
      {...props}
      name={field.name}
      value={field.state.value ?? ''}
      onValueChange={value => field.handleChange(value)}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type inputGroupFieldProps = Omit<
  React.ComponentProps<typeof InputGroup>,
  'name' | 'value' | 'onChange' | 'onBlur' | 'error' | 'invalid'
> & { label?: React.ReactNode }
function InputGroupField(props: inputGroupFieldProps) {
  const field = useFieldContext<string>()

  return (
    <InputGroup
      {...props}
      name={field.name}
      value={field.state.value ?? ''}
      onChange={e => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    TextareaField,
    RadioField,
    CheckboxField,
    SwitchField,
    SelectField,
    DatePickerField,
    ComboboxField,
    NumberField,
    SliderField,
    AutocompleteField,
    OTPField,
    InputGroupField,
  },
  formComponents: {},
})
