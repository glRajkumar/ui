'use client'

import { ExRow, ExItem } from '@/components/examples/common'

import {
  FlatExample,
  GroupedExample,
  SeparatorExample,
  IndicatorRightExample,
  IndicatorLeftExample,
} from './basic'
import {
  DefaultValueExample,
  DisabledRootExample,
  DisabledItemExample,
  ReadOnlyExample,
  MultipleExample,
  ControlledExample,
} from './state'
import {
  IconItemsExample,
  ColoredItemsExample,
  FormExample,
  StatusPickerExample,
  AssigneePickerExample,
} from './advanced'

export function SelectExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="Flat list">
          <FlatExample />
        </ExItem>
        <ExItem label="Grouped options">
          <GroupedExample />
        </ExItem>
        <ExItem label="With separator">
          <SeparatorExample />
        </ExItem>
      </ExRow>

      <ExRow label="Indicator">
        <ExItem label="Right (default)">
          <IndicatorRightExample />
        </ExItem>
        <ExItem label="Left">
          <IndicatorLeftExample />
        </ExItem>
      </ExRow>

      <ExRow label="State">
        <ExItem label="Default value — Mango pre-selected">
          <DefaultValueExample />
        </ExItem>
        <ExItem label="Disabled root — non-interactive">
          <DisabledRootExample />
        </ExItem>
        <ExItem label="Disabled item — Viewer unreachable">
          <DisabledItemExample />
        </ExItem>
        <ExItem label="Read-only — value visible, not editable">
          <ReadOnlyExample />
        </ExItem>
      </ExRow>

      <ExRow label="Multiple">
        <ExItem label="Multiple — pick several values">
          <MultipleExample />
        </ExItem>
      </ExRow>

      <ExRow label="Controlled">
        <ExItem label="Controlled value via useState">
          <ControlledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Custom Style">
        <ExItem label="Icon items — theme switcher">
          <IconItemsExample />
        </ExItem>
        <ExItem label="Per-item colour via className">
          <ColoredItemsExample />
        </ExItem>
        <ExItem label="Form — native submission with name/required">
          <FormExample />
        </ExItem>
      </ExRow>

      <ExRow label="Render Value">
        <ExItem label="Status badge — dot + coloured label in trigger">
          <StatusPickerExample />
        </ExItem>
        <ExItem label="Assignee — avatar + name + dept in trigger, rich list">
          <AssigneePickerExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
