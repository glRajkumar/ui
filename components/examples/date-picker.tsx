'use client'

import * as React from 'react'
import { type DateRange } from '@daypicker/react'

import { ExItem, ExRow } from '@/components/examples/common'
import { DatePicker, DateTimePicker } from '@/components/ui/date-picker'

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

// ── DateTimePicker examples ───────────────────────────────────────────────────

function DateTimeBasicExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <DateTimePicker
      selected={date}
      onSelect={setDate}
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
    />
  )
}

function DateTimeHour12Example() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <DateTimePicker
      selected={date}
      onSelect={setDate}
      hourFormat={12}
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
    />
  )
}

function DateTimeStepExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <DateTimePicker
      selected={date}
      onSelect={setDate}
      minuteStep={15}
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
    />
  )
}

function DateTimeDisablePastExample() {
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <DateTimePicker
      selected={date}
      onSelect={setDate}
      disablePast
    />
  )
}

function DateTimeMinMaxExample() {
  const [date, setDate] = React.useState<Date | undefined>()
  const today = new Date()
  const minDate = new Date(today)
  minDate.setDate(today.getDate() - 3)
  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + 7)
  return (
    <DateTimePicker
      selected={date}
      onSelect={setDate}
      minDate={minDate}
      maxDate={maxDate}
    />
  )
}

function DateTimeMinTimeExample() {
  const [date, setDate] = React.useState<Date | undefined>()
  const minTime = new Date()
  minTime.setMinutes(minTime.getMinutes() + 30)
  return (
    <DateTimePicker
      selected={date}
      onSelect={setDate}
      minTime={minTime}
      disablePast
    />
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

      <ExRow label="Date & Time">
        <ExItem label="default — 24h, 5 min step">
          <DateTimeBasicExample />
        </ExItem>
        <ExItem label="hourFormat={12} — AM/PM">
          <DateTimeHour12Example />
        </ExItem>
        <ExItem label="minuteStep={15}">
          <DateTimeStepExample />
        </ExItem>
      </ExRow>

      <ExRow label="Date & Time constraints">
        <ExItem label="disablePast — blocks past dates and times">
          <DateTimeDisablePastExample />
        </ExItem>
        <ExItem label="minDate / maxDate — ±3 / +7 days from today">
          <DateTimeMinMaxExample />
        </ExItem>
        <ExItem label="minTime — earliest = now + 30 min">
          <DateTimeMinTimeExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
