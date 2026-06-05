'use client'

import { cn } from '@/lib/utils'
import {
  memberMeta,
  memberOptions,
  regions,
  statusOptions,
  statusStyle,
  themed,
  fruits,
} from '@/components/examples/data/options'
import { SelectWrapper } from '@/components/ui/select'

export function IconItemsExample() {
  return <SelectWrapper items={themed} placeholder="Select theme" triggerCls="w-44" />
}

export function ColoredItemsExample() {
  return <SelectWrapper items={regions} placeholder="Select region" triggerCls="w-44" />
}

export function FormExample() {
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault()
        alert(new FormData(e.currentTarget).get('fruit'))
      }}
    >
      <SelectWrapper
        items={fruits}
        name="fruit"
        placeholder="Select fruit"
        triggerCls="w-44"
        required
      />
      <button type="submit" className="text-left text-xs text-muted-foreground underline">
        Submit →
      </button>
    </form>
  )
}

export function StatusPickerExample() {
  return (
    <SelectWrapper
      items={statusOptions}
      placeholder="Set status"
      triggerCls="w-48"
      renderValue={value => {
        const s = statusStyle[value]
        if (!s) return value
        return (
          <span className={cn('flex items-center gap-1.5 font-medium', s.text)}>
            <span className={cn('size-2 shrink-0 rounded-full', s.dot)} />
            {s.label}
          </span>
        )
      }}
    />
  )
}

export function AssigneePickerExample() {
  return (
    <SelectWrapper
      items={memberOptions}
      placeholder="Assign to..."
      triggerCls="w-60"
      renderValue={value => {
        const m = memberMeta[value]
        if (!m) return value
        return (
          <span className="flex min-w-0 items-center gap-2">
            <span
              className={cn(
                'flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white',
                m.bg,
              )}
            >
              {m.initials}
            </span>
            <span className="truncate font-medium">{m.name}</span>
            <span className="shrink-0 text-xs text-muted-foreground">{m.dept}</span>
          </span>
        )
      }}
    />
  )
}
