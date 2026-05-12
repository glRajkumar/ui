'use client'

import * as React from 'react'

import { useAsyncOptions } from '@/hooks/use-options'
import { ExRow, ExItem } from '@/components/examples/common'
import { ComboboxWrapper } from '@/components/ui/combobox'

const fruits: optionsT = [
  'Apple', 'Banana', 'Cherry', 'Grape', 'Mango',
  'Orange', 'Peach', 'Plum', 'Strawberry', 'Watermelon',
]

const grouped: optionsT = [
  { group: 'Citrus', options: ['Orange', 'Lemon', 'Lime', 'Grapefruit'] },
  { group: 'Tropical', options: ['Mango', 'Papaya', 'Pineapple'] },
  { group: 'Berries', options: ['Strawberry', 'Blueberry', 'Raspberry'] },
]

const withSeparator: optionsT = ['Design', 'Engineering', 'Marketing', '---', 'Finance', 'Legal']

const withDisabled: optionsT = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer (disabled)', value: 'viewer', disabled: true },
  { label: 'Guest', value: 'guest' },
]

function hasMatch(items: optionsT, query: string): boolean {
  const lower = query.toLowerCase()
  return items.some(item => {
    if (typeof item === 'string') return item.toLowerCase().includes(lower)
    if (typeof item === 'number' || typeof item === 'boolean') return String(item).includes(lower)
    if (typeof item === 'object' && 'value' in item) return String((item as optionT).value).toLowerCase().includes(lower)
    return false
  })
}

// ─── basic ──────────────────────────────────────────────
function FlatExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" />
}

function GroupedExample() {
  return <ComboboxWrapper items={grouped} placeholder="Select fruit" triggerCls="w-52" />
}

function SeparatorExample() {
  return <ComboboxWrapper items={withSeparator} placeholder="Select team" triggerCls="w-52" />
}

// ─── controls ───────────────────────────────────────────
function WithTriggerExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" />
}

function WithClearExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" showClear />
}

function SearchOnlyExample() {
  return <ComboboxWrapper items={fruits} placeholder="Search…" triggerCls="w-52" showTrigger={false} />
}

// ─── indicator ──────────────────────────────────────────
function IndicatorRightExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" />
}

function IndicatorLeftExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" indicatorAt="left" />
}

// ─── state ──────────────────────────────────────────────
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

// ─── multiple ───────────────────────────────────────────
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

// ─── controlled ─────────────────────────────────────────
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

// ─── async ──────────────────────────────────────────────
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

// ─── create ─────────────────────────────────────────────
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

// ─── main export ────────────────────────────────────────
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
    </div>
  )
}
