'use client'

import { fruits, grouped, withSeparator } from '@/components/examples/data/options'
import { SelectWrapper } from '@/components/ui/select'

export function FlatExample() {
  return <SelectWrapper options={fruits} placeholder="Select fruit" triggerCls="w-44" />
}

export function GroupedExample() {
  return <SelectWrapper options={grouped} placeholder="Select fruit" triggerCls="w-44" />
}

export function SeparatorExample() {
  return <SelectWrapper options={withSeparator} placeholder="Select team" triggerCls="w-44" />
}

export function IndicatorRightExample() {
  return <SelectWrapper options={fruits} placeholder="Select fruit" triggerCls="w-44" />
}

export function IndicatorLeftExample() {
  return (
    <SelectWrapper
      options={fruits}
      placeholder="Select fruit"
      triggerCls="w-44"
      indicatorAt="left"
    />
  )
}
