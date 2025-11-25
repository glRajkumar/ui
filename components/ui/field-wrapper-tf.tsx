"use client";

import { ReactNode } from 'react';

import {
  InputWrapper,
  TextareaWrapper,
  RadioWrapper,
  CheckboxWrapper,
  SwitchWrapper,
  SelectWrapper,
  DatePickerWrapper,
  ComboboxWrapper,
  MultiSelectComboboxWrapper
} from "./field-wrapper";

type BaseFieldProps<TFormData, TName extends keyof TFormData> = {
  form: any
  name: TName
  label?: ReactNode
  className?: string
}

type InputFieldProps<TFormData, TName extends keyof TFormData> = BaseFieldProps<TFormData, TName> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'form' | 'defaultValue'>

export function InputField<TFormData, TName extends keyof TFormData>({
  form,
  name,
  label,
  className,
  ...props
}: InputFieldProps<TFormData, TName>) {
  return (
    <form.Field name={name}>
      {(field: any) => (
        <InputWrapper
          {...props}
          name={String(name)}
          label={label}
          className={className}
          value={(field.state.value as any) ?? ''}
          onChange={(e) => field.handleChange(e.target.value as any)}
          onBlur={field.handleBlur}
          error={field.state.meta.errors?.[0] ? { message: field.state.meta.errors[0] } : undefined}
          invalid={field.state.meta.errors.length > 0}
        />
      )}
    </form.Field>
  )
}

type TextareaFieldProps<TFormData, TName extends keyof TFormData> = BaseFieldProps<TFormData, TName> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'form' | 'defaultValue'>

export function TextareaField<TFormData, TName extends keyof TFormData>({
  form,
  name,
  label,
  className,
  ...props
}: TextareaFieldProps<TFormData, TName>) {
  return (
    <form.Field name={name}>
      {(field: any) => (
        <TextareaWrapper
          {...props}
          name={String(name)}
          label={label}
          className={className}
          value={(field.state.value as any) ?? ''}
          onChange={(e) => field.handleChange(e.target.value as any)}
          onBlur={field.handleBlur}
          error={field.state.meta.errors?.[0] ? { message: field.state.meta.errors[0] } : undefined}
          invalid={field.state.meta.errors.length > 0}
        />
      )}
    </form.Field>
  )
}

type RadioFieldProps<TFormData, TName extends keyof TFormData> = BaseFieldProps<TFormData, TName> & {
  options: (allowedPrimitiveT | optionT)[]
}

export function RadioField<TFormData, TName extends keyof TFormData>({
  form,
  name,
  label,
  className,
  options
}: RadioFieldProps<TFormData, TName>) {
  return (
    <form.Field name={name}>
      {(field: any) => (
        <RadioWrapper
          name={String(name)}
          label={label}
          className={className}
          options={options}
          value={field.state.value as any}
          onValueChange={(value) => field.handleChange(value as any)}
          error={field.state.meta.errors?.[0] ? { message: field.state.meta.errors[0] } : undefined}
          invalid={field.state.meta.errors.length > 0}
        />
      )}
    </form.Field>
  )
}

type CheckboxFieldProps<TFormData, TName extends keyof TFormData> = BaseFieldProps<TFormData, TName> & {
  options: (allowedPrimitiveT | optionT)[]
}

export function CheckboxField<TFormData, TName extends keyof TFormData>({
  form,
  name,
  label,
  className,
  options
}: CheckboxFieldProps<TFormData, TName>) {
  return (
    <form.Field name={name}>
      {(field: any) => (
        <CheckboxWrapper
          name={String(name)}
          label={label}
          className={className}
          options={options}
          value={(field.state.value as any) ?? []}
          onValueChange={(value) => field.handleChange(value as any)}
          error={field.state.meta.errors?.[0] ? { message: field.state.meta.errors[0] } : undefined}
          invalid={field.state.meta.errors.length > 0}
        />
      )}
    </form.Field>
  )
}

type SwitchFieldProps<TFormData, TName extends keyof TFormData> = BaseFieldProps<TFormData, TName>

