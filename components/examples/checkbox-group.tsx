'use client'

import { useState } from 'react'

import { ExItem, ExRow } from '@/components/examples/common'
import { Checkbox, CheckboxWrapper } from '@/components/ui/checkbox'
import { CheckboxGroup, CheckboxGroupWrapper } from '@/components/ui/checkbox-group'

function BasicExample() {
  return (
    <CheckboxGroupWrapper
      defaultValue={['email']}
      items={[
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
    <CheckboxGroupWrapper
      defaultValue={['email']}
      parentLabel="All notifications"
      items={[
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
      <CheckboxGroupWrapper
        value={value}
        onValueChange={(v) => setValue(v)}
        parentLabel="Select all"
        items={[
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
    <CheckboxGroupWrapper
      orientation="horizontal"
      defaultValue={['react']}
      items={[
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
        <Checkbox value="a" />
        <span className="text-sm">Option A</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2">
        <Checkbox value="b" />
        <span className="text-sm">Option B</span>
      </label>
      <label className="flex cursor-pointer items-center gap-2">
        <Checkbox value="c" />
        <span className="text-sm">Option C</span>
      </label>
    </CheckboxGroup>
  )
}

function SingleCheckboxExample() {
  return (
    <div className="flex flex-col gap-3">
      <CheckboxWrapper label="Accept terms and conditions" defaultChecked />
      <CheckboxWrapper
        label="Email notifications"
        description="Receive updates about your account activity."
      />
      <CheckboxWrapper label="Disabled option" disabled />
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
        <Checkbox checked={allChecked} indeterminate={someChecked} onCheckedChange={toggleParent} />
        <span className="text-sm font-medium">All fruits</span>
      </label>
      <div className="ml-6 flex flex-col gap-2">
        {FRUITS.map((fruit) => (
          <label key={fruit} className="flex cursor-pointer select-none items-center gap-2">
            <Checkbox checked={selected.includes(fruit)} onCheckedChange={() => toggleChild(fruit)} />
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
      <ExRow label="CheckboxWrapper">
        <ExItem label="Single checkbox — label + description + disabled">
          <SingleCheckboxExample />
        </ExItem>
        <ExItem label="indeterminate — controlled tri-state">
          <IndeterminateExample />
        </ExItem>
      </ExRow>

      <ExRow label="CheckboxGroupWrapper">
        <ExItem label="items — list with descriptions and disabled">
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
