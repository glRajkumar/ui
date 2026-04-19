'use client'

import { createFormHookContexts, createFormHook } from '@tanstack/react-form'

import { type ComboboxWrapperProps } from './combobox'
import { type selectProps } from './select'

import {
  InputWrapper as Input,
  TextareaWrapper as Textarea,
  RadioWrapper as Radio,
  CheckboxWrapper as Checkbox,
  SwitchWrapper as Switch,
  SelectWrapper as Select,
  DatePickerWrapper as DatePicker,
  ComboboxWrapper as Combobox,
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
  options: (allowedPrimitiveT | optionT)[]
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

type selectFieldProps = Omit<selectProps, 'value' | 'onValueChange'> & {
  label?: React.ReactNode
}
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
  const field = useFieldContext<Date>()

  return (
    <DatePicker
      {...props}
      name={field.name}
      value={field.state.value}
      onSelect={date => field.handleChange(date as Date)}
      error={
        field.state.meta.errors.length > 0 ? { message: field.state.meta.errors[0] } : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type comboboxFieldProps = ComboboxWrapperProps & {
  label?: React.ReactNode
}
function ComboboxField(props: comboboxFieldProps) {
  const field = useFieldContext<allowedPrimitiveT>()

  return (
    <Combobox
      {...props}
      name={field.name}
      value={field.state.value}
      onValueChange={value => field.handleChange(value as any)}
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
  },
  formComponents: {},
})
