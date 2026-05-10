'use client'

import * as React from 'react'

import { ExItem, ExRow } from '@/components/examples/common'
import { PopoverClose, PopoverWrapper } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// ── Trigger behaviour ─────────────────────────────────────────────────────────

function ClickExample() {
  return (
    <PopoverWrapper
      trigger="Click me"
      triggerCls="px-4 py-1.5 border rounded text-sm"
      title="Popover title"
      description="Supporting description text."
    />
  )
}

function HoverExample() {
  return (
    <PopoverWrapper
      trigger="Hover me"
      triggerCls="px-4 py-1.5 border rounded text-sm"
      triggerProps={{ openOnHover: true }}
      title="Popover title"
      description="Supporting description text."
    />
  )
}

function HoverDelayExample() {
  return (
    <PopoverWrapper
      trigger="Hover (delayed)"
      triggerCls="px-4 py-1.5 border rounded text-sm"
      triggerProps={{ openOnHover: true, delay: 800, closeDelay: 500 }}
      title="Popover title"
      description="Supporting description text."
    />
  )
}

function RenderPropExample() {
  return (
    <PopoverWrapper
      triggerProps={{
        render: (props, state) => (
          <button
            {...props}
            className={cn(
              'px-4 py-1.5 rounded text-sm border transition-colors',
              state.open ? 'bg-foreground text-background' : '',
            )}
          >
            {state.open ? 'Close ✕' : 'Open'}
          </button>
        ),
      }}
      title="Render prop trigger"
      description="Label and style react to open state — no extra useState needed."
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
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-1.5 border rounded text-sm"
      >
        {open ? 'Close' : 'Open'} externally
      </button>
      <PopoverWrapper
        open={open}
        onOpenChange={setOpen}
        trigger="Anchor"
        triggerCls="px-4 py-1.5 border rounded text-sm"
        title="Popover title"
        description="Supporting description text."
      />
    </div>
  )
}

// ── Detached triggers ─────────────────────────────────────────────────────────

const MEMBERS = [
  { name: 'Alice Chen', role: 'Product Designer' },
  { name: 'Bob Martinez', role: 'Frontend Engineer' },
  { name: 'Carol Smith', role: 'Engineering Manager' },
]

function DetachedExample() {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<(typeof MEMBERS)[0] | null>(null)

  return (
    <div className="flex items-start gap-6">
      {/* Triggers — live outside Popover.Root */}
      <div className="flex flex-col gap-1.5">
        {MEMBERS.map((m) => (
          <div
            key={m.name}
            className="flex items-center justify-between gap-6 border rounded px-3 py-2 text-sm"
          >
            <span>{m.name}</span>
            <button
              type="button"
              className="text-xs text-muted-foreground underline underline-offset-2"
              onClick={() => {
                setSelected(m)
                setOpen(true)
              }}
            >
              details
            </button>
          </div>
        ))}
      </div>

      {/* Anchor — popover always appears here regardless of which row triggered it */}
      <PopoverWrapper
        open={open}
        onOpenChange={setOpen}
        trigger="Panel"
        triggerCls="px-3 py-1.5 border rounded text-sm self-start"
        title={selected?.name}
        description={selected?.role}
      />
    </div>
  )
}

// ── Arrow ─────────────────────────────────────────────────────────────────────

function ArrowExample() {
  return (
    <div className="flex gap-3">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <PopoverWrapper
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

// ── Modal ─────────────────────────────────────────────────────────────────────

function ModalExample() {
  return (
    <PopoverWrapper
      modal
      trigger="Open modal"
      triggerCls="px-4 py-1.5 border rounded text-sm"
      title="Modal popover"
      description="Scroll and pointer events outside are blocked. Focus is trapped inside."
      content={
        <PopoverClose className="mt-1 self-end rounded border px-3 py-1 text-xs">
          Close
        </PopoverClose>
      }
    />
  )
}

// ── Positioning ───────────────────────────────────────────────────────────────

function SidesExample() {
  const sides = ['top', 'right', 'bottom', 'left'] as const

  return (
    <div className="grid grid-cols-2 gap-2">
      {sides.map((side) => (
        <PopoverWrapper
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

export function PopoverExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Trigger behaviour">
        <ExItem label="Click — default, toggles on click">
          <ClickExample />
        </ExItem>
        <ExItem label="Hover — opens immediately on pointer enter, no click needed">
          <HoverExample />
        </ExItem>
        <ExItem label="Hover + delay — 800 ms open delay, 500 ms close grace period">
          <HoverDelayExample />
        </ExItem>
        <ExItem label="Render prop — trigger element and label reflect open state">
          <RenderPropExample />
        </ExItem>
      </ExRow>

      <ExRow label="Controlled">
        <ExItem label="External state — button outside PopoverWrapper drives open/close">
          <ControlledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Detached triggers">
        <ExItem label='Row "details" links are outside Popover.Root — all open the same anchored panel'>
          <DetachedExample />
        </ExItem>
      </ExRow>

      <ExRow label="Arrow">
        <ExItem label="showArrow — directional arrow points back at the trigger">
          <ArrowExample />
        </ExItem>
      </ExRow>

      <ExRow label="Modal">
        <ExItem label="modal — blocks scroll + pointer outside, traps focus, requires Close button">
          <ModalExample />
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
