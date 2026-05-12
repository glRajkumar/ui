'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { ExRow, ExItem } from '@/components/examples/common'
import {
  fruits,
  grouped,
  memberMeta,
  memberOptions,
  regions,
  statusOptions,
  statusStyle,
  themed,
  withSeparator,
} from '@/components/examples/data/options'
import { SelectWrapper } from '@/components/ui/select'

function FlatExample() {
  return <SelectWrapper options={fruits} placeholder="Select fruit" triggerCls="w-44" />
}

function GroupedExample() {
  return <SelectWrapper options={grouped} placeholder="Select fruit" triggerCls="w-44" />
}

function SeparatorExample() {
  return <SelectWrapper options={withSeparator} placeholder="Select team" triggerCls="w-44" />
}

function DefaultSizeExample() {
  return <SelectWrapper options={fruits} placeholder="Default (h-8)" triggerCls="w-44" />
}

function SmSizeExample() {
  return <SelectWrapper options={fruits} placeholder="Small (h-7)" triggerCls="w-44" size="sm" />
}

function IndicatorRightExample() {
  return <SelectWrapper options={fruits} placeholder="Select fruit" triggerCls="w-44" />
}

function IndicatorLeftExample() {
  return <SelectWrapper options={fruits} placeholder="Select fruit" triggerCls="w-44" indicatorAt="left" />
}

function DefaultValueExample() {
  return <SelectWrapper options={fruits} defaultValue="Mango" triggerCls="w-44" />
}

function DisabledRootExample() {
  return <SelectWrapper options={fruits} placeholder="Disabled" triggerCls="w-44" disabled />
}

function DisabledItemExample() {
  const opts: optionsT = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer (disabled)', value: 'viewer', disabled: true },
    { label: 'Guest', value: 'guest' },
  ]
  return <SelectWrapper options={opts} placeholder="Pick role" triggerCls="w-44" />
}

function ReadOnlyExample() {
  return <SelectWrapper options={fruits} defaultValue="Banana" triggerCls="w-44" readOnly />
}

function MultipleExample() {
  const [value, setValue] = React.useState<string[]>([])
  return (
    <div className="flex flex-col gap-2">
      <SelectWrapper
        options={fruits}
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

function ControlledExample() {
  const [value, setValue] = React.useState('')
  return (
    <div className="flex flex-col gap-2">
      <SelectWrapper
        options={fruits}
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

function IconItemsExample() {
  return <SelectWrapper options={themed} placeholder="Select theme" triggerCls="w-44" />
}

function ColoredItemsExample() {
  return <SelectWrapper options={regions} placeholder="Select region" triggerCls="w-44" />
}

function FormExample() {
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault()
        alert(new FormData(e.currentTarget).get('fruit'))
      }}
    >
      <SelectWrapper options={fruits} name="fruit" placeholder="Select fruit" triggerCls="w-44" required />
      <button type="submit" className="text-left text-xs text-muted-foreground underline">
        Submit →
      </button>
    </form>
  )
}

function StatusPickerExample() {
  return (
    <SelectWrapper
      options={statusOptions}
      placeholder="Set status"
      triggerCls="w-48"
      renderValue={(value) => {
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

function AssigneePickerExample() {
  return (
    <SelectWrapper
      options={memberOptions}
      placeholder="Assign to..."
      triggerCls="w-60"
      renderValue={(value) => {
        const m = memberMeta[value]
        if (!m) return value
        return (
          <span className="flex min-w-0 items-center gap-2">
            <span className={cn('flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white', m.bg)}>
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

export function SelectExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="Flat list">
          <FlatExample />
        </ExItem>
        <ExItem label="Grouped options">
          <GroupedExample />
        </ExItem>
        <ExItem label="With separator">
          <SeparatorExample />
        </ExItem>
      </ExRow>

      <ExRow label="Size">
        <ExItem label="Default (h-8)">
          <DefaultSizeExample />
        </ExItem>
        <ExItem label="Small (h-7)">
          <SmSizeExample />
        </ExItem>
      </ExRow>

      <ExRow label="Indicator">
        <ExItem label="Right (default)">
          <IndicatorRightExample />
        </ExItem>
        <ExItem label="Left">
          <IndicatorLeftExample />
        </ExItem>
      </ExRow>

      <ExRow label="State">
        <ExItem label="Default value — Mango pre-selected">
          <DefaultValueExample />
        </ExItem>
        <ExItem label="Disabled root — non-interactive">
          <DisabledRootExample />
        </ExItem>
        <ExItem label="Disabled item — Viewer unreachable">
          <DisabledItemExample />
        </ExItem>
        <ExItem label="Read-only — value visible, not editable">
          <ReadOnlyExample />
        </ExItem>
      </ExRow>

      <ExRow label="Multiple">
        <ExItem label="Multiple — pick several values">
          <MultipleExample />
        </ExItem>
      </ExRow>

      <ExRow label="Controlled">
        <ExItem label="Controlled value via useState">
          <ControlledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Custom Style">
        <ExItem label="Icon items — theme switcher">
          <IconItemsExample />
        </ExItem>
        <ExItem label="Per-item colour via className">
          <ColoredItemsExample />
        </ExItem>
        <ExItem label="Form — native submission with name/required">
          <FormExample />
        </ExItem>
      </ExRow>

      <ExRow label="Render Value">
        <ExItem label="Status badge — dot + coloured label in trigger">
          <StatusPickerExample />
        </ExItem>
        <ExItem label="Assignee — avatar + name + dept in trigger, rich list">
          <AssigneePickerExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
