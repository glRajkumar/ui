'use client'

import * as React from 'react'
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group'
import { Radio as RadioPrimitive } from '@base-ui/react/radio'

import { cn } from '@/lib/utils'

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        'group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary',
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

type RadioWrapperProps = {
  label: React.ReactNode
  description?: React.ReactNode
  wrapperCls?: string
} & RadioPrimitive.Root.Props

function RadioWrapper({ label, description, wrapperCls, className, ...props }: RadioWrapperProps) {
  return (
    <label className={cn('flex cursor-pointer select-none items-start gap-2 has-[:disabled]:cursor-not-allowed', wrapperCls)}>
      <RadioGroupItem className={cn('mt-0.5', className)} {...props} />
      <div className="grid gap-0.5">
        <span className="text-sm font-medium leading-none">{label}</span>
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </div>
    </label>
  )
}

type radioItemT = {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}

type RadioGroupWrapperProps = {
  items: radioItemT[]
  orientation?: 'horizontal' | 'vertical'
  itemCls?: string
} & Omit<RadioGroupPrimitive.Props, 'children'>

function RadioGroupWrapper({
  items,
  orientation = 'vertical',
  itemCls,
  className,
  ...props
}: RadioGroupWrapperProps) {
  return (
    <RadioGroup
      className={cn(orientation === 'horizontal' && 'flex-row flex-wrap', className)}
      {...props}
    >
      {items.map((item) => (
        <RadioWrapper
          key={item.value}
          value={item.value}
          label={item.label}
          description={item.description}
          disabled={item.disabled}
          wrapperCls={itemCls}
        />
      ))}
    </RadioGroup>
  )
}

export {
  RadioGroup,
  RadioGroupItem,
  RadioWrapper,
  RadioGroupWrapper,
  type radioItemT,
}
