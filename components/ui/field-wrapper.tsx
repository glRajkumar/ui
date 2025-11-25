"use client";

import { useState } from 'react';
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn, getKey, getLabel, getValue, parseAllowedPrimitive } from "@/lib/utils";

import { type comboboxProps, type multiSelectComboboxProps, Combobox, MultiSelectCombobox } from "./combobox";
import { type selectProps, SelectWrapper as SelectPrimitiveWrapper } from "./select";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Field, FieldLabel, FieldError } from "./field";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Calendar } from "./calendar";
import { Textarea } from "./textarea";
import { Checkbox } from './checkbox';
import { Button } from "./button";
import { Switch } from './switch';
import { Input } from "./input";

type BaseWrapperProps = {
  name: string
  label?: React.ReactNode
  error?: { message?: string }
  invalid?: boolean
  className?: string
}

type InputWrapperProps = BaseWrapperProps & React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputWrapper({ name, label, error, invalid, className, type = "text", placeholder, value, onChange, ...props }: InputWrapperProps) {
  const isInvalid = invalid || !!error

  return (
    <Field className={className} data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || `Enter ${label}`}
        value={value}
        onChange={onChange}
        aria-invalid={isInvalid}
        {...props}
      />
      {isInvalid && <FieldError errors={[error]} />}
    </Field>
  )
}

type TextareaWrapperProps = BaseWrapperProps & React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function TextareaWrapper({ name, label, error, invalid, className, placeholder, value, onChange, ...rest }: TextareaWrapperProps) {
  const isInvalid = invalid || !!error

  return (
    <Field className={className} data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder || `Enter ${label}`}
        value={value}
        onChange={onChange}
        aria-invalid={isInvalid}
        {...rest}
      />
      {isInvalid && <FieldError errors={[error]} />}
    </Field>
  )
}

type RadioWrapperProps = BaseWrapperProps & {
  options: (allowedPrimitiveT | optionT)[]
  value?: allowedPrimitiveT
  onValueChange?: (value: allowedPrimitiveT) => void
}

export function RadioWrapper({ name, label, error, invalid, className, options, value, onValueChange }: RadioWrapperProps) {
  const isInvalid = invalid || !!error

  return (
    <Field className={cn("relative", className)} data-invalid={isInvalid}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <RadioGroup
        value={value ? String(value) : undefined}
        onValueChange={(val) => onValueChange?.(parseAllowedPrimitive(val))}
        className="flex items-center flex-wrap gap-4"
        aria-invalid={isInvalid}
      >
        {options.map((option, i) => (
          <div key={getKey(option, i)} className="flex items-center gap-2">
            <RadioGroupItem value={`${getValue(option)}`} id={`${name}-${i}`} />
            <FieldLabel htmlFor={`${name}-${i}`} className="font-normal">
              {getLabel(option)}
            </FieldLabel>
          </div>
        ))}
      </RadioGroup>
      {isInvalid && <FieldError errors={[error]} />}
    </Field>
  )
}

type CheckboxWrapperProps = BaseWrapperProps & {
  options: (allowedPrimitiveT | optionT)[]
  value?: allowedPrimitiveT[]
  onValueChange?: (value: allowedPrimitiveT[]) => void
}

export function CheckboxWrapper({ name, label, error, invalid, className, options, value = [], onValueChange }: CheckboxWrapperProps) {
  const isInvalid = invalid || !!error

  const toggleValue = (v: allowedPrimitiveT) => {
    if (value.includes(v)) {
      onValueChange?.(value.filter(x => x !== v))
    } else {
      onValueChange?.([...value, v])
    }
  }

  return (
    <Field className={cn("relative", className)} data-invalid={isInvalid}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className="flex items-center flex-wrap gap-4" aria-invalid={isInvalid}>
        {options.map((option, i) => {
          const val = getValue(option)
          const parsedVal = parseAllowedPrimitive(val)
          const isChecked = value.includes(parsedVal)

          return (
            <div key={getKey(option, i)} className="flex items-center gap-2 space-y-0">
              <Checkbox
                id={`${name}-${i}`}
                checked={isChecked}
                onCheckedChange={() => toggleValue(parsedVal)}
              />
              <FieldLabel htmlFor={`${name}-${i}`} className="font-normal">
                {getLabel(option)}
              </FieldLabel>
            </div>
          )
        })}
      </div>
      {isInvalid && <FieldError errors={[error]} />}
    </Field>
  )
}

