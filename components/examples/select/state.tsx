'use client'

import * as React from 'react'

import { fruits } from '@/components/examples/data/options'
import { SelectWrapper } from '@/components/ui/select'

export function DefaultValueExample() {
  return <SelectWrapper items={fruits} defaultValue="Mango" triggerCls="w-44" />
}

export function DisabledRootExample() {
  return <SelectWrapper items={fruits} placeholder="Disabled" triggerCls="w-44" disabled />
}

export function DisabledItemExample() {
  const opts: itemsT = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer (disabled)', value: 'viewer', disabled: true },
    { label: 'Guest', value: 'guest' },
  ]
  return <SelectWrapper items={opts} placeholder="Pick role" triggerCls="w-44" />
}

export function ReadOnlyExample() {
  return <SelectWrapper items={fruits} defaultValue="Banana" triggerCls="w-44" readOnly />
}

export function MultipleExample() {
  const [value, setValue] = React.useState<string[]>([])
  return (
    <div className="flex flex-col gap-2">
      <SelectWrapper
        items={fruits}
        placeholder="Select fruits"
        triggerCls="w-44"
        multiple
        value={value}
        onValueChange={v => setValue(v as string[])}
      />
      <span className="text-xs text-muted-foreground">
        Selected: {value.length ? value.join(', ') : 'none'}
      </span>
    </div>
  )
}

export function ControlledExample() {
  const [value, setValue] = React.useState('')
  return (
    <div className="flex flex-col gap-2">
      <SelectWrapper
        items={fruits}
        placeholder="Select fruit"
        triggerCls="w-44"
        value={value}
        onValueChange={v => setValue(v as string)}
      />
      <span className="text-xs text-muted-foreground">
        Value: <code>{value || '—'}</code>
      </span>
    </div>
  )
}
