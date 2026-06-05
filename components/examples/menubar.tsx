'use client'

import { useState } from 'react'

import { ExRow, ExItem } from '@/components/examples/common'
import { dropdownOptions } from './data'
import {
  type menubaritemsT,
  type menubarCheckboxitemsT,
  type menubarRadioitemsT,
  MenubarCheckboxWrapper,
  MenubarRadioWrapper,
  MenubarWrapper,
} from '@/components/ui/menubar-wrapper'

const fileMenuOpts: menubaritemsT = [
  { key: 'file', trigger: 'File', items: dropdownOptions },
  { key: 'edit', trigger: 'Edit', items: ['Cut', 'Copy', 'Paste', '---', 'Select All'] },
  { key: 'view', trigger: 'View', items: ['Zoom In', 'Zoom Out', '---', 'Fullscreen'] },
]

const groupedCheckboxOptions: menuInputItemsT = [
  {
    group: 'Panels',
    items: ['Sidebar', 'Toolbar', 'Status Bar'],
  },
  {
    group: 'Overlays',
    items: ['Grid', 'Rulers', { label: 'Guides', value: 'guides', disabled: true }],
  },
]

const groupedRadioOptions: menuInputItemsT = [
  {
    group: 'Light',
    items: ['Default', 'Warm', 'Cool'],
  },
  {
    group: 'Dark',
    items: ['Midnight', 'Slate'],
  },
]

function BasicExample() {
  return <MenubarWrapper items={fileMenuOpts} />
}

function CheckboxDefaultExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([])

  const opts: menubarCheckboxitemsT = [
    { key: 'view', trigger: 'View', items: ['Sidebar', 'Toolbar', 'Status Bar'] },
    { key: 'format', trigger: 'Format', items: ['Bold', 'Italic', 'Underline'] },
  ]

  return (
    <MenubarCheckboxWrapper
      items={opts}
      checked={checked}
      onCheckedChange={(v, c) => setChecked(prev => (c ? [...prev, v] : prev.filter(x => x !== v)))}
    />
  )
}

function CheckboxLeftExample() {
  const opts: menubarCheckboxitemsT = [
    { key: 'view', trigger: 'View', items: ['Sidebar', 'Toolbar', 'Status Bar'] },
  ]
  return <MenubarCheckboxWrapper items={opts} indicatorAt="left" />
}

function CheckboxGroupedExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([])
  const opts: menubarCheckboxitemsT = [
    { key: 'view', trigger: 'View', items: groupedCheckboxOptions },
  ]
  return (
    <MenubarCheckboxWrapper
      items={opts}
      checked={checked}
      onCheckedChange={(v, c) => setChecked(prev => (c ? [...prev, v] : prev.filter(x => x !== v)))}
    />
  )
}

function RadioControlledExample() {
  const [val, setVal] = useState<allowedPrimitiveT>('Light')

  const opts: menubarRadioitemsT = [
    { key: 'theme', trigger: 'Theme', items: ['Light', 'Dark', 'System'] },
    { key: 'lang', trigger: 'Language', items: ['English', 'Spanish', 'French'] },
  ]

  return <MenubarRadioWrapper items={opts} value={val} onValueChange={setVal} />
}

function RadioLeftExample() {
  const opts: menubarRadioitemsT = [
    { key: 'theme', trigger: 'Theme', items: ['Light', 'Dark', 'System'] },
  ]
  return <MenubarRadioWrapper items={opts} indicatorAt="left" />
}

function RadioGroupedExample() {
  const [val, setVal] = useState<allowedPrimitiveT>('Default')
  const opts: menubarRadioitemsT = [
    { key: 'theme', trigger: 'Theme', items: groupedRadioOptions },
  ]
  return <MenubarRadioWrapper items={opts} value={val} onValueChange={setVal} />
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
