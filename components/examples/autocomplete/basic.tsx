'use client'

import { fruits, frameworks, groupedTech } from '@/components/examples/data/options'
import { AutocompleteWrapper } from '@/components/ui/autocomplete'

export function BasicExample() {
  return (
    <AutocompleteWrapper
      items={fruits}
      placeholder="Search fruit..."
      className="w-64"
    />
  )
}

export function WithClearExample() {
  return (
    <AutocompleteWrapper
      items={fruits}
      placeholder="Search fruit..."
      showClear
      className="w-64"
    />
  )
}

export function WithTriggerExample() {
  return (
    <AutocompleteWrapper
      items={frameworks}
      placeholder="Select framework..."
      showTrigger
      showClear
      className="w-64"
    />
  )
}

export function GroupedExample() {
  return (
    <AutocompleteWrapper
      items={groupedTech}
      placeholder="Search tech..."
      showClear
      className="w-64"
    />
  )
}

export function LimitExample() {
  return (
    <AutocompleteWrapper
      items={fruits}
      placeholder="Max 5 results..."
      limit={5}
      className="w-64"
    />
  )
}

export function InlineModeExample() {
  return (
    <AutocompleteWrapper
      items={fruits}
      placeholder="Start typing..."
      mode="inline"
      className="w-64"
    />
  )
}
