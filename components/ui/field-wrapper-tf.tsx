'use client'

import { type ComponentProps } from 'react'
import { createFormHookContexts, createFormHook, type AppFieldExtendedReactFormApi } from '@tanstack/react-form'

import { type multiSelectComboboxProps, type comboboxProps } from './combobox'
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
  MultiSelectComboboxWrapper as MultiSelectCombobox,
} from './field-wrapper'

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

type inputFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onBlur'> & {
  label?: React.ReactNode
}
function InputField(props: inputFieldProps) {
  const field = useFieldContext<string>()

  return (
    <Input
      {...props}
      name={field.name}
      value={field.state.value ?? ''}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      error={
        field.state.meta.errors.length > 0
          ? { message: field.state.meta.errors[0] }
          : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type textareaFieldProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'onBlur'> & {
  label?: React.ReactNode
}
function TextareaField(props: textareaFieldProps) {
  const field = useFieldContext<string>()

  return (
    <Textarea
      {...props}
      name={field.name}
      value={field.state.value ?? ''}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      error={
        field.state.meta.errors.length > 0
          ? { message: field.state.meta.errors[0] }
          : undefined
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
      onValueChange={(value) => field.handleChange(value)}
      error={
        field.state.meta.errors.length > 0
          ? { message: field.state.meta.errors[0] }
          : undefined
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
      onValueChange={(value) => field.handleChange(value)}
      error={
        field.state.meta.errors.length > 0
          ? { message: field.state.meta.errors[0] }
          : undefined
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
      onCheckedChange={(checked) => field.handleChange(checked)}
      error={
        field.state.meta.errors.length > 0
          ? { message: field.state.meta.errors[0] }
          : undefined
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
      onValueChange={(value) => field.handleChange(value)}
      error={
        field.state.meta.errors.length > 0
          ? { message: field.state.meta.errors[0] }
          : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type datePickerFieldProps = Omit<React.ComponentProps<typeof DatePicker>, 'name' | 'value' | 'onSelect' | 'error' | 'invalid'> & {
  label?: React.ReactNode
}
function DatePickerField(props: datePickerFieldProps) {
  const field = useFieldContext<Date>()

  return (
    <DatePicker
      {...props}
      name={field.name}
      value={field.state.value}
      onSelect={(date) => field.handleChange(date as Date)}
      error={
        field.state.meta.errors.length > 0
          ? { message: field.state.meta.errors[0] }
          : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type comboboxFieldProps = Omit<comboboxProps, 'value' | 'onValueChange' | 'name'> & {
  label?: React.ReactNode
}
function ComboboxField(props: comboboxFieldProps) {
  const field = useFieldContext<allowedPrimitiveT>()

  return (
    <Combobox
      {...props}
      name={field.name}
      value={field.state.value}
      onValueChange={(value) => field.handleChange(value)}
      error={
        field.state.meta.errors.length > 0
          ? { message: field.state.meta.errors[0] }
          : undefined
      }
      invalid={field.state.meta.errors.length > 0}
    />
  )
}

type multiSelectComboboxFieldProps = Omit<multiSelectComboboxProps, 'value' | 'onValueChange' | 'name'> & {
  label?: React.ReactNode
}
function MultiSelectComboboxField(props: multiSelectComboboxFieldProps) {
  const field = useFieldContext<allowedPrimitiveT[]>()

  return (
    <MultiSelectCombobox
      {...props}
      name={field.name}
      value={field.state.value ?? []}
      onValueChange={(value) => field.handleChange(value)}
      error={
        field.state.meta.errors.length > 0
          ? { message: field.state.meta.errors[0] }
          : undefined
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
    MultiSelectComboboxField,
  },
  formComponents: {},
})

type AnyFormApi = AppFieldExtendedReactFormApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any>

type AppFieldPropsWithoutName = Omit<
  ComponentProps<AnyFormApi['AppField']>,
  'children' | 'name'
>

type BaseProps<TFormData, TName extends keyof TFormData> = {
  form: AnyFormApi
  name: TName
  appFieldProps?: AppFieldPropsWithoutName
}

type InputProps<TFormData, TName extends keyof TFormData> = BaseProps<TFormData, TName> & inputFieldProps
export function InputWrapper<TFormData, TName extends keyof TFormData>({
  form,
  name,
  appFieldProps,
  ...fieldProps
}: InputProps<TFormData, TName>) {
  return (
    <form.AppField name={name} {...appFieldProps}>
      {(field: any) => <field.InputField {...fieldProps} />}
    </form.AppField>
  )
}

type TextareaProps<TFormData, TName extends keyof TFormData> = BaseProps<TFormData, TName> & textareaFieldProps
export function TextareaWrapper<TFormData, TName extends keyof TFormData>({
  form,
  name,
  appFieldProps,
  ...fieldProps
}: TextareaProps<TFormData, TName>) {
  return (
    <form.AppField name={name} {...appFieldProps}>
      {(field: any) => <field.TextareaField {...fieldProps} />}
    </form.AppField>
  )
}

type RadioProps<TFormData, TName extends keyof TFormData> = BaseProps<TFormData, TName> & radioFieldProps
export function RadioWrapper<TFormData, TName extends keyof TFormData>({
  form,
  name,
  appFieldProps,
  ...fieldProps
}: RadioProps<TFormData, TName>) {
  return (
    <form.AppField name={name} {...appFieldProps}>
      {(field: any) => <field.RadioField {...fieldProps} />}
    </form.AppField>
  )
}

type CheckboxProps<TFormData, TName extends keyof TFormData> = BaseProps<TFormData, TName> & radioFieldProps
export function CheckboxWrapper<TFormData, TName extends keyof TFormData>({
  form,
  name,
  appFieldProps,
  ...fieldProps
}: CheckboxProps<TFormData, TName>) {
  return (
    <form.AppField name={name} {...appFieldProps}>
      {(field: any) => <field.CheckboxField {...fieldProps} />}
    </form.AppField>
  )
}

type SwitchProps<TFormData, TName extends keyof TFormData> = BaseProps<TFormData, TName> & switchFieldProps
export function SwitchWrapper<TFormData, TName extends keyof TFormData>({
  form,
  name,
  appFieldProps,
  ...fieldProps
}: SwitchProps<TFormData, TName>) {
  return (
    <form.AppField name={name} {...appFieldProps}>
      {(field: any) => <field.SwitchField {...fieldProps} />}
    </form.AppField>
  )
}

type SelectProps<TFormData, TName extends keyof TFormData> = BaseProps<TFormData, TName> & selectFieldProps
export function SelectWrapper<TFormData, TName extends keyof TFormData>({
  form,
  name,
  appFieldProps,
  ...fieldProps
}: SelectProps<TFormData, TName>) {
  return (
    <form.AppField name={name} {...appFieldProps}>
      {(field: any) => <field.SelectField {...fieldProps} />}
    </form.AppField>
  )
}

type DatePickerProps<TFormData, TName extends keyof TFormData> = BaseProps<TFormData, TName> & datePickerFieldProps
export function DatePickerWrapper<TFormData, TName extends keyof TFormData>({
  form,
  name,
  appFieldProps,
  ...fieldProps
}: DatePickerProps<TFormData, TName>) {
  return (
    <form.AppField name={name} {...appFieldProps}>
      {(field: any) => <field.DatePickerField {...fieldProps} />}
    </form.AppField>
  )
}

type ComboboxProps<TFormData, TName extends keyof TFormData> = BaseProps<TFormData, TName> & comboboxFieldProps
export function ComboboxWrapper<TFormData, TName extends keyof TFormData>({
  form,
  name,
  appFieldProps,
  ...fieldProps
}: ComboboxProps<TFormData, TName>) {
  return (
    <form.AppField name={name} {...appFieldProps}>
      {(field: any) => <field.ComboboxField {...fieldProps} />}
    </form.AppField>
  )
}


type MultiSelectComboboxProps<TFormData, TName extends keyof TFormData> = BaseProps<TFormData, TName> & multiSelectComboboxFieldProps
export function MultiSelectComboboxWrapper<TFormData, TName extends keyof TFormData>({
  form,
  name,
  appFieldProps,
  ...fieldProps
}: MultiSelectComboboxProps<TFormData, TName>) {
  return (
    <form.AppField name={name} {...appFieldProps}>
      {(field: any) => <field.MultiSelectComboboxField {...fieldProps} />}
    </form.AppField>
  )
}