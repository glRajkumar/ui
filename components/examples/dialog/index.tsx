'use client'

import { ExRow } from '@/components/examples/common'

import {
  BasicExample,
  NoDescriptionExample,
  NoActionExample,
  NoCloseButtonExample,
  IconTriggerExample,
} from './basic'
import {
  CustomElementTriggerExample,
  DetachedTriggerExample,
  MultipleTriggersExample,
} from './triggers'
import { ControlledExample, AsyncActionExample } from './controlled'
import { NestedDialogExample, MultipleOpenExample } from './advanced'

export function DialogExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <BasicExample />
        <NoDescriptionExample />
        <NoActionExample />
        <NoCloseButtonExample />
        <IconTriggerExample />
      </ExRow>

      <ExRow label="Triggers">
        <CustomElementTriggerExample />
        <DetachedTriggerExample />
        <MultipleTriggersExample />
      </ExRow>

      <ExRow label="Advanced">
        <NestedDialogExample />
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
