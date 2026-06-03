'use client'

import * as React from 'react'
import { Settings } from 'lucide-react'

import { ExRow, ExItem } from '@/components/examples/common'
import { CollapsibleWrapper } from '@/components/ui/collapsible'
import { buttonVariants } from '@/components/ui/button'

function BasicExample() {
  return (
    <CollapsibleWrapper trigger="Details" className="w-72 rounded-lg border p-3">
      <p className="mt-2 text-sm text-muted-foreground">
        This panel collapses and expands with a smooth height animation.
      </p>
    </CollapsibleWrapper>
  )
}

function IndicatorLeftExample() {
  return (
    <CollapsibleWrapper trigger="Details" indicatorAt="left" className="w-72 rounded-lg border p-3">
      <p className="mt-2 text-sm text-muted-foreground">Chevron indicator on the left side.</p>
    </CollapsibleWrapper>
  )
}

function DefaultOpenExample() {
  return (
    <CollapsibleWrapper
      defaultOpen
      trigger="Open by default"
      className="w-72 rounded-lg border p-3"
    >
      <p className="mt-2 text-sm text-muted-foreground">
        This panel starts expanded. User can collapse it.
      </p>
    </CollapsibleWrapper>
  )
}

function DisabledExample() {
  return (
    <CollapsibleWrapper disabled trigger="Disabled" className="w-72 rounded-lg border p-3">
      <p className="mt-2 text-sm text-muted-foreground">Unreachable content.</p>
    </CollapsibleWrapper>
  )
}

function ControlledExample() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-2">
      <button
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
        onClick={() => setOpen(p => !p)}
      >
        {open ? 'Collapse' : 'Expand'} externally
      </button>

      <CollapsibleWrapper
        open={open}
        onOpenChange={setOpen}
        trigger="Controlled panel"
        className="w-72 rounded-lg border p-3"
      >
        <p className="mt-2 text-sm text-muted-foreground">
          Open state controlled externally — button above also toggles it.
        </p>
      </CollapsibleWrapper>
    </div>
  )
}

function KeepMountedExample() {
  return (
    <CollapsibleWrapper
      trigger="Keep Mounted"
      contentProps={{ keepMounted: true }}
      className="w-72 rounded-lg border p-3"
    >
      <p className="mt-2 text-sm text-muted-foreground">Panel DOM stays mounted when closed.</p>
    </CollapsibleWrapper>
  )
}

function CustomTriggerExample() {
  return (
    <CollapsibleWrapper
      trigger={
        <>
          <Settings className="size-4" /> Settings
        </>
      }
      triggerProps={{
        render: <div role="button" tabIndex={0} />,
        nativeButton: false,
      }}
      triggerCls="flex cursor-pointer items-center gap-2 rounded-md border border-dashed px-3 py-1.5 text-sm hover:bg-muted"
      className="w-72 rounded-lg border p-3"
    >
      <p className="mt-3 text-sm text-muted-foreground">
        Custom div trigger — not a native button element.
      </p>
    </CollapsibleWrapper>
  )
}

export function CollapsibleExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="Right indicator (default)">
          <BasicExample />
        </ExItem>
        <ExItem label="Left indicator">
          <IndicatorLeftExample />
        </ExItem>
        <ExItem label="Open by default">
          <DefaultOpenExample />
        </ExItem>
        <ExItem label="Disabled">
          <DisabledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Controlled">
        <ExItem label="External open state + built-in trigger">
          <ControlledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Panel">
        <ExItem label="Keep mounted — DOM preserved when closed">
          <KeepMountedExample />
        </ExItem>
      </ExRow>

      <ExRow label="Triggers">
        <ExItem label="Custom element trigger (div)">
          <CustomTriggerExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
