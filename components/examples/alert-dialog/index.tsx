'use client'

import {
  BasicExample,
  NoDescriptionExample,
  NoActionExample,
  WithMediaExample,
  CustomStylingExample,
} from './basic'
import { ControlledExample, ControlledWithTriggerExample } from './controlled'
import { AsyncActionExample } from './async-action'
import { DetachedTriggerExample, MultipleDetachedExample } from './detached'

function ExRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

export function AlertDialogExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <BasicExample />
        <NoDescriptionExample />
        <NoActionExample />
        <WithMediaExample />
        <CustomStylingExample />
      </ExRow>

      <ExRow label="Controlled">
        <ControlledExample />
        <ControlledWithTriggerExample />
      </ExRow>

      <ExRow label="Detached">
        <DetachedTriggerExample />
        <MultipleDetachedExample />
      </ExRow>

      <ExRow label="Async">
        <AsyncActionExample />
      </ExRow>
    </div>
  )
}
