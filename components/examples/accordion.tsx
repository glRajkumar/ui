'use client'

import * as React from 'react'
import { ShieldCheck } from 'lucide-react'

import { ExRow } from '@/components/examples/common'
import { AccordionWrapper } from '@/components/ui/accordion'
import { accordionItems } from './data'

const items = accordionItems

function SingleOpenExample() {
  return <AccordionWrapper items={items} className="w-80" />
}

function MultipleOpenExample() {
  return <AccordionWrapper items={items} multiple className="w-80" />
}

function IndicatorLeftExample() {
  return <AccordionWrapper items={items} indicatorAt="left" className="w-80" />
}

function DefaultOpenExample() {
  return <AccordionWrapper items={items} defaultValue={['item-1']} className="w-80" />
}

function DisabledItemExample() {
  return (
    <AccordionWrapper
      items={[
        { value: 'a', trigger: 'Enabled', content: 'This item works normally.' },
        { value: 'b', trigger: 'Disabled', content: 'Unreachable.', itemProps: { disabled: true } },
        { value: 'c', trigger: 'Enabled', content: 'This item also works.' },
      ]}
      className="w-80"
    />
  )
}

function DisabledRootExample() {
  return <AccordionWrapper items={items} disabled className="w-80" />
}

function PersistStateExample() {
  return (
    <AccordionWrapper
      items={[
        {
          value: 'counter',
          trigger: 'Keep Mounted — open, count up, close, reopen',
          content: <Counter />,
        },
        { value: 'other', trigger: 'Another item', content: 'Content here.' },
      ]}
      contentProps={{ keepMounted: true }}
      className="w-80"
    />
  )
}

function Counter() {
  const [count, setCount] = React.useState(0)
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">Count: <strong>{count}</strong></span>
      <button
        onClick={() => setCount(c => c + 1)}
        className="rounded border px-2 py-0.5 text-xs hover:bg-muted"
      >
        +1
      </button>
      <span className="text-xs text-muted-foreground">(persists when closed)</span>
    </div>
  )
}

function HiddenUntilFoundExample() {
  return (
    <AccordionWrapper
      items={[
        {
          value: 'search',
          trigger: 'Hidden Until Found — try Ctrl+F "findable"',
          content: 'This findable text is discoverable by browser search even when panel is closed.',
        },
        { value: 'other', trigger: 'Another item', content: 'Regular content.' },
      ]}
      contentProps={{ hiddenUntilFound: true }}
      className="w-80"
    />
  )
}

function ControlledExample() {
  const [value, setValue] = React.useState<string[]>(['item-1'])

  return (
    <AccordionWrapper
      items={items}
      value={value}
      onValueChange={(val) => setValue(val as string[])}
      multiple
      className="w-80"
    />
  )
}

function CustomStyleExample() {
  return (
    <AccordionWrapper
      items={[
        {
          value: 'a',
          trigger: <><ShieldCheck className="size-4 text-emerald-500" /> Security</>,
          content: 'End-to-end encrypted. Your data never leaves the device.',
          contentCls: 'bg-emerald-50 dark:bg-emerald-950/30 rounded-md text-emerald-700 dark:text-emerald-300',
        },
        {
          value: 'b',
          trigger: 'Performance',
          content: 'Optimised for sub-100ms response times across all regions.',
          contentCls: 'bg-blue-50 dark:bg-blue-950/30 rounded-md text-blue-700 dark:text-blue-300',
        },
        {
          value: 'c',
          trigger: 'Pricing',
          content: 'Free tier includes 10k requests/month. No credit card required.',
          contentCls: 'bg-violet-50 dark:bg-violet-950/30 rounded-md text-violet-700 dark:text-violet-300',
        },
      ]}
      triggerCls="font-semibold"
      itemCls="border-l-2 border-muted pl-3 not-last:border-b-0"
      className="w-80"
    />
  )
}

function CustomHeadingExample() {
  return (
    <AccordionWrapper
      items={items.map(item => ({
        ...item,
        trigger: (
          <span className="flex items-center gap-2">
            {item.trigger}
            <span className="ml-auto rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">h2</span>
          </span>
        ),
      }))}
      triggerProps={{ headerProps: { render: <h2 /> } }}
      className="w-80"
    />
  )
}

export function AccordionExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <SingleOpenExample />
        <MultipleOpenExample />
        <IndicatorLeftExample />
      </ExRow>

      <ExRow label="State">
        <DefaultOpenExample />
        <DisabledItemExample />
        <DisabledRootExample />
      </ExRow>

      <ExRow label="Panel Behaviour">
        <PersistStateExample />
        <HiddenUntilFoundExample />
      </ExRow>

      <ExRow label="Controlled">
        <ControlledExample />
      </ExRow>

      <ExRow label="Custom Style">
        <CustomStyleExample />
        <CustomHeadingExample />
      </ExRow>
    </div>
  )
}
