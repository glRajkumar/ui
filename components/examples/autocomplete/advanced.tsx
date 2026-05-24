'use client'

import * as React from 'react'

import { fruits } from '@/components/examples/data/options'
import { AutocompleteWrapper } from '@/components/ui/autocomplete'

export function AsyncExample() {
  const [inputValue, setInputValue] = React.useState('')
  const [results, setResults] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleValueChange(val: string) {
    setInputValue(val)
    if (timerRef.current) clearTimeout(timerRef.current)

    if (!val.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    timerRef.current = setTimeout(() => {
      setResults(fruits.filter(f => String(f).toLowerCase().includes(val.toLowerCase())) as string[])
      setLoading(false)
    }, 500)
  }

  return (
    <AutocompleteWrapper
      items={results}
      value={inputValue}
      onValueChange={handleValueChange}
      filter={null}
      isLoading={loading}
      placeholder="Search fruit (500ms debounce)..."
      showClear
      className="w-64"
    />
  )
}
