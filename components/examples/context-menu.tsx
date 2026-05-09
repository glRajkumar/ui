'use client'

import { useState } from 'react'

import { ExRow, ExItem } from '@/components/examples/common'
import { dropdownOptions } from './data'
import {
  ContextCheckboxWrapper,
  ContextRadioWrapper,
  ContextWrapper,
} from '@/components/ui/context-menu-wrapper'

const featureOptions: menuInputOptionsT = ['Auto-save', 'Spellcheck', 'Dark mode']

const groupedCheckboxOptions: menuInputOptionsT = [
  {
    group: 'Editor',
    options: ['Auto-save', 'Spellcheck', 'Word wrap'],
  },
  {
    group: 'Display',
    options: ['Line numbers', 'Minimap', { label: 'Breadcrumbs', value: 'breadcrumbs', disabled: true }],
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
    options: ['Midnight', 'Slate'],
  },
]

function TriggerArea() {
  return (
    <div className="flex h-20 w-52 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground select-none">
      Right-click here
    </div>
  )
}

function BasicExample() {
  return (
    <ContextWrapper options={dropdownOptions}>
      <TriggerArea />
    </ContextWrapper>
  )
}

function CheckboxDefaultExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([])
  return (
    <ContextCheckboxWrapper
      options={featureOptions}
      checked={checked}
      onCheckedChange={(v, c) =>
        setChecked(prev => (c ? [...prev, v] : prev.filter(x => x !== v)))
      }
    >
      <TriggerArea />
    </ContextCheckboxWrapper>
  )
}

function CheckboxLeftExample() {
  return (
    <ContextCheckboxWrapper options={featureOptions} indicatorAt="left">
      <TriggerArea />
    </ContextCheckboxWrapper>
  )
}

function CheckboxGroupedExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([])
  return (
    <ContextCheckboxWrapper
      options={groupedCheckboxOptions}
      checked={checked}
      onCheckedChange={(v, c) =>
        setChecked(prev => (c ? [...prev, v] : prev.filter(x => x !== v)))
      }
    >
      <TriggerArea />
    </ContextCheckboxWrapper>
  )
}

function RadioControlledExample() {
  const [val, setVal] = useState<allowedPrimitiveT>('Light')
  return (
    <ContextRadioWrapper options={themeOptions} value={val} onValueChange={setVal}>
      <TriggerArea />
    </ContextRadioWrapper>
  )
}

function RadioLeftExample() {
  return (
    <ContextRadioWrapper options={themeOptions} indicatorAt="left">
      <TriggerArea />
    </ContextRadioWrapper>
  )
}

function RadioGroupedExample() {
  const [val, setVal] = useState<allowedPrimitiveT>('Default')
  return (
    <ContextRadioWrapper options={groupedRadioOptions} value={val} onValueChange={setVal}>
      <TriggerArea />
    </ContextRadioWrapper>
  )
}

export function ContextExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Default">
        <ExItem label="Groups, submenus, separators">
          <BasicExample />
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
        <ExItem label="Controlled">
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
