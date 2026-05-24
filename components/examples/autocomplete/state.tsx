'use client'

import * as React from 'react'

import { fruits } from '@/components/examples/data/options'
import { AutocompleteWrapper } from '@/components/ui/autocomplete'

export function ControlledExample() {
  const [value, setValue] = React.useState('')

  return (
    <div className="flex flex-col gap-2 w-64">
      <AutocompleteWrapper
        items={fruits}
        value={value}
        onValueChange={setValue}
        placeholder="Search fruit..."
        showClear
      />
      {value && (
        <p className="text-sm text-muted-foreground">
          Value: <span className="font-medium text-foreground">{value}</span>
        </p>
      )}
    </div>
  )
}

export function DisabledExample() {
  return (
    <AutocompleteWrapper
      items={fruits}
      placeholder="Search fruit..."
      disabled
      className="w-64"
    />
  )
}
