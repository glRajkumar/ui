'use client'

import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

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

type BaseProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  className?: string
  label?: React.ReactNode
}

type ControlledKeys = 'name' | 'value' | 'error' | 'invalid'

// Runs the form handler first, then the caller's own handler with the same arguments.
function chain<A extends unknown[]>(
  formHandler: (...args: A) => void,
  ownHandler?: (...args: A) => void,
) {
  return (...args: A) => {
    formHandler(...args)
    ownHandler?.(...args)
  }
}

type InputProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof Input>, ControlledKeys>
export function InputWrapper<T extends FieldValues>({
  name,
  control,
  onChange,
  onBlur,
  ...props
}: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          {...props}
          name={name}
          value={field.value ?? ''}
          onChange={chain(field.onChange, onChange)}
          onBlur={e => {
            field.onBlur()
            onBlur?.(e)
          }}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type TextareaProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof Textarea>, ControlledKeys>
export function TextareaWrapper<T extends FieldValues>({
  name,
  control,
  onChange,
  onBlur,
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
          onChange={chain(field.onChange, onChange)}
          onBlur={e => {
            field.onBlur()
            onBlur?.(e)
          }}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type RadioProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof Radio>, ControlledKeys>
export function RadioWrapper<T extends FieldValues>({
  name,
  control,
  onValueChange,
  ...props
}: RadioProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Radio
          {...props}
          name={name}
          value={field.value}
          onValueChange={chain(field.onChange, onValueChange)}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type CheckboxProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof Checkbox>, ControlledKeys>
export function CheckboxWrapper<T extends FieldValues>({
  name,
  control,
  onValueChange,
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
          onValueChange={chain(field.onChange, onValueChange)}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type SwitchProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof Switch>, ControlledKeys | 'checked'>
export function SwitchWrapper<T extends FieldValues>({
  name,
  control,
  onCheckedChange,
  ...props
}: SwitchProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Switch
          {...props}
          name={name}
          checked={field.value ?? false}
          onCheckedChange={chain(field.onChange, onCheckedChange)}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type SelectProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof Select>, ControlledKeys>
export function SelectWrapper<T extends FieldValues>({
  name,
  control,
  onValueChange,
  ...props
}: SelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          {...props}
          name={name}
          value={field.value}
          onValueChange={chain(field.onChange, onValueChange)}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type DatePickerProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof DatePicker>, ControlledKeys>
export function DatePickerWrapper<T extends FieldValues>({
  name,
  control,
  onSelect,
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
          onSelect={chain(field.onChange, onSelect)}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type ComboboxProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof Combobox>, ControlledKeys>
export function ComboboxWrapper<T extends FieldValues>({
  name,
  control,
  onValueChange,
  ...props
}: ComboboxProps<T>) {
  const empty = props.multiple ? [] : ''

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Combobox
          {...props}
          name={name}
          value={field.value ?? empty}
          onValueChange={(value, eventDetails) => {
            field.onChange(value ?? empty)
            onValueChange?.(value, eventDetails)
          }}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type NumberProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof NumberInput>, ControlledKeys>
export function NumberWrapper<T extends FieldValues>({
  name,
  control,
  onValueChange,
  ...props
}: NumberProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <NumberInput
          {...props}
          name={name}
          value={field.value ?? null}
          onValueChange={chain(field.onChange, onValueChange)}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type SliderProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof Slider>, ControlledKeys>
export function SliderWrapper<T extends FieldValues>({
  name,
  control,
  onValueChange,
  ...props
}: SliderProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Slider
          {...props}
          name={name}
          value={field.value}
          onValueChange={chain(field.onChange, onValueChange)}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type AutocompleteProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof Autocomplete>, ControlledKeys>
export function AutocompleteWrapper<T extends FieldValues>({
  name,
  control,
  onValueChange,
  ...props
}: AutocompleteProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...props}
          name={name}
          value={field.value ?? ''}
          onValueChange={chain(field.onChange, onValueChange)}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type OTPProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof OTP>, ControlledKeys>
export function OTPWrapper<T extends FieldValues>({
  name,
  control,
  onValueChange,
  ...props
}: OTPProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <OTP
          {...props}
          name={name}
          value={field.value ?? ''}
          onValueChange={chain(field.onChange, onValueChange)}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}

type InputGroupProps<T extends FieldValues> = BaseProps<T> &
  Omit<React.ComponentProps<typeof InputGroup>, ControlledKeys>
export function InputGroupWrapper<T extends FieldValues>({
  name,
  control,
  onChange,
  onBlur,
  ...props
}: InputGroupProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputGroup
          {...props}
          name={name}
          value={field.value ?? ''}
          onChange={chain(field.onChange, onChange)}
          onBlur={e => {
            field.onBlur()
            onBlur?.(e)
          }}
          error={fieldState.error}
          invalid={fieldState.invalid}
        />
      )}
    />
  )
}
