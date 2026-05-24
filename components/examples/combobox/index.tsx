'use client'

import { ExRow, ExItem } from '@/components/examples/common'

import {
  FlatExample,
  GroupedExample,
  SeparatorExample,
  WithTriggerExample,
  WithClearExample,
  SearchOnlyExample,
  IndicatorRightExample,
  IndicatorLeftExample,
} from './basic'
import {
  DefaultValueExample,
  DisabledRootExample,
  DisabledItemExample,
  CustomEmptyExample,
  MultipleExample,
  MultipleClearExample,
  ControlledExample,
} from './state'
import {
  AsyncExample,
  AsyncSearchExample,
  ClickCreateExample,
  EnterCreateExample,
  PriorityChipsExample,
  TeamChipsExample,
} from './advanced'

export function ComboboxExample() {
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

      <ExRow label="Controls">
        <ExItem label="Trigger only (default)">
          <WithTriggerExample />
        </ExItem>
        <ExItem label="With clear button">
          <WithClearExample />
        </ExItem>
        <ExItem label="No trigger — search only">
          <SearchOnlyExample />
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
        <ExItem label="Custom empty message">
          <CustomEmptyExample />
        </ExItem>
      </ExRow>

      <ExRow label="Multiple">
        <ExItem label="Multiple — chips per selection">
          <MultipleExample />
        </ExItem>
        <ExItem label="Multiple + clear all">
          <MultipleClearExample />
        </ExItem>
      </ExRow>

      <ExRow label="Controlled">
        <ExItem label="Controlled value via useState">
          <ControlledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Async">
        <ExItem label="Async load — 1.5 s simulated delay">
          <AsyncExample />
        </ExItem>
        <ExItem label="Async search — filter on typing, 400 ms debounce">
          <AsyncSearchExample />
        </ExItem>
      </ExRow>

      <ExRow label="Create">
        <ExItem label="canCreate — Enter creates single value">
          <ClickCreateExample />
        </ExItem>
        <ExItem label="canCreate — Enter appends chip (multiple)">
          <EnterCreateExample />
        </ExItem>
      </ExRow>

      <ExRow label="Render Value">
        <ExItem label="Priority chips — icon + coloured label per priority">
          <PriorityChipsExample />
        </ExItem>
        <ExItem label="Team chips — avatar initials + first name">
          <TeamChipsExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
