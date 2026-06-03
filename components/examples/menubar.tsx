'use client'

import { useState } from 'react'

import { ExRow, ExItem } from '@/components/examples/common'
import { dropdownOptions } from './data'
import {
  type menubarOptionsT,
  type menubarCheckboxOptionsT,
  type menubarRadioOptionsT,
  MenubarCheckboxWrapper,
  MenubarRadioWrapper,
  MenubarWrapper,
} from '@/components/ui/menubar-wrapper'

const fileMenuOpts: menubarOptionsT = [
  { key: 'file', trigger: 'File', options: dropdownOptions },
  { key: 'edit', trigger: 'Edit', options: ['Cut', 'Copy', 'Paste', '---', 'Select All'] },
  { key: 'view', trigger: 'View', options: ['Zoom In', 'Zoom Out', '---', 'Fullscreen'] },
]

const groupedCheckboxOptions: menuInputOptionsT = [
  {
    group: 'Panels',
    options: ['Sidebar', 'Toolbar', 'Status Bar'],
  },
  {
    group: 'Overlays',
    options: ['Grid', 'Rulers', { label: 'Guides', value: 'guides', disabled: true }],
  },
]

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

function BasicExample() {
  return <MenubarWrapper options={fileMenuOpts} />
}

function CheckboxDefaultExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([])

  const opts: menubarCheckboxOptionsT = [
    { key: 'view', trigger: 'View', options: ['Sidebar', 'Toolbar', 'Status Bar'] },
    { key: 'format', trigger: 'Format', options: ['Bold', 'Italic', 'Underline'] },
  ]

  return (
    <MenubarCheckboxWrapper
      options={opts}
      checked={checked}
      onCheckedChange={(v, c) => setChecked(prev => (c ? [...prev, v] : prev.filter(x => x !== v)))}
    />
  )
}

function CheckboxLeftExample() {
  const opts: menubarCheckboxOptionsT = [
    { key: 'view', trigger: 'View', options: ['Sidebar', 'Toolbar', 'Status Bar'] },
  ]
  return <MenubarCheckboxWrapper options={opts} indicatorAt="left" />
}

function CheckboxGroupedExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([])
  const opts: menubarCheckboxOptionsT = [
    { key: 'view', trigger: 'View', options: groupedCheckboxOptions },
  ]
  return (
    <MenubarCheckboxWrapper
      options={opts}
      checked={checked}
      onCheckedChange={(v, c) => setChecked(prev => (c ? [...prev, v] : prev.filter(x => x !== v)))}
    />
  )
}

function RadioControlledExample() {
  const [val, setVal] = useState<allowedPrimitiveT>('Light')

  const opts: menubarRadioOptionsT = [
    { key: 'theme', trigger: 'Theme', options: ['Light', 'Dark', 'System'] },
    { key: 'lang', trigger: 'Language', options: ['English', 'Spanish', 'French'] },
  ]

  return <MenubarRadioWrapper options={opts} value={val} onValueChange={setVal} />
}

function RadioLeftExample() {
  const opts: menubarRadioOptionsT = [
    { key: 'theme', trigger: 'Theme', options: ['Light', 'Dark', 'System'] },
  ]
  return <MenubarRadioWrapper options={opts} indicatorAt="left" />
}

function RadioGroupedExample() {
  const [val, setVal] = useState<allowedPrimitiveT>('Default')
  const opts: menubarRadioOptionsT = [
    { key: 'theme', trigger: 'Theme', options: groupedRadioOptions },
  ]
  return <MenubarRadioWrapper options={opts} value={val} onValueChange={setVal} />
}

export function MenubarExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Default">
        <ExItem label="Multiple menus">
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
