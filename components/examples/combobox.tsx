'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { useAsyncOptions } from '@/hooks/use-options'
import { ExRow, ExItem } from '@/components/examples/common'
import {
  fruits,
  grouped,
  priorityMeta,
  priorityOptions,
  teamMeta,
  teamOptions,
  withDisabled,
  withSeparator,
} from '@/components/examples/data/options'
import { ComboboxWrapper } from '@/components/ui/combobox'

function hasMatch(items: optionsT, query: string): boolean {
  const lower = query.toLowerCase()
  return items.some(item => {
    if (typeof item === 'string') return item.toLowerCase().includes(lower)
    if (typeof item === 'number' || typeof item === 'boolean') return String(item).includes(lower)
    if (typeof item === 'object' && 'value' in item) return String((item as optionT).value).toLowerCase().includes(lower)
    return false
  })
}

function FlatExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" />
}

function GroupedExample() {
  return <ComboboxWrapper items={grouped} placeholder="Select fruit" triggerCls="w-52" />
}

function SeparatorExample() {
  return <ComboboxWrapper items={withSeparator} placeholder="Select team" triggerCls="w-52" />
}

function WithTriggerExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" />
}

function WithClearExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" showClear />
}

function SearchOnlyExample() {
  return <ComboboxWrapper items={fruits} placeholder="Search…" triggerCls="w-52" showTrigger={false} />
}

function IndicatorRightExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" />
}

function IndicatorLeftExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" indicatorAt="left" />
}

function DefaultValueExample() {
  return <ComboboxWrapper items={fruits} defaultValue="Mango" triggerCls="w-52" />
}

function DisabledRootExample() {
  return <ComboboxWrapper items={fruits} placeholder="Disabled" triggerCls="w-52" disabled />
}

function DisabledItemExample() {
  return <ComboboxWrapper items={withDisabled} placeholder="Pick role" triggerCls="w-52" />
}

function CustomEmptyExample() {
  return (
    <ComboboxWrapper
      items={fruits}
      placeholder="Search fruits…"
      triggerCls="w-52"
      emptyMessage="No fruits match your search"
    />
  )
}

function MultipleExample() {
  return (
    <ComboboxWrapper
      multiple
      items={fruits}
      placeholder="Select fruits"
      triggerCls="w-64"
    />
  )
}

function MultipleClearExample() {
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

function ControlledExample() {
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

function AsyncExample() {
  const { data: list, isLoading } = useAsyncOptions({ queryKey: 'combobox-async', delayBy: 1500 })
  return (
    <ComboboxWrapper
      items={list ?? []}
      isLoading={isLoading}
      placeholder="Loading options…"
      triggerCls="w-52"
    />
  )
}

function ClickCreateExample() {
  const [inputValue, setInputValue] = React.useState('')
  const [value, setValue] = React.useState<string | null>(null)

  const trimmed = inputValue.trim()
  const hideList = !!trimmed && !hasMatch(fruits, trimmed)

  return (
    <ComboboxWrapper
      value={value}
      items={fruits}
      hideList={hideList}
      inputValue={inputValue}
      onValueChange={v => setValue(v as string | null)}
      onInputValueChange={setInputValue}
      placeholder="Select or type to create…"
      triggerCls="w-52"
      inputProps={{
        onKeyDown: e => {
          if (e.key === 'Enter' && trimmed) {
            e.preventDefault()
            setInputValue('')
            setValue(trimmed)
          }
        },
      }}
    />
  )
}

function EnterCreateExample() {
  const [inputValue, setInputValue] = React.useState('')
  const [value, setValue] = React.useState<string[]>([])

  const trimmed = inputValue.trim()
  const hideList = !!trimmed && !hasMatch(fruits, trimmed)

  return (
    <ComboboxWrapper
      multiple
      value={value}
      items={fruits}
      hideList={hideList}
      inputValue={inputValue}
      onValueChange={v => setValue(v as string[])}
      onInputValueChange={setInputValue}
      placeholder="Type + Enter to tag…"
      triggerCls="w-64"
      inputProps={{
        onKeyDown: e => {
          if (e.key === 'Enter' && trimmed) {
            e.preventDefault()
            setInputValue('')
            setValue(prev => [...prev, trimmed])
          }
        },
      }}
    />
  )
}

function PriorityChipsExample() {
  return (
    <ComboboxWrapper
      multiple
      items={priorityOptions}
      placeholder="Select priorities…"
      triggerCls="w-72"
      showClear
      renderValue={(value) => {
        const p = priorityMeta[value]
        if (!p) return <span className="capitalize">{value}</span>
        return (
          <span className={cn('flex items-center gap-1 font-medium', p.cls)}>
            {p.icon}
            <span className="capitalize">{value}</span>
          </span>
        )
      }}
    />
  )
}

function TeamChipsExample() {
  return (
    <ComboboxWrapper
      multiple
      items={teamOptions}
      placeholder="Add team members…"
      triggerCls="w-72"
      showClear
      renderValue={(value) => {
        const m = teamMeta[value]
        return (
          <span className="flex items-center gap-1">
            <span
              className={cn(
                'flex size-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white',
                m?.bg ?? 'bg-slate-400',
              )}
            >
              {m?.initials ?? value.slice(0, 2).toUpperCase()}
            </span>
            {m?.name ?? value}
          </span>
        )
      }}
    />
  )
}

export function ComboboxExample() {
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

      <ExRow label="Controls">
        <ExItem label="Trigger only (default)">
          <WithTriggerExample />
        </ExItem>
        <ExItem label="With clear button">
          <WithClearExample />
        </ExItem>
        <ExItem label="No trigger — search only">
          <SearchOnlyExample />
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
        <ExItem label="Custom empty message">
          <CustomEmptyExample />
        </ExItem>
      </ExRow>

      <ExRow label="Multiple">
        <ExItem label="Multiple — chips per selection">
          <MultipleExample />
        </ExItem>
        <ExItem label="Multiple + clear all">
          <MultipleClearExample />
        </ExItem>
      </ExRow>

      <ExRow label="Controlled">
        <ExItem label="Controlled value via useState">
          <ControlledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Async">
        <ExItem label="Async load — 1.5 s simulated delay">
          <AsyncExample />
        </ExItem>
      </ExRow>

      <ExRow label="Create">
        <ExItem label="canCreate — Enter creates single value">
          <ClickCreateExample />
        </ExItem>
        <ExItem label="canCreate — Enter appends chip (multiple)">
          <EnterCreateExample />
        </ExItem>
      </ExRow>

      <ExRow label="Render Value">
        <ExItem label="Priority chips — icon + coloured label per priority">
          <PriorityChipsExample />
        </ExItem>
        <ExItem label="Team chips — avatar initials + first name">
          <TeamChipsExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
