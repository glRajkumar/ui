'use client'

import * as React from 'react'

import { ExItem, ExRow } from '@/components/examples/common'
import { HoverCardWrapper } from '@/components/ui/hover-card'

// ── Trigger behaviour ─────────────────────────────────────────────────────────

function BasicExample() {
  return (
    <HoverCardWrapper
      trigger="@glrk_ui"
      triggerCls="px-4 py-1.5 border rounded text-sm"
      title="Glrk UI"
      description="shadcn/ui wrapper library built on Base UI primitives."
    />
  )
}

function DelayExample() {
  return (
    <HoverCardWrapper
      trigger="Hover (delayed)"
      triggerCls="px-4 py-1.5 border rounded text-sm"
      triggerProps={{ delay: 800, closeDelay: 500 }}
      title="Delayed card"
      description="800 ms open delay, 500 ms close grace period."
    />
  )
}

function CustomContentExample() {
  return (
    <HoverCardWrapper
      trigger="View profile"
      triggerCls="px-4 py-1.5 border rounded text-sm"
      content={
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
            AC
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Alice Chen</span>
            <span className="text-xs text-muted-foreground">Product Designer</span>
          </div>
        </div>
      }
    />
  )
}

// ── Controlled ────────────────────────────────────────────────────────────────

function ControlledExample() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="px-4 py-1.5 border rounded text-sm"
      >
        {open ? 'Close' : 'Open'} externally
      </button>
      <HoverCardWrapper
        open={open}
        onOpenChange={setOpen}
        trigger="Anchor"
        triggerCls="px-4 py-1.5 border rounded text-sm"
        title="Controlled card"
        description="Driven by external state."
      />
    </div>
  )
}

// ── Arrow ─────────────────────────────────────────────────────────────────────

function ArrowExample() {
  return (
    <div className="flex gap-3">
      {(['top', 'bottom', 'left', 'right'] as const).map(side => (
        <HoverCardWrapper
          key={side}
          trigger={side}
          triggerCls="px-3 py-1.5 border rounded text-sm capitalize"
          contentProps={{ side, showArrow: true, sideOffset: 10 }}
          title={`side: ${side}`}
          description="Arrow points toward trigger."
        />
      ))}
    </div>
  )
}

// ── Positioning ───────────────────────────────────────────────────────────────

function SidesExample() {
  const sides = ['top', 'right', 'bottom', 'left'] as const

  return (
    <div className="grid grid-cols-2 gap-2">
      {sides.map(side => (
        <HoverCardWrapper
          key={side}
          trigger={side}
          triggerCls="px-4 py-1.5 border rounded text-sm capitalize w-full"
          contentProps={{ side }}
          content={`Anchored to ${side}`}
        />
      ))}
    </div>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────

export function HoverCardExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Trigger behaviour">
        <ExItem label="Basic — opens on hover with default delay">
          <BasicExample />
        </ExItem>
        <ExItem label="Delay — 800 ms open delay, 500 ms close grace period">
          <DelayExample />
        </ExItem>
        <ExItem label="Custom content — arbitrary node instead of title/description">
          <CustomContentExample />
        </ExItem>
      </ExRow>

      <ExRow label="Controlled">
        <ExItem label="External state — button outside HoverCardWrapper drives open/close">
          <ControlledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Arrow">
        <ExItem label="showArrow — directional arrow points back at the trigger">
          <ArrowExample />
        </ExItem>
      </ExRow>

      <ExRow label="Positioning">
        <ExItem label="side — top / right / bottom / left">
          <SidesExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
