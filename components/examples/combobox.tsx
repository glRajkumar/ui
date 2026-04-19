'use client'

import { useState } from 'react'

import { useAsyncOptions } from '@/hooks/use-options'
import { options } from './data'

import { ComboboxWrapper } from '@/components/ui/combobox'

function hasMatch(items: optionsT, query: string): boolean {
  const lower = query.toLowerCase()
  return items.some(item => {
    if (typeof item === 'string') return item.toLowerCase().includes(lower)
    if (typeof item === 'number' || typeof item === 'boolean') return String(item).toLowerCase().includes(lower)
    if (typeof item === 'object' && item && 'value' in item) return String(item.value).toLowerCase().includes(lower)
    return false
  })
}

function ClickCreate() {
  const [inputValue, setInputValue] = useState("")
  const [value, setValue] = useState<string | null>(null)

  const trimmed = inputValue.trim()
  const hideList = !!trimmed && !hasMatch(options, trimmed)

  return (
    <ComboboxWrapper
      value={value}
      items={options}
      hideList={hideList}
      inputValue={inputValue}
      onValueChange={setValue}
      onInputValueChange={setInputValue}
      placeholder="Type to create…"
      triggerCls="w-52"
      inputProps={{
        onKeyDown: e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            setInputValue("")
            setValue(trimmed)
          }
        },
      }}
    />
  )
}

function EnterCreate() {
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState<string[]>([])

  const trimmed = inputValue.trim()
  const hideList = !!trimmed && !hasMatch(options, trimmed)

  return (
    <ComboboxWrapper
      multiple
      value={value}
      items={options}
      hideList={hideList}
      inputValue={inputValue}
      onValueChange={setValue}
      onInputValueChange={setInputValue}
      placeholder="Type + Enter to create…"
      triggerCls="w-52"
      inputProps={{
        onKeyDown: e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            setInputValue("")
            setValue(prev => [...prev, trimmed])
          }
        },
      }}
    />
  )
}

export function ComboboxExample() {
  const { data: list, isLoading } = useAsyncOptions()

  return (
    <div className="flex flex-wrap gap-6 p-4">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">canCreate — click</span>
        <ClickCreate />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">canCreate — enter</span>
        <EnterCreate />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">basic</span>
        <ComboboxWrapper
          items={options}
          placeholder="Select item"
          triggerCls="w-40"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Async + multiple + indicatorAt left</span>
        <ComboboxWrapper
          multiple
          items={list || []}
          isLoading={isLoading}
          placeholder="Select items"
          indicatorAt="left"
          triggerCls="w-44"
        />
      </div>
    </div>
  )
}
