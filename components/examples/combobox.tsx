'use client'

import { useState } from 'react'

import { useAsyncOptions } from '@/hooks/use-options'
import { options } from './data'

import { ComboboxWrapper } from '@/components/ui/combobox'

export function ComboboxExample() {
  const { data: list, isLoading } = useAsyncOptions()

  const [values, setValues] = useState<allowedPrimitiveT[]>([])
  const [value, setValue] = useState<allowedPrimitiveT>('')

  return (
    <>
      <ComboboxWrapper items={options} placeholder="Select item" triggerCls="w-40" />

      <ComboboxWrapper multiple items={options} placeholder="Multi-Select item" triggerCls="w-40" />

      <ComboboxWrapper
        value={value ? `${value}` : undefined}
        items={list || []}
        isLoading={isLoading}
        onValueChange={v => setValue(v as any)}
        placeholder="Select item"
        triggerCls="w-40"
      />

      <ComboboxWrapper
        multiple
        value={values}
        items={list || []}
        isLoading={isLoading}
        onValueChange={setValues}
        placeholder="Select item"
        triggerCls="w-40"
      />
    </>
  )
}
