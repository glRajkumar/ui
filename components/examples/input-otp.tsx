'use client'

import { useState } from 'react'

import { ExItem, ExRow } from '@/components/examples/common'
import { InputOTPWrapper } from '@/components/ui/input-otp'
import { OTPWrapper } from '@/components/ui/field-wrapper'

function BasicExample() {
  const [value, setValue] = useState('')

  return (
    <div className="flex flex-col gap-2">
      <InputOTPWrapper length={6} value={value} onValueChange={v => setValue(v)} />
      <p className="text-sm text-muted-foreground">Value: {value || '—'}</p>
    </div>
  )
}

function PinExample() {
  const [value, setValue] = useState('')

  return <InputOTPWrapper length={4} value={value} onValueChange={v => setValue(v)} />
}

function SeparatorExample() {
  const [value, setValue] = useState('')

  return <InputOTPWrapper length={6} separator value={value} onValueChange={v => setValue(v)} />
}

function CustomSeparatorExample() {
  const [value, setValue] = useState('')

  return <InputOTPWrapper length={8} separator={4} value={value} onValueChange={v => setValue(v)} />
}

function MaskExample() {
  const [value, setValue] = useState('')

  return <InputOTPWrapper length={6} mask value={value} onValueChange={v => setValue(v)} />
}

function AlphaNumericExample() {
  const [value, setValue] = useState('')

  return (
    <InputOTPWrapper
      length={6}
      validationType="alphanumeric"
      value={value}
      onValueChange={v => setValue(v)}
    />
  )
}

function DisabledExample() {
  return <InputOTPWrapper length={6} defaultValue="123" disabled />
}

function ErrorExample() {
  return (
    <OTPWrapper
      name="otp-err"
      label="Verification code"
      length={6}
      defaultValue="12"
      invalid
      error={{ message: 'Invalid code. Please try again.' }}
    />
  )
}

function FieldWrapperExample() {
  const [value, setValue] = useState('')

  return (
    <OTPWrapper
      name="otp"
      label="Verification code"
      length={6}
      separator
      value={value}
      onValueChange={v => setValue(v)}
    />
  )
}

export function InputOTPExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="6 slots — default numeric OTP">
          <BasicExample />
        </ExItem>
        <ExItem label="4 slots — PIN">
          <PinExample />
        </ExItem>
        <ExItem label="separator — 3+3 split">
          <SeparatorExample />
        </ExItem>
        <ExItem label="separator={4} — 4+4 split on 8 slots">
          <CustomSeparatorExample />
        </ExItem>
      </ExRow>

      <ExRow label="Variants">
        <ExItem label="mask — password mode">
          <MaskExample />
        </ExItem>
        <ExItem label="validationType: alphanumeric">
          <AlphaNumericExample />
        </ExItem>
      </ExRow>

      <ExRow label="State">
        <ExItem label="Disabled">
          <DisabledExample />
        </ExItem>
      </ExRow>

      <ExRow label="OTPWrapper (field-wrapper)">
        <ExItem label="With label">
          <FieldWrapperExample />
        </ExItem>
        <ExItem label="Error state">
          <ErrorExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