type SwitchWrapperProps = BaseWrapperProps & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function SwitchWrapper({ name, label, error, invalid, className, checked, onCheckedChange }: SwitchWrapperProps) {
  const isInvalid = invalid || !!error

  return (
    <Field className={className} data-invalid={isInvalid}>
      <div className='flex items-center justify-between gap-4'>
        {label && <FieldLabel htmlFor={name} className="font-normal">{label}</FieldLabel>}
        <Switch
          id={name}
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-label={typeof label === "string" ? label : name}
          aria-invalid={isInvalid}
        />
      </div>
      {isInvalid && <FieldError errors={[error]} />}
    </Field>
  )
}

type SelectWrapperProps = BaseWrapperProps & Omit<selectProps, "value" | "onValueChange"> & {
  value?: string | number | boolean
  onValueChange?: (value: allowedPrimitiveT) => void
}

export function SelectWrapper({ name, label, error, invalid, className, options, placeholder, value, onValueChange, ...props }: SelectWrapperProps) {
  const isInvalid = invalid || !!error

  return (
    <Field className={cn("relative", className)} data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <SelectPrimitiveWrapper
        {...props}
        options={options}
        value={value ? String(value) : undefined}
        placeholder={placeholder ?? `Select ${label}`}
        onValueChange={(val) => onValueChange?.(parseAllowedPrimitive(val))}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={[error]} />}
    </Field>
  )
}

type DatePickerWrapperProps = BaseWrapperProps & Omit<React.ComponentProps<typeof Calendar>, "selected" | "onSelect"> & {
  value?: Date
  onSelect?: (date: Date | undefined) => void
}

export function DatePickerWrapper({ name, label, error, invalid, className, value, onSelect, ...calendarProps }: DatePickerWrapperProps) {
  const [open, setOpen] = useState(false)
  const isInvalid = invalid || !!error

  return (
    <Field className={className} data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant={"outline"}
            className={cn("w-full pl-3 text-left font-normal", !value && "text-muted-foreground")}
            aria-invalid={isInvalid}
          >
            {value ? format(value, "dd/MM/yyyy") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            autoFocus
            mode="single"
            captionLayout="dropdown"
            selected={value}
            onSelect={(date) => {
              onSelect?.(date)
              setOpen(false)
            }}
            defaultMonth={value}
            {...calendarProps as any}
          />
        </PopoverContent>
      </Popover>
      {isInvalid && <FieldError errors={[error]} />}
    </Field>
  )
}

type ComboboxWrapperProps = BaseWrapperProps & Omit<comboboxProps, "value" | "onValueChange"> & {
  value?: allowedPrimitiveT
  onValueChange?: (value: allowedPrimitiveT) => void
}

export function ComboboxWrapper({ name, label, error, invalid, className, placeholder, value, onValueChange, ...rest }: ComboboxWrapperProps) {
  const isInvalid = invalid || !!error

  return (
    <Field className={cn("relative", className)} data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Combobox
        {...rest}
        value={value}
        placeholder={placeholder || `Select ${label}`}
        onValueChange={onValueChange}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={[error]} />}
    </Field>
  )
}

type MultiSelectComboboxWrapperProps = BaseWrapperProps & Omit<multiSelectComboboxProps, "value" | "onValueChange"> & {
  value?: allowedPrimitiveT[]
  onValueChange?: (value: allowedPrimitiveT[]) => void
}

export function MultiSelectComboboxWrapper({ name, label, error, invalid, className, placeholder, value, onValueChange, ...rest }: MultiSelectComboboxWrapperProps) {
  const isInvalid = invalid || !!error

  return (
    <Field className={cn("relative", className)} data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <MultiSelectCombobox
        {...rest}
        value={value}
        placeholder={placeholder || `Select ${label}`}
        onValueChange={onValueChange}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={[error]} />}
    </Field>
  )
}