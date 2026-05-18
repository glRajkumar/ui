'use client'

import { useState } from 'react'

import { ExRow, ExItem } from '@/components/examples/common'
import { FieldSet, FieldLegend, FieldGroup } from '@/components/ui/field'
import {
  InputWrapper,
  SwitchWrapper,
  RadioWrapper,
  CheckboxWrapper,
} from '@/components/ui/field-wrapper'

function AddressFieldSetExample() {
  return (
    <FieldSet className="w-72">
      <FieldLegend>Shipping address</FieldLegend>
      <FieldGroup>
        <InputWrapper name="fs-name" label="Full name" placeholder="John Smith" />
        <InputWrapper name="fs-street" label="Street" placeholder="123 Main St" />
        <div className="flex gap-3">
          <InputWrapper name="fs-city" label="City" placeholder="New York" />
          <InputWrapper name="fs-zip" label="ZIP" placeholder="10001" className="w-28!" />
        </div>
      </FieldGroup>
    </FieldSet>
  )
}

function NotificationsFieldSetExample() {
  const [email, setEmail] = useState(true)
  const [push, setPush] = useState(false)
  const [sms, setSms] = useState(false)

  return (
    <FieldSet className="w-72">
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup>
        <SwitchWrapper name="fs-n-email" label="Email" checked={email} onCheckedChange={setEmail} />
        <SwitchWrapper name="fs-n-push" label="Push" checked={push} onCheckedChange={setPush} />
        <SwitchWrapper name="fs-n-sms" label="SMS" checked={sms} onCheckedChange={setSms} />
      </FieldGroup>
    </FieldSet>
  )
}

function PlanFieldSetExample() {
  const [plan, setPlan] = useState<allowedPrimitiveT>('pro')

  return (
    <FieldSet className="w-72">
      <FieldLegend>Subscription plan</FieldLegend>
      <RadioWrapper
        name="fs-plan"
        options={[
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro' },
          { value: 'team', label: 'Team' },
        ]}
        value={plan}
        onValueChange={setPlan}
      />
    </FieldSet>
  )
}

function InterestsFieldSetExample() {
  const [interests, setInterests] = useState<allowedPrimitiveT[]>(['Design'])

  return (
    <FieldSet className="w-72">
      <FieldLegend>Interests</FieldLegend>
      <CheckboxWrapper
        name="fs-interests"
        options={['Design', 'Engineering', 'Marketing', 'Product']}
        value={interests}
        onValueChange={setInterests}
      />
    </FieldSet>
  )
}

function DisabledFieldSetExample() {
  return (
    <FieldSet className="w-72" disabled>
      <FieldLegend>Account details</FieldLegend>
      <FieldGroup>
        <InputWrapper name="fs-d-name" label="Name" defaultValue="John Smith" />
        <InputWrapper name="fs-d-email" label="Email" defaultValue="john@example.com" type="email" />
      </FieldGroup>
    </FieldSet>
  )
}

function LegendVariantExample() {
  return (
    <div className="flex gap-6">
      <FieldSet className="w-56">
        <FieldLegend variant="legend">Legend — base size</FieldLegend>
        <InputWrapper name="fs-v-a" label="Field" placeholder="Value" />
      </FieldSet>
      <FieldSet className="w-56">
        <FieldLegend variant="label">Label — smaller</FieldLegend>
        <InputWrapper name="fs-v-b" label="Field" placeholder="Value" />
      </FieldSet>
    </div>
  )
}

export function FieldSetExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="Address — multiple InputWrappers grouped under one legend">
          <AddressFieldSetExample />
        </ExItem>
        <ExItem label="Notifications — SwitchWrappers grouped in a fieldset">
          <NotificationsFieldSetExample />
        </ExItem>
      </ExRow>

      <ExRow label="Choice group">
        <ExItem label="Plan — RadioWrapper inside FieldSet (legend replaces field label)">
          <PlanFieldSetExample />
        </ExItem>
        <ExItem label="Interests — CheckboxWrapper inside FieldSet">
          <InterestsFieldSetExample />
        </ExItem>
      </ExRow>

      <ExRow label="State">
        <ExItem label="Disabled — all controls inside non-interactive">
          <DisabledFieldSetExample />
        </ExItem>
      </ExRow>

      <ExRow label="Legend variant">
        <ExItem label="legend (base size) vs label (sm) — controls heading size">
          <LegendVariantExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
