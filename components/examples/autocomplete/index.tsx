'use client'

import { ExRow, ExItem } from '@/components/examples/common'

import {
  BasicExample,
  WithClearExample,
  WithTriggerExample,
  GroupedExample,
  LimitExample,
  InlineModeExample,
} from './basic'
import {
  ControlledExample,
  DisabledExample,
} from './state'
import {
  AsyncSearchExample,
} from './advanced'
import { VirtualisedExample, VirtualisedCustomSizeExample } from './virtual'

export function AutocompleteExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="Default — type to filter">
          <BasicExample />
        </ExItem>
        <ExItem label="With clear — dismiss input value">
          <WithClearExample />
        </ExItem>
        <ExItem label="With trigger — toggle popup">
          <WithTriggerExample />
        </ExItem>
      </ExRow>

      <ExRow label="Options">
        <ExItem label="Grouped — options under labelled sections">
          <GroupedExample />
        </ExItem>
        <ExItem label="Limit — max 5 suggestions shown">
          <LimitExample />
        </ExItem>
        <ExItem label="Inline mode — completes input text inline">
          <InlineModeExample />
        </ExItem>
      </ExRow>

      <ExRow label="State">
        <ExItem label="Controlled — value + onValueChange">
          <ControlledExample />
        </ExItem>
        <ExItem label="Disabled">
          <DisabledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Async">
        <ExItem label="Async search — filter=null, results fetched on typing, 400ms debounce">
          <AsyncSearchExample />
        </ExItem>
      </ExRow>

      <ExRow label="Virtualised">
        <ExItem label="1000 items — virtualised list">
          <VirtualisedExample />
        </ExItem>
        <ExItem label="1000 items — custom height + overscan">
          <VirtualisedCustomSizeExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
