'use client'

import { type ComponentProps } from 'react'
import { createFormHookContexts, createFormHook, type AppFieldExtendedReactFormApi, type DeepKeys } from '@tanstack/react-form'

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

// type FieldComponentProps<T> = {
//   label?: React.ReactNode
//   className?: string
// } & Partial<{
//   error: { message?: string }
//   invalid: boolean
// }> & Omit<T, 'form'>

// type FormApiWithSchema<TFormData> = AppFieldExtendedReactFormApi<
//   TFormData,
//   any, any, any, any, any,
//   any, any, any, any,
//   any, any, any, any
// >

// type BaseProps<TFormData, TName extends DeepKeys<TFormData>> = {
//   form: FormApiWithSchema<TFormData>
//   name: TName
//   appFieldProps?: Omit<ComponentProps<FormApiWithSchema<TFormData>["AppField"]>, 'name' | 'children'>
// }

// export function InputWrapper<TFormData extends object, TName extends DeepKeys<TFormData>>(
//   { form, name, appFieldProps, ...fieldProps }: BaseProps<TFormData, TName> & FieldComponentProps<React.InputHTMLAttributes<HTMLInputElement>>
// ) {
//   return (
//     <form.AppField name={name} {...appFieldProps}>
//       {(field: any) => <field.InputField {...fieldProps} />}
//     </form.AppField>
//   )
// }

// export function TextareaWrapper<TFormData extends object, TName extends DeepKeys<TFormData>>(
//   { form, name, appFieldProps, ...fieldProps }: BaseProps<TFormData, TName> & FieldComponentProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>>
// ) {
//   return (
//     <form.AppField name={name} {...appFieldProps}>
//       {(field: any) => <field.TextareaField {...fieldProps} />}
//     </form.AppField>
//   )
// }

// export function RadioWrapper<TFormData extends object, TName extends DeepKeys<TFormData>>(
//   { form, name, appFieldProps, ...fieldProps }: BaseProps<TFormData, TName> & FieldComponentProps<{ options: (allowedPrimitiveT | optionT)[] }>
// ) {
//   return (
//     <form.AppField name={name} {...appFieldProps}>
//       {(field: any) => <field.RadioField {...fieldProps} />}
//     </form.AppField>
//   )
// }

// export function CheckboxWrapper<TFormData extends object, TName extends DeepKeys<TFormData>>(
//   { form, name, appFieldProps, ...fieldProps }: BaseProps<TFormData, TName> & FieldComponentProps<{ options: (allowedPrimitiveT | optionT)[] }>
// ) {
//   return (
//     <form.AppField name={name} {...appFieldProps}>
//       {(field: any) => <field.CheckboxField {...fieldProps} />}
//     </form.AppField>
//   )
// }

// export function SwitchWrapper<TFormData extends object, TName extends DeepKeys<TFormData>>(
//   { form, name, appFieldProps, ...fieldProps }: BaseProps<TFormData, TName> & FieldComponentProps<{}>
// ) {
//   return (
//     <form.AppField name={name} {...appFieldProps}>
//       {(field: any) => <field.SwitchField {...fieldProps} />}
//     </form.AppField>
//   )
// }

// export function SelectWrapper<TFormData extends object, TName extends DeepKeys<TFormData>>(
//   { form, name, appFieldProps, ...fieldProps }: BaseProps<TFormData, TName> & FieldComponentProps<Omit<selectProps, 'value' | 'onValueChange'>>
// ) {
//   return (
//     <form.AppField name={name} {...appFieldProps}>
//       {(field: any) => <field.SelectField {...fieldProps} />}
//     </form.AppField>
//   )
// }

// export function DatePickerWrapper<TFormData extends object, TName extends DeepKeys<TFormData>>(
//   { form, name, appFieldProps, ...fieldProps }: BaseProps<TFormData, TName> & FieldComponentProps<Omit<React.ComponentProps<typeof DatePicker>, 'value' | 'onSelect'>>
// ) {
//   return (
//     <form.AppField name={name} {...appFieldProps}>
//       {(field: any) => <field.DatePickerField {...fieldProps} />}
//     </form.AppField>
//   )
// }

// export function ComboboxWrapper<TFormData extends object, TName extends DeepKeys<TFormData>>(
//   { form, name, appFieldProps, ...fieldProps }: BaseProps<TFormData, TName> & FieldComponentProps<Omit<comboboxProps, 'value' | 'onValueChange' | 'name'>>
// ) {
//   return (
//     <form.AppField name={name} {...appFieldProps}>
//       {(field: any) => <field.ComboboxField {...fieldProps} />}
//     </form.AppField>
//   )
// }

// export function MultiSelectComboboxWrapper<TFormData extends object, TName extends DeepKeys<TFormData>>(
//   { form, name, appFieldProps, ...fieldProps }: BaseProps<TFormData, TName> & FieldComponentProps<Omit<multiSelectComboboxProps, 'value' | 'onValueChange' | 'name'>>
// ) {
//   return (
//     <form.AppField name={name} {...appFieldProps}>
//       {(field: any) => <field.MultiSelectComboboxField {...fieldProps} />}
//     </form.AppField>
//   )
// }


type FieldComponentProps<T> = {
  label?: React.ReactNode;
  className?: string;
} & Partial<{
  error: { message?: string };
  invalid: boolean;
}> & Omit<T, 'form'>;


type FormApiWithSchema<TFormData> = AppFieldExtendedReactFormApi<
  TFormData,
  any, any, any, any, any,
  any, any, any, any,
  any, any, any, any
>;


type BaseProps<TFormData, TName extends DeepKeys<TFormData>> = {
  form: FormApiWithSchema<TFormData>;
  name: TName;
  appFieldProps?: Omit<ComponentProps<FormApiWithSchema<TFormData>["AppField"]>, 'name' | 'children'>;
};


function createFieldWrapper<TProps, TFormData extends object>(FieldComponentName: keyof FormApiWithSchema<TFormData>['fieldComponents']) {
  return function FieldWrapper<TName extends DeepKeys<TFormData>>(
    { form, name, appFieldProps, ...fieldProps }: BaseProps<TFormData, TName> & FieldComponentProps<TProps>
  ) {
    return (
      <form.AppField name={name} {...appFieldProps}>
        {(field: any) => {
          const Component = field[FieldComponentName] as React.ComponentType<any>;
          return <Component {...fieldProps} />;
        }}
      </form.AppField>
    );
  };
}

export const InputWrapper = createFieldWrapper<inputFieldProps, any>('InputField');
export const TextareaWrapper = createFieldWrapper<textareaFieldProps, any>('TextareaField');
export const RadioWrapper = createFieldWrapper<radioFieldProps, any>('RadioField');
export const CheckboxWrapper = createFieldWrapper<radioFieldProps, any>('CheckboxField');
export const SwitchWrapper = createFieldWrapper<{}, any>('SwitchField');
export const SelectWrapper = createFieldWrapper<selectFieldProps, any>('SelectField');
export const DatePickerWrapper = createFieldWrapper<datePickerFieldProps, any>('DatePickerField');
export const ComboboxWrapper = createFieldWrapper<comboboxFieldProps, any>('ComboboxField');
export const MultiSelectComboboxWrapper = createFieldWrapper<multiSelectComboboxFieldProps, any>('MultiSelectComboboxField');