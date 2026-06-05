'use client'

import * as React from 'react'

import { generateLargeList } from '@/components/examples/data'
import { AutocompleteVirtualisedWrapper } from '@/components/ui/autocomplete-virtualised'

const largeList = generateLargeList(1000)

export function VirtualisedExample() {
  return (
    <AutocompleteVirtualisedWrapper
      items={largeList}
      placeholder="Search 1000 items…"
      showClear
      className="w-64"
    />
  )
}

export function VirtualisedCustomSizeExample() {
  return (
    <AutocompleteVirtualisedWrapper
      items={largeList}
      placeholder="Search 1000 options…"
      showClear
      className="w-64"
      maxHeight={200}
      virtualizerOptions={{ overscan: 10 }}
    />
  )
}
