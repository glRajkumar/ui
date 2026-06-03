'use client'

import { ExRow } from '@/components/examples/common'

import {
  BasicExample,
  NoActionExample,
  SideBottomExample,
  SideTopExample,
  SideLeftExample,
  SideRightExample,
} from './basic'
import { SnapPointsExample, NonModalExample, NestedDrawerExample } from './advanced'
import { ControlledExample, AsyncActionExample } from './controlled'

export function DrawerExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <BasicExample />
        <NoActionExample />
      </ExRow>

      <ExRow label="Sides">
        <SideBottomExample />
        <SideTopExample />
        <SideLeftExample />
        <SideRightExample />
      </ExRow>

      <ExRow label="Advanced">
        <SnapPointsExample />
        <NonModalExample />
        <NestedDrawerExample />
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
