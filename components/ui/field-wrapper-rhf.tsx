"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";

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

type BaseProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  className?: string
  label?: React.ReactNode
}

type InputProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'defaultValue'>

export function InputController<T extends FieldValues>({
  name,
  control,
  className,
  label,
  ...props
}: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputWrapper
          {...props}
          name={name}
          label={label}
          className={className}
          value={field.value ?? ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type TextareaControllerProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'defaultValue'>

export function TextareaController<T extends FieldValues>({
  name,
  control,
  className,
  label,
  ...props
}: TextareaControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextareaWrapper
          {...props}
          name={name}
          label={label}
          className={className}
          value={field.value ?? ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type RadioControllerProps<T extends FieldValues> = BaseProps<T> & {
  options: (allowedPrimitiveT | optionT)[]
}

export function RadioController<T extends FieldValues>({
  name,
  control,
  className,
  label,
  options
}: RadioControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <RadioWrapper
          name={name}
          label={label}
          className={className}
          options={options}
          value={field.value}
          onValueChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type CheckboxControllerProps<T extends FieldValues> = BaseProps<T> & {
  options: (allowedPrimitiveT | optionT)[]
}

export function CheckboxController<T extends FieldValues>({
  name,
  control,
  className,
  label,
  options
}: CheckboxControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <CheckboxWrapper
          name={name}
          label={label}
          className={className}
          options={options}
          value={field.value ?? []}
          onValueChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type SwitchControllerProps<T extends FieldValues> = BaseProps<T>

export function SwitchController<T extends FieldValues>({
  name,
  control,
  className,
  label
}: SwitchControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <SwitchWrapper
          name={name}
          label={label}
          className={className}
          checked={field.value ?? false}
          onCheckedChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type SelectControllerProps<T extends FieldValues> = BaseProps<T> & {
  options: (allowedPrimitiveT | optionT)[]
  placeholder?: string
}

export function SelectController<T extends FieldValues>({
  name,
  control,
  className,
  label,
  options,
  placeholder
}: SelectControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <SelectWrapper
          name={name}
          label={label}
          className={className}
          options={options}
          placeholder={placeholder}
          value={field.value}
          onValueChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type DatePickerControllerProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof DatePickerWrapper>, 'name' | 'value' | 'onSelect' | 'error' | 'invalid'>

export function DatePickerController<T extends FieldValues>({
  name,
  control,
  className,
  label,
  ...calendarProps
}: DatePickerControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DatePickerWrapper
          {...calendarProps}
          name={name}
          label={label}
          className={className}
          value={field.value}
          onSelect={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type ComboboxControllerProps<T extends FieldValues> = BaseProps<T> & {
  options: (allowedPrimitiveT | optionT)[]
  placeholder?: string
}

export function ComboboxController<T extends FieldValues>({
  name,
  control,
  className,
  label,
  options,
  placeholder,
}: ComboboxControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <ComboboxWrapper
          name={name}
          label={label}
          className={className}
          options={options}
          placeholder={placeholder}
          value={field.value}
          onValueChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type MultiSelectComboboxControllerProps<T extends FieldValues> = BaseProps<T> & {
  options: (allowedPrimitiveT | optionT)[]
  placeholder?: string
}

export function MultiSelectComboboxController<T extends FieldValues>({
  name,
  control,
  className,
  label,
  options,
  placeholder,
}: MultiSelectComboboxControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <MultiSelectComboboxWrapper
          name={name}
          label={label}
          className={className}
          options={options}
          placeholder={placeholder}
          value={field.value ?? []}
          onValueChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}