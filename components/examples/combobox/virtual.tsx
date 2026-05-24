'use client'

import * as React from 'react'

import { generateLargeList } from '@/components/examples/data'
import { ComboboxVirtualisedWrapper } from '@/components/ui/combobox'

const largeList = generateLargeList(1000)

export function VirtualisedExample() {
  return (
    <ComboboxVirtualisedWrapper
      items={largeList}
      placeholder="Search 1000 options…"
      triggerCls="w-64"
      showClear
    />
  )
}

export function VirtualisedCustomSizeExample() {
  return (
    <ComboboxVirtualisedWrapper
      items={largeList}
      placeholder="Search 1000 options…"
      triggerCls="w-64"
      showClear
      maxHeight={200}
      virtualizerOptions={{ overscan: 10 }}
    />
  )
}
