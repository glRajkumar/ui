'use client'

import { fruits, grouped, withSeparator } from '@/components/examples/data/options'
import { SelectWrapper } from '@/components/ui/select'

export function FlatExample() {
  return <SelectWrapper items={fruits} placeholder="Select fruit" triggerCls="w-44" />
}

export function GroupedExample() {
  return <SelectWrapper items={grouped} placeholder="Select fruit" triggerCls="w-44" />
}

export function SeparatorExample() {
  return <SelectWrapper items={withSeparator} placeholder="Select team" triggerCls="w-44" />
}

export function IndicatorRightExample() {
  return <SelectWrapper items={fruits} placeholder="Select fruit" triggerCls="w-44" />
}

export function IndicatorLeftExample() {
  return (
    <SelectWrapper items={fruits} placeholder="Select fruit" triggerCls="w-44" indicatorAt="left" />
  )
}
