'use client'

import * as React from 'react'

import { fruits } from '@/components/examples/data/options'
import { renderSearchStatus, renderSearchEmpty } from '@/components/examples/common'
import { AutocompleteWrapper } from '@/components/ui/autocomplete'

export function AsyncSearchExample() {
  const [inputValue, setInputValue] = React.useState('')
  const [results, setResults] = React.useState<string[]>([])
  const [isFetching, setIsFetching] = React.useState(false)
  const [hasTyped, setHasTyped] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleValueChange(val: string) {
    setInputValue(val)
    const typed = val.trim().length > 0
    setHasTyped(typed)
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!typed) {
      setResults([])
      setIsFetching(false)
      return
    }
    setIsFetching(true)
    timerRef.current = setTimeout(() => {
      setResults(
        fruits.filter(f => String(f).toLowerCase().includes(val.toLowerCase())) as string[],
      )
      setIsFetching(false)
    }, 400)
  }

  return (
    <AutocompleteWrapper
      items={results}
      value={inputValue}
      onValueChange={handleValueChange}
      filter={null}
      placeholder="Type to search fruit…"
      showClear
      className="w-64"
      renderStatus={renderSearchStatus(false, isFetching)}
      renderEmpty={renderSearchEmpty(hasTyped, false, isFetching)}
    />
  )
}
