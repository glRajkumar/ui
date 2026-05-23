'use client'

import { useState } from 'react'

import { ExItem, ExRow } from '@/components/examples/common'
import { RadioGroup, RadioWrapper, Radio } from '@/components/ui/radio-group'

function BasicExample() {
  return (
    <RadioWrapper
      defaultValue="email"
      options={[
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
      <RadioWrapper
        value={value}
        onValueChange={(v) => setValue(v as string)}
        options={[
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
    <RadioWrapper
      defaultValue="light"
      orientation="horizontal"
      options={[
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
      <Radio value="a" label="Option A" description="First choice." />
      <Radio value="b" label="Option B" description="Second choice." />
      <Radio value="c" label="Option C" disabled />
    </RadioGroup>
  )
}

export function RadioGroupExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="RadioWrapper">
        <ExItem label="options — with descriptions and disabled">
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
        <ExItem label="RadioGroup + Radio — manual composition">
          <PrimitiveExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
