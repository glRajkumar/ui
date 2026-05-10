'use client'

import * as React from 'react'
import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group'

import { cn } from '@/lib/utils'
import { Checkbox, CheckboxWrapper } from '@/components/ui/checkbox'

function CheckboxGroup({ className, ...props }: CheckboxGroupPrimitive.Props) {
  return (
    <CheckboxGroupPrimitive
      data-slot="checkbox-group"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

type checkboxItemT = {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}

type CheckboxGroupWrapperProps = {
  items: checkboxItemT[]
  parentLabel?: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  itemCls?: string
} & Omit<CheckboxGroupPrimitive.Props, 'children'>

function CheckboxGroupWrapper({
  items,
  parentLabel,
  orientation = 'vertical',
  itemCls,
  className,
  ...props
}: CheckboxGroupWrapperProps) {
  const allValues = items.map((i) => i.value)

  return (
    <CheckboxGroup
      allValues={parentLabel ? allValues : undefined}
      className={cn(orientation === 'horizontal' && 'flex-row flex-wrap', className)}
      {...props}
    >
      {parentLabel && (
        <label className={cn('flex cursor-pointer select-none items-start gap-2 has-[:disabled]:cursor-not-allowed', itemCls)}>
          <Checkbox className="mt-0.5" data-parent />
          <div className="grid gap-0.5">
            <span className="text-sm font-medium leading-none">{parentLabel}</span>
          </div>
        </label>
      )}
      {items.map((item) => (
        <CheckboxWrapper
          key={item.value}
          value={item.value}
          label={item.label}
          description={item.description}
          disabled={item.disabled}
          wrapperCls={itemCls}
        />
      ))}
    </CheckboxGroup>
  )
}

export { CheckboxGroup, CheckboxGroupWrapper, type checkboxItemT }
