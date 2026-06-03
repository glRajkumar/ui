'use client'

import { useState } from 'react'

import { ExRow, ExItem } from '@/components/examples/common'
import { NumberWrapper } from '@/components/ui/field-wrapper'

function BasicExample() {
  const [value, setValue] = useState<number | null>(0)

  return (
    <NumberWrapper
      name="qty"
      label="Quantity"
      value={value}
      onValueChange={setValue}
      className="w-48"
    />
  )
}

function MinMaxExample() {
  const [value, setValue] = useState<number | null>(5)

  return (
    <NumberWrapper
      name="rating"
      label="Rating (1–10)"
      value={value}
      onValueChange={setValue}
      min={1}
      max={10}
      className="w-48"
    />
  )
}

function StepExample() {
  const [value, setValue] = useState<number | null>(0)

  return (
    <NumberWrapper
      name="amount"
      label="Amount (step 0.5)"
      value={value}
      onValueChange={setValue}
      step={0.5}
      min={0}
      className="w-48"
    />
  )
}

function CurrencyExample() {
  const [value, setValue] = useState<number | null>(1299)

  return (
    <NumberWrapper
      name="price"
      label="Price"
      value={value}
      onValueChange={setValue}
      min={0}
      step={1}
      format={{ style: 'currency', currency: 'USD' }}
      className="w-48"
    />
  )
}

function PercentExample() {
  const [value, setValue] = useState<number | null>(0.25)

  return (
    <NumberWrapper
      name="discount"
      label="Discount"
      value={value}
      onValueChange={setValue}
      min={0}
      max={1}
      step={0.01}
      format={{ style: 'percent' }}
      className="w-48"
    />
  )
}

function LargeStepExample() {
  const [value, setValue] = useState<number | null>(0)

  return (
    <NumberWrapper
      name="year"
      label="Year (Shift+↑ = +10)"
      value={value}
      onValueChange={setValue}
      step={1}
      largeStep={10}
      className="w-48"
    />
  )
}

function WheelScrubExample() {
  const [value, setValue] = useState<number | null>(50)

  return (
    <NumberWrapper
      name="volume"
      label="Volume (scroll to change)"
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
      allowWheelScrub
      className="w-48"
    />
  )
}

function ErrorExample() {
  return (
    <NumberWrapper
      name="err-qty"
      label="Quantity"
      value={null}
      invalid
      error={{ message: 'Quantity is required' }}
      className="w-48"
    />
  )
}

function DisabledExample() {
  return <NumberWrapper name="dis-qty" label="Quantity" value={10} disabled className="w-48" />
}

function ReadOnlyExample() {
  return <NumberWrapper name="ro-qty" label="Quantity" value={42} readOnly className="w-48" />
}

export function NumberFieldExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="Default — increment/decrement buttons, keyboard arrows">
          <BasicExample />
        </ExItem>
        <ExItem label="Min / max — constrained to 1–10">
          <MinMaxExample />
        </ExItem>
        <ExItem label="Step — increments by 0.5">
          <StepExample />
        </ExItem>
      </ExRow>

      <ExRow label="Format">
        <ExItem label="Currency — Intl.NumberFormat style: currency">
          <CurrencyExample />
        </ExItem>
        <ExItem label="Percent — Intl.NumberFormat style: percent">
          <PercentExample />
        </ExItem>
        <ExItem label="Large step — Shift+Arrow uses largeStep (10)">
          <LargeStepExample />
        </ExItem>
      </ExRow>

      <ExRow label="Interaction">
        <ExItem label="Wheel scrub — scroll while focused to change value">
          <WheelScrubExample />
        </ExItem>
      </ExRow>

      <ExRow label="State">
        <ExItem label="Error — invalid + error message">
          <ErrorExample />
        </ExItem>
        <ExItem label="Disabled — non-interactive">
          <DisabledExample />
        </ExItem>
        <ExItem label="Read only — display only">
          <ReadOnlyExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
