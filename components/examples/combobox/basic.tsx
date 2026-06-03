'use client'

import { fruits, grouped, withSeparator } from '@/components/examples/data/options'
import { ComboboxWrapper } from '@/components/ui/combobox'

export function FlatExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" />
}

export function GroupedExample() {
  return <ComboboxWrapper items={grouped} placeholder="Select fruit" triggerCls="w-52" />
}

export function SeparatorExample() {
  return <ComboboxWrapper items={withSeparator} placeholder="Select team" triggerCls="w-52" />
}

export function WithTriggerExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" />
}

export function WithClearExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" showClear />
}

export function SearchOnlyExample() {
  return (
    <ComboboxWrapper items={fruits} placeholder="Search…" triggerCls="w-52" showTrigger={false} />
  )
}

export function IndicatorRightExample() {
  return <ComboboxWrapper items={fruits} placeholder="Select fruit" triggerCls="w-52" />
}

export function IndicatorLeftExample() {
  return (
    <ComboboxWrapper
      items={fruits}
      placeholder="Select fruit"
      triggerCls="w-52"
      indicatorAt="left"
    />
  )
}
