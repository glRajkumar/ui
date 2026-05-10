'use client'

import { useState } from 'react'

import { ExRow, ExItem } from '@/components/examples/common'
import { dropdownOptions } from './data'
import {
  MenuCheckboxWrapper,
  MenuRadioWrapper,
  MenuWrapper,
} from '@/components/ui/menu-wrapper'
import { buttonVariants } from '@/components/ui/button'

const actionOptions: menuOptionsT = [
  { label: 'Edit', value: 'edit', shortcut: '⌘E' },
  { label: 'Duplicate', value: 'dup', shortcut: '⌘D' },
  '---',
  { label: 'Delete', value: 'delete', variant: 'destructive', shortcut: '⌘⌫' },
]

const featureOptions: menuInputOptionsT = [
  'Auto-save',
  'Spellcheck',
  'Dark mode',
  '---',
  { label: 'Beta features', value: 'beta', disabled: true },
]

const groupedCheckboxOptions: menuInputOptionsT = [
  {
    group: 'Appearance',
    options: ['Dark mode', 'Compact view', 'Show avatars'],
  },
  {
    group: 'Notifications',
    options: ['Email', 'Push', { label: 'SMS', value: 'sms', disabled: true }],
  },
]

const themeOptions: menuInputOptionsT = ['Light', 'Dark', 'System']

const groupedRadioOptions: menuInputOptionsT = [
  {
    group: 'Light',
    options: ['Default', 'Warm', 'Cool'],
  },
  {
    group: 'Dark',
    options: ['Midnight', 'Slate', { label: 'Dracula', value: 'dracula', disabled: true }],
  },
]

function BasicExample() {
  return (
    <MenuWrapper
      options={actionOptions}
      trigger="Actions"
      triggerCls={buttonVariants({ variant: 'outline' })}
    />
  )
}

function ComplexExample() {
  return (
    <MenuWrapper
      options={dropdownOptions}
      trigger="Open"
      triggerCls={buttonVariants({ variant: 'outline' })}
    />
  )
}

function ControlledOpenExample() {
  const [open, setOpen] = useState(false)
  return (
    <MenuWrapper
      open={open}
      onOpenChange={setOpen}
      options={actionOptions}
      trigger={open ? 'Close me' : 'Open me'}
      triggerCls={buttonVariants({ variant: 'outline' })}
    />
  )
}

function CheckboxDefaultExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([])
  return (
    <MenuCheckboxWrapper
      options={featureOptions}
      checked={checked}
      onCheckedChange={(v, c) =>
        setChecked((prev) => (c ? [...prev, v] : prev.filter((x) => x !== v)))
      }
      trigger="Features"
      triggerCls={buttonVariants({ variant: 'outline' })}
    />
  )
}

function CheckboxLeftExample() {
  return (
    <MenuCheckboxWrapper
      options={featureOptions}
      indicatorAt="left"
      trigger="Features"
      triggerCls={buttonVariants({ variant: 'outline' })}
    />
  )
}

function CheckboxGroupedExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([])
  return (
    <MenuCheckboxWrapper
      options={groupedCheckboxOptions}
      checked={checked}
      onCheckedChange={(v, c) =>
        setChecked((prev) => (c ? [...prev, v] : prev.filter((x) => x !== v)))
      }
      trigger="Settings"
      triggerCls={buttonVariants({ variant: 'outline' })}
    />
  )
}

function RadioControlledExample() {
  const [val, setVal] = useState<allowedPrimitiveT>('Light')
  return (
    <MenuRadioWrapper
      options={themeOptions}
      value={val}
      onValueChange={setVal}
      trigger={`Theme: ${val}`}
      triggerCls={buttonVariants({ variant: 'outline' })}
    />
  )
}

function RadioLeftExample() {
  return (
    <MenuRadioWrapper
      options={themeOptions}
      indicatorAt="left"
      trigger="Theme"
      triggerCls={buttonVariants({ variant: 'outline' })}
    />
  )
}

function RadioGroupedExample() {
  const [val, setVal] = useState<allowedPrimitiveT>('Default')
  return (
    <MenuRadioWrapper
      options={groupedRadioOptions}
      value={val}
      onValueChange={setVal}
      trigger={`Theme: ${val}`}
      triggerCls={buttonVariants({ variant: 'outline' })}
    />
  )
}

export function MenuExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Default">
        <ExItem label="Basic">
          <BasicExample />
        </ExItem>
        <ExItem label="Groups, submenus, separators">
          <ComplexExample />
        </ExItem>
        <ExItem label="Controlled open">
          <ControlledOpenExample />
        </ExItem>
      </ExRow>

      <ExRow label="Checkbox">
        <ExItem label="Indicator right (default)">
          <CheckboxDefaultExample />
        </ExItem>
        <ExItem label="Indicator left">
          <CheckboxLeftExample />
        </ExItem>
        <ExItem label="With group labels">
          <CheckboxGroupedExample />
        </ExItem>
      </ExRow>

      <ExRow label="Radio">
        <ExItem label="Controlled value">
          <RadioControlledExample />
        </ExItem>
        <ExItem label="Indicator left">
          <RadioLeftExample />
        </ExItem>
        <ExItem label="With group labels">
          <RadioGroupedExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
