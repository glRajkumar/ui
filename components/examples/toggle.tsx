'use client'

import { useState } from 'react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from 'lucide-react'

import { ToggleWrapper } from '@/components/ui/toggle'
import { ExItem, ExRow } from '@/components/examples/common'

function BasicExample() {
  return <ToggleWrapper options={['Bold', 'Italic', 'Underline']} />
}

function MultipleExample() {
  return <ToggleWrapper options={['Bold', 'Italic', 'Underline']} multiple />
}

function IconOnlyExample() {
  return (
    <ToggleWrapper
      options={[
        { label: <Bold />, value: 'bold', 'aria-label': 'Toggle bold' },
        { label: <Italic />, value: 'italic', 'aria-label': 'Toggle italic' },
        { label: <Underline />, value: 'underline', 'aria-label': 'Toggle underline' },
      ]}
    />
  )
}

function IconTextExample() {
  return (
    <ToggleWrapper
      options={[
        {
          label: (
            <>
              <AlignLeft /> Left
            </>
          ),
          value: 'left',
        },
        {
          label: (
            <>
              <AlignCenter /> Center
            </>
          ),
          value: 'center',
        },
        {
          label: (
            <>
              <AlignRight /> Right
            </>
          ),
          value: 'right',
        },
      ]}
    />
  )
}

function ControlledExample() {
  const [value, setValue] = useState<string[]>(['italic'])

  return (
    <div className="flex items-center gap-4">
      <ToggleWrapper
        options={['Bold', 'Italic', 'Underline']}
        value={value}
        onValueChange={v => setValue(v)}
        multiple
      />
      <span className="text-sm text-muted-foreground">{value.join(', ') || 'none'}</span>
    </div>
  )
}

function VerticalExample() {
  return (
    <ToggleWrapper
      options={[
        {
          label: (
            <>
              <AlignLeft /> Left
            </>
          ),
          value: 'left',
        },
        {
          label: (
            <>
              <AlignCenter /> Center
            </>
          ),
          value: 'center',
        },
        {
          label: (
            <>
              <AlignRight /> Right
            </>
          ),
          value: 'right',
        },
        {
          label: (
            <>
              <AlignJustify /> Justify
            </>
          ),
          value: 'justify',
        },
      ]}
      orientation="vertical"
    />
  )
}

function SpacingExample() {
  return (
    <div className="flex flex-col gap-3">
      <ToggleWrapper options={['Bold', 'Italic', 'Underline']} spacing={0} />
      <ToggleWrapper options={['Bold', 'Italic', 'Underline']} spacing={1} />
      <ToggleWrapper options={['Bold', 'Italic', 'Underline']} spacing={2} />
    </div>
  )
}

function VariantsExample() {
  return (
    <div className="flex flex-col gap-3">
      <ToggleWrapper options={['Bold', 'Italic', 'Underline']} variant="default" />
      <ToggleWrapper options={['Bold', 'Italic', 'Underline']} variant="outline" />
    </div>
  )
}

function SizesExample() {
  return (
    <div className="flex flex-col gap-3">
      <ToggleWrapper options={['Bold', 'Italic', 'Underline']} size="sm" />
      <ToggleWrapper options={['Bold', 'Italic', 'Underline']} size="default" />
      <ToggleWrapper options={['Bold', 'Italic', 'Underline']} size="lg" />
    </div>
  )
}

function DisabledExample() {
  return <ToggleWrapper options={['Bold', 'Italic', 'Underline']} disabled />
}

export function ToggleExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="Default — single selection, string options">
          <BasicExample />
        </ExItem>
        <ExItem label="multiple — several items active simultaneously">
          <MultipleExample />
        </ExItem>
      </ExRow>

      <ExRow label="Options format">
        <ExItem label="Icon only — use aria-label for accessibility">
          <IconOnlyExample />
        </ExItem>
        <ExItem label="Icon + label">
          <IconTextExample />
        </ExItem>
      </ExRow>

      <ExRow label="Controlled">
        <ExItem label="value + onValueChange — driven by external state">
          <ControlledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Orientation">
        <ExItem label="orientation: vertical — stacks items, arrow keys navigate vertically">
          <VerticalExample />
        </ExItem>
      </ExRow>

      <ExRow label="Spacing">
        <ExItem label="spacing — 0 = joined (default), 1+ = gap between items">
          <SpacingExample />
        </ExItem>
      </ExRow>

      <ExRow label="Variants">
        <ExItem label="variant — default / outline">
          <VariantsExample />
        </ExItem>
      </ExRow>

      <ExRow label="Sizes">
        <ExItem label="size — sm / default / lg">
          <SizesExample />
        </ExItem>
      </ExRow>

      <ExRow label="Disabled">
        <ExItem label="disabled — entire group non-interactive">
          <DisabledExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
