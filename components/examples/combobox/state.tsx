'use client'

import * as React from 'react'

import { fruits, withDisabled } from '@/components/examples/data/options'
import { ComboboxWrapper } from '@/components/ui/combobox'

export function DefaultValueExample() {
  return <ComboboxWrapper items={fruits} defaultValue="Mango" triggerCls="w-52" />
}

export function DisabledRootExample() {
  return <ComboboxWrapper items={fruits} placeholder="Disabled" triggerCls="w-52" disabled />
}

export function DisabledItemExample() {
  return <ComboboxWrapper items={withDisabled} placeholder="Pick role" triggerCls="w-52" />
}

export function CustomEmptyExample() {
  return (
    <ComboboxWrapper
      items={fruits}
      placeholder="Search fruits…"
      triggerCls="w-52"
      emptyMessage="No fruits match your search"
    />
  )
}

export function MultipleExample() {
  return (
    <ComboboxWrapper
      multiple
      items={fruits}
      placeholder="Select fruits"
      triggerCls="w-64"
    />
  )
}

export function MultipleClearExample() {
  return (
    <ComboboxWrapper
      multiple
      items={fruits}
      placeholder="Select fruits"
      triggerCls="w-64"
      showClear
    />
  )
}

export function ControlledExample() {
  const [value, setValue] = React.useState<string | null>(null)
  return (
    <div className="flex flex-col gap-2">
      <ComboboxWrapper
        items={fruits}
        value={value}
        onValueChange={v => setValue(v as string | null)}
        placeholder="Select fruit"
        triggerCls="w-52"
        showClear
      />
      <span className="text-xs text-muted-foreground">
        Value: <code>{value ?? '—'}</code>
      </span>
    </div>
  )
}