export function SwitchField<TFormData, TName extends keyof TFormData>({
  form,
  name,
  label,
  className,
}: SwitchFieldProps<TFormData, TName>) {
  return (
    <form.Field name={name}>
      {(field: any) => (
        <SwitchWrapper
          name={String(name)}
          label={label}
          className={className}
          checked={(field.state.value as any) ?? false}
          onCheckedChange={(checked) => field.handleChange(checked as any)}
          error={field.state.meta.errors?.[0] ? { message: field.state.meta.errors[0] } : undefined}
          invalid={field.state.meta.errors.length > 0}
        />
      )}
    </form.Field>
  )
}

type SelectFieldProps<TFormData, TName extends keyof TFormData> = BaseFieldProps<TFormData, TName> & {
  options: (allowedPrimitiveT | optionT)[]
  placeholder?: string
}

export function SelectField<TFormData, TName extends keyof TFormData>({
  form,
  name,
  label,
  className,
  options,
  placeholder
}: SelectFieldProps<TFormData, TName>) {
  return (
    <form.Field name={name}>
      {(field: any) => (
        <SelectWrapper
          name={String(name)}
          label={label}
          className={className}
          options={options}
          placeholder={placeholder}
          value={field.state.value as any}
          onValueChange={(value) => field.handleChange(value as any)}
          error={field.state.meta.errors?.[0] ? { message: field.state.meta.errors[0] } : undefined}
          invalid={field.state.meta.errors.length > 0}
        />
      )}
    </form.Field>
  )
}

type DatePickerFieldProps<TFormData, TName extends keyof TFormData> = BaseFieldProps<TFormData, TName> &
  Omit<React.ComponentProps<typeof DatePickerWrapper>, 'name' | 'value' | 'onSelect' | 'error' | 'invalid'>

export function DatePickerField<TFormData, TName extends keyof TFormData>({
  form,
  name,
  label,
  className,
  ...calendarProps
}: DatePickerFieldProps<TFormData, TName>) {
  return (
    <form.Field name={name}>
      {(field: any) => (
        <DatePickerWrapper
          {...calendarProps}
          name={String(name)}
          label={label}
          className={className}
          value={field.state.value as any}
          onSelect={(date) => field.handleChange(date as any)}
          error={field.state.meta.errors?.[0] ? { message: field.state.meta.errors[0] } : undefined}
          invalid={field.state.meta.errors.length > 0}
        />
      )}
    </form.Field>
  )
}

type ComboboxFieldProps<TFormData, TName extends keyof TFormData> = BaseFieldProps<TFormData, TName> & {
  options: (allowedPrimitiveT | optionT)[]
  placeholder?: string
}

export function ComboboxField<TFormData, TName extends keyof TFormData>({
  form,
  name,
  label,
  className,
  options,
  placeholder,
}: ComboboxFieldProps<TFormData, TName>) {
  return (
    <form.Field name={name}>
      {(field: any) => (
        <ComboboxWrapper
          name={String(name)}
          label={label}
          className={className}
          options={options}
          placeholder={placeholder}
          value={field.state.value as any}
          onValueChange={(value) => field.handleChange(value as any)}
          error={field.state.meta.errors?.[0] ? { message: field.state.meta.errors[0] } : undefined}
          invalid={field.state.meta.errors.length > 0}
        />
      )}
    </form.Field>
  )
}

type MultiSelectComboboxFieldProps<TFormData, TName extends keyof TFormData> = BaseFieldProps<TFormData, TName> & {
  options: (allowedPrimitiveT | optionT)[]
  placeholder?: string
}

export function MultiSelectComboboxField<TFormData, TName extends keyof TFormData>({
  form,
  name,
  label,
  className,
  options,
  placeholder,
}: MultiSelectComboboxFieldProps<TFormData, TName>) {
  return (
    <form.Field name={name}>
      {(field: any) => (
        <MultiSelectComboboxWrapper
          name={String(name)}
          label={label}
          className={className}
          options={options}
          placeholder={placeholder}
          value={(field.state.value as any) ?? []}
          onValueChange={(value) => field.handleChange(value as any)}
          error={field.state.meta.errors?.[0] ? { message: field.state.meta.errors[0] } : undefined}
          invalid={field.state.meta.errors.length > 0}
        />
      )}
    </form.Field>
  )
}