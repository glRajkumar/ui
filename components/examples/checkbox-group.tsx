'use client'

import { useState } from 'react'

import { ExItem, ExRow } from '@/components/examples/common'
import { CheckboxIndicator, Checkbox, CheckboxGroup, CheckboxWrapper } from '@/components/ui/checkbox-group'

function BasicExample() {
  return (
    <CheckboxWrapper
      defaultValue={['email']}
      options={[
        { value: 'email', label: 'Email', description: 'Notify via email.' },
        { value: 'sms', label: 'SMS', description: 'Notify via text message.' },
        { value: 'push', label: 'Push notifications' },
        { value: 'disabled', label: 'Unavailable option', disabled: true },
      ]}
    />
  )
}

function ParentExample() {
  return (
    <CheckboxWrapper
      defaultValue={['email']}
      parentLabel="All notifications"
      options={[
        { value: 'email', label: 'Email' },
        { value: 'sms', label: 'SMS' },
        { value: 'push', label: 'Push' },
      ]}
    />
  )
}

function ControlledExample() {
  const [value, setValue] = useState<string[]>(['email', 'sms'])

  return (
    <div className="flex flex-col gap-3">
      <CheckboxWrapper
        value={value}
        onValueChange={(v) => setValue(v)}
        parentLabel="Select all"
        options={[
          { value: 'email', label: 'Email' },
          { value: 'sms', label: 'SMS' },
          { value: 'push', label: 'Push' },
        ]}
      />
      <p className="text-sm text-muted-foreground">Selected: {value.join(', ') || 'none'}</p>
    </div>
  )
}

function HorizontalExample() {
  return (
    <CheckboxWrapper
      orientation="horizontal"
      defaultValue={['react']}
      options={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'angular', label: 'Angular' },
      ]}
    />
  )
}

function PrimitiveExample() {
  return (
    <CheckboxGroup defaultValue={['b']}>
      <label className="flex cursor-pointer items-center gap-2">
        <CheckboxIndicator value="a" />
        <span className="text-sm">Option A</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2">
        <CheckboxIndicator value="b" />
        <span className="text-sm">Option B</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2">
        <CheckboxIndicator value="c" />
        <span className="text-sm">Option C</span>
      </label>
    </CheckboxGroup>
  )
}

function SingleCheckboxExample() {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox label="Accept terms and conditions" defaultChecked />
      <Checkbox
        label="Email notifications"
        description="Receive updates about your account activity."
      />
      <Checkbox label="Disabled option" disabled />
    </div>
  )
}

const FRUITS = ['apple', 'banana', 'cherry'] as const
type Fruit = (typeof FRUITS)[number]

function IndeterminateExample() {
  const [selected, setSelected] = useState<Fruit[]>(['apple'])

  const allChecked = selected.length === FRUITS.length
  const someChecked = selected.length > 0 && !allChecked

  function toggleParent() {
    setSelected(allChecked ? [] : [...FRUITS])
  }

  function toggleChild(fruit: Fruit) {
    setSelected((prev) =>
      prev.includes(fruit) ? prev.filter((f) => f !== fruit) : [...prev, fruit],
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="flex cursor-pointer select-none items-center gap-2">
        <CheckboxIndicator checked={allChecked} indeterminate={someChecked} onCheckedChange={toggleParent} />
        <span className="text-sm font-medium">All fruits</span>
      </label>
      <div className="ml-6 flex flex-col gap-2">
        {FRUITS.map((fruit) => (
          <label key={fruit} className="flex cursor-pointer select-none items-center gap-2">
            <CheckboxIndicator checked={selected.includes(fruit)} onCheckedChange={() => toggleChild(fruit)} />
            <span className="text-sm capitalize">{fruit}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export function CheckboxGroupExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Checkbox">
        <ExItem label="Single checkbox — label + description + disabled">
          <SingleCheckboxExample />
        </ExItem>
        <ExItem label="indeterminate — controlled tri-state">
          <IndeterminateExample />
        </ExItem>
      </ExRow>

      <ExRow label="CheckboxWrapper">
        <ExItem label="options — list with descriptions and disabled">
          <BasicExample />
        </ExItem>
        <ExItem label="parentLabel — select-all with indeterminate state">
          <ParentExample />
        </ExItem>
        <ExItem label="value + onValueChange — controlled group">
          <ControlledExample />
        </ExItem>
        <ExItem label="orientation: horizontal">
          <HorizontalExample />
        </ExItem>
      </ExRow>

      <ExRow label="CheckboxGroup primitive">
        <ExItem label="Manual composition">
          <PrimitiveExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
