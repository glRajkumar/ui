'use client'

import * as React from 'react'
import { type DateRange } from '@daypicker/react'

import { ExItem, ExRow } from '@/components/examples/common'
import { DatePicker } from '@/components/ui/date-picker'

function SingleExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <DatePicker
      selected={date}
      onSelect={setDate}
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
    />
  )
}

function RangeExample() {
  const [range, setRange] = React.useState<DateRange | undefined>()

  return (
    <DatePicker
      mode="range"
      selected={range}
      onSelect={setRange}
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
      numberOfMonths={2}
    />
  )
}

function MultipleExample() {
  const [dates, setDates] = React.useState<Date[] | undefined>()

  return (
    <DatePicker
      mode="multiple"
      selected={dates}
      onSelect={setDates}
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
    />
  )
}

function FormatExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <DatePicker
      selected={date}
      onSelect={setDate}
      dateFormat="MMM dd, yyyy"
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
    />
  )
}

function CustomTriggerExample() {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <DatePicker
      selected={date}
      onSelect={setDate}
      placeholder="Pick a date..."
      triggerProps={{ variant: 'ghost', className: 'w-52 border border-dashed' }}
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
    />
  )
}

function ControlledExample() {
  const [date, setDate] = React.useState<Date | undefined>()
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded border px-3 py-1 text-xs"
          onClick={() => setOpen(o => !o)}
        >
          {open ? 'Close' : 'Open'} picker
        </button>
        {date && (
          <button
            type="button"
            className="rounded border px-3 py-1 text-xs text-muted-foreground"
            onClick={() => setDate(undefined)}
          >
            Clear
          </button>
        )}
      </div>
      <DatePicker
        open={open}
        onOpenChange={setOpen}
        selected={date}
        onSelect={setDate}
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
      />
    </div>
  )
}

export function DatePickerExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Single">
        <ExItem label="mode=single — select one date, closes on pick (default)">
          <SingleExample />
        </ExItem>
      </ExRow>

      <ExRow label="Range">
        <ExItem label="mode=range — closes when both from and to are set">
          <RangeExample />
        </ExItem>
      </ExRow>

      <ExRow label="Multiple">
        <ExItem label="mode=multiple — toggle individual dates, stays open">
          <MultipleExample />
        </ExItem>
      </ExRow>

      <ExRow label="Custom format">
        <ExItem label='dateFormat="MMM dd, yyyy"'>
          <FormatExample />
        </ExItem>
      </ExRow>

      <ExRow label="Custom trigger">
        <ExItem label="triggerProps — ghost variant with dashed border">
          <CustomTriggerExample />
        </ExItem>
      </ExRow>

      <ExRow label="Controlled">
        <ExItem label="open / onOpenChange — external state control">
          <ControlledExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
