'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

import { TooltipProvider, TooltipWrapper } from '@/components/ui/tooltip'
import { ExItem, ExRow } from '@/components/examples/common'

function BasicExample() {
  return (
    <TooltipWrapper
      trigger="Hover me"
      triggerCls="px-4 py-1.5 border rounded text-sm"
      content="Tooltip text"
    />
  )
}

function DelayExample() {
  return (
    <div className="flex gap-3">
      <TooltipWrapper
        trigger="Instant"
        triggerCls="px-4 py-1.5 border rounded text-sm"
        content="No delay"
        triggerProps={{ delay: 0 }}
      />
      <TooltipWrapper
        trigger="600 ms"
        triggerCls="px-4 py-1.5 border rounded text-sm"
        content="Opens after 600 ms"
        triggerProps={{ delay: 600 }}
      />
      <TooltipWrapper
        trigger="Close delay"
        triggerCls="px-4 py-1.5 border rounded text-sm"
        content="500 ms close grace period"
        triggerProps={{ closeDelay: 500 }}
      />
    </div>
  )
}

function ProviderExample() {
  return (
    <TooltipProvider delay={600} closeDelay={200}>
      <div className="flex gap-3">
        {(['First', 'Second', 'Third'] as const).map((label) => (
          <TooltipWrapper
            key={label}
            trigger={label}
            triggerCls="px-4 py-1.5 border rounded text-sm"
            content={`${label} tooltip`}
          />
        ))}
      </div>
    </TooltipProvider>
  )
}

function ArrowExample() {
  return (
    <div className="flex gap-3">
      <TooltipWrapper
        trigger="With arrow"
        triggerCls="px-4 py-1.5 border rounded text-sm"
        content="Arrow shown (default)"
      />
      <TooltipWrapper
        trigger="No arrow"
        triggerCls="px-4 py-1.5 border rounded text-sm"
        content="Arrow hidden"
        contentProps={{ showArrow: false }}
      />
    </div>
  )
}

function RenderPropExample() {
  return (
    <TooltipWrapper
      triggerProps={{
        render: (props, state) => (
          <button
            {...props}
            className={cn(
              'px-4 py-1.5 rounded text-sm border transition-colors',
              state.open ? 'bg-foreground text-background' : '',
            )}
          >
            {state.open ? 'Showing ✓' : 'Hover'}
          </button>
        ),
      }}
      content="Trigger style reacts to open state."
    />
  )
}

function ControlledExample() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-1.5 border rounded text-sm"
      >
        {open ? 'Hide' : 'Show'} tooltip
      </button>
      <TooltipWrapper
        open={open}
        onOpenChange={setOpen}
        trigger="Target"
        triggerCls="px-4 py-1.5 border rounded text-sm"
        content="Controlled tooltip"
      />
    </div>
  )
}

function SideExample() {
  const sides = ['top', 'right', 'bottom', 'left'] as const

  return (
    <div className="grid grid-cols-2 gap-2">
      {sides.map((side) => (
        <TooltipWrapper
          key={side}
          trigger={side}
          triggerCls="px-4 py-1.5 border rounded text-sm capitalize w-full"
          content={`Anchored to ${side}`}
          contentProps={{ side }}
        />
      ))}
    </div>
  )
}

export function TooltipExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="Default — hover trigger, top placement, arrow shown">
          <BasicExample />
        </ExItem>
      </ExRow>

      <ExRow label="Delay">
        <ExItem label="delay / closeDelay — per-tooltip timing">
          <DelayExample />
        </ExItem>
        <ExItem label="TooltipProvider — shared delay + instant-reopen window across multiple tooltips">
          <ProviderExample />
        </ExItem>
      </ExRow>

      <ExRow label="Arrow">
        <ExItem label="showArrow — toggle the directional arrow (default: true)">
          <ArrowExample />
        </ExItem>
      </ExRow>

      <ExRow label="Render prop trigger">
        <ExItem label="triggerProps.render — trigger style reacts to open state, no useState needed">
          <RenderPropExample />
        </ExItem>
      </ExRow>

      <ExRow label="Controlled">
        <ExItem label="open + onOpenChange — driven by external state">
          <ControlledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Positioning">
        <ExItem label="side — top / right / bottom / left">
          <SideExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
