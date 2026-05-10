'use client'

import { useState } from 'react'

import { ExItem, ExRow } from '@/components/examples/common'
import { RadioGroup, RadioGroupWrapper, RadioWrapper } from '@/components/ui/radio-group'

function BasicExample() {
  return (
    <RadioGroupWrapper
      defaultValue="email"
      items={[
        { value: 'email', label: 'Email', description: 'Receive updates via email.' },
        { value: 'sms', label: 'SMS', description: 'Receive updates via text.' },
        { value: 'push', label: 'Push notifications' },
        { value: 'disabled', label: 'Unavailable option', disabled: true },
      ]}
    />
  )
}

function ControlledExample() {
  const [value, setValue] = useState('email')

  return (
    <div className="flex flex-col gap-3">
      <RadioGroupWrapper
        value={value}
        onValueChange={(v) => setValue(v as string)}
        items={[
          { value: 'email', label: 'Email' },
          { value: 'sms', label: 'SMS' },
          { value: 'push', label: 'Push' },
        ]}
      />
      <p className="text-sm text-muted-foreground">Selected: {value}</p>
    </div>
  )
}

function HorizontalExample() {
  return (
    <RadioGroupWrapper
      defaultValue="light"
      orientation="horizontal"
      items={[
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'system', label: 'System' },
      ]}
    />
  )
}

function PrimitiveExample() {
  return (
    <RadioGroup defaultValue="b">
      <RadioWrapper value="a" label="Option A" description="First choice." />
      <RadioWrapper value="b" label="Option B" description="Second choice." />
      <RadioWrapper value="c" label="Option C" disabled />
    </RadioGroup>
  )
}

export function RadioGroupExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="RadioGroupWrapper">
        <ExItem label="items — with descriptions and disabled">
          <BasicExample />
        </ExItem>
        <ExItem label="value + onValueChange — controlled">
          <ControlledExample />
        </ExItem>
        <ExItem label="orientation: horizontal">
          <HorizontalExample />
        </ExItem>
      </ExRow>

      <ExRow label="Primitives">
        <ExItem label="RadioGroup + RadioWrapper — manual composition">
          <PrimitiveExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
