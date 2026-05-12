'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { useAsyncOptions } from '@/hooks/use-options'
import {
  fruits,
  priorityMeta,
  priorityOptions,
  teamMeta,
  teamOptions,
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

export function AsyncExample() {
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

export function ClickCreateExample() {
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

export function EnterCreateExample() {
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

export function PriorityChipsExample() {
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

export function TeamChipsExample() {
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
