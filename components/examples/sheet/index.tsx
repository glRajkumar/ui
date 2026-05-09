'use client'

import { ExRow } from '@/components/examples/common'

import { BasicExample, NoActionExample, NoCloseButtonExample, SideRightExample, SideLeftExample, SideTopExample, SideBottomExample } from './basic'
import { NestedSheetExample, MultipleOpenExample } from './advanced'
import { ControlledExample, AsyncActionExample } from './controlled'

export function SheetExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <BasicExample />
        <NoActionExample />
        <NoCloseButtonExample />
      </ExRow>

      <ExRow label="Sides">
        <SideRightExample />
        <SideLeftExample />
        <SideTopExample />
        <SideBottomExample />
      </ExRow>

      <ExRow label="Advanced">
        <NestedSheetExample />
        <MultipleOpenExample />
      </ExRow>

      <ExRow label="Controlled">
        <ControlledExample />
      </ExRow>

      <ExRow label="Async">
        <AsyncActionExample />
      </ExRow>
    </div>
  )
}
