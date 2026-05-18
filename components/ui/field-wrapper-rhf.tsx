'use client'

import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

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
  NumberWrapper as Number,
  SliderWrapper as SliderBase,
  AutocompleteWrapper as AutocompleteBase,
} from './field-wrapper'

type BaseProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  className?: string
  label?: React.ReactNode
}

type InputProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange' | 'onBlur'>
export function InputWrapper<T extends FieldValues>({ name, control, ...props }: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          {...props}
          name={name}
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

type TextareaProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'value' | 'onChange' | 'onBlur'>
export function TextareaWrapper<T extends FieldValues>({
  name,
  control,
  ...props
}: TextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Textarea
          {...props}
          name={name}
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

type RadioProps<T extends FieldValues> = BaseProps<T> & {
  options: (allowedPrimitiveT | optionT)[]
}
export function RadioWrapper<T extends FieldValues>({ name, control, ...props }: RadioProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Radio
          {...props}
          name={name}
          value={field.value}
          onValueChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type CheckboxProps<T extends FieldValues> = BaseProps<T> & {
  options: (allowedPrimitiveT | optionT)[]
}
export function CheckboxWrapper<T extends FieldValues>({
  name,
  control,
  ...props
}: CheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          {...props}
          name={name}
          value={field.value ?? []}
          onValueChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type SwitchProps<T extends FieldValues> = BaseProps<T>
export function SwitchWrapper<T extends FieldValues>({ name, control, ...props }: SwitchProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Switch
          {...props}
          name={name}
          checked={field.value ?? false}
          onCheckedChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type SelectProps<T extends FieldValues> = BaseProps<T> &
  Omit<selectProps, 'value' | 'onValueChange'>
export function SelectWrapper<T extends FieldValues>({ name, control, ...props }: SelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          {...props}
          name={name}
          value={field.value}
          onValueChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type DatePickerProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof DatePicker>, 'name' | 'value' | 'onSelect' | 'error' | 'invalid'>
export function DatePickerWrapper<T extends FieldValues>({
  name,
  control,
  ...props
}: DatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DatePicker
          {...props}
          name={name}
          value={field.value}
          onSelect={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type ComboboxProps<T extends FieldValues> = BaseProps<T> & ComboboxWrapperProps
export function ComboboxWrapper<T extends FieldValues>({
  name,
  control,
  ...props
}: ComboboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Combobox
          {...props}
          name={name}
          value={field.value}
          onValueChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type NumberProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof Number>, 'name' | 'value' | 'onValueChange' | 'error' | 'invalid'>
export function NumberWrapper<T extends FieldValues>({ name, control, ...props }: NumberProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Number
          {...props}
          name={name}
          value={field.value ?? null}
          onValueChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type SliderProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof SliderBase>, 'name' | 'value' | 'onValueChange' | 'error' | 'invalid'>
export function SliderWrapper<T extends FieldValues>({ name, control, ...props }: SliderProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <SliderBase
          {...props}
          name={name}
          value={field.value}
          onValueChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type AutocompleteProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof AutocompleteBase>, 'name' | 'value' | 'onValueChange' | 'error' | 'invalid'>
export function AutocompleteWrapper<T extends FieldValues>({ name, control, ...props }: AutocompleteProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <AutocompleteBase
          {...props}
          name={name}
          value={field.value ?? ''}
          onValueChange={field.onChange}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

