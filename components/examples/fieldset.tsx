'use client'

import { useState } from 'react'

import { ExRow, ExItem } from '@/components/examples/common'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroupWrapper } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'

function RadioGroupFieldSetExample() {
  const [plan, setPlan] = useState('pro')

  return (
    <FieldSet className="w-72">
      <FieldLegend>Subscription plan</FieldLegend>
      <RadioGroupWrapper
        value={plan}
        onValueChange={setPlan}
        items={[
          { value: 'free', label: 'Free', description: '5 projects, 1 GB storage' },
          { value: 'pro', label: 'Pro', description: 'Unlimited projects, 50 GB storage' },
          { value: 'team', label: 'Team', description: 'Everything in Pro + team features' },
        ]}
      />
    </FieldSet>
  )
}

function AddressFieldSetExample() {
  return (
    <FieldSet className="w-72">
      <FieldLegend>Shipping address</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fs-name">Full name</FieldLabel>
          <Input id="fs-name" placeholder="John Smith" />
        </Field>
        <Field>
          <FieldLabel htmlFor="fs-street">Street</FieldLabel>
          <Input id="fs-street" placeholder="123 Main St" />
        </Field>
        <div className="flex gap-3">
          <Field>
            <FieldLabel htmlFor="fs-city">City</FieldLabel>
            <Input id="fs-city" placeholder="New York" />
          </Field>
          <Field className="w-28!">
            <FieldLabel htmlFor="fs-zip">ZIP</FieldLabel>
            <Input id="fs-zip" placeholder="10001" />
          </Field>
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
      <FieldDescription className="-mt-1">
        Choose how you want to be notified.
      </FieldDescription>
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="fs-n-email" className="font-normal">
            Email
          </FieldLabel>
          <Switch id="fs-n-email" checked={email} onCheckedChange={setEmail} />
        </Field>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="fs-n-push" className="font-normal">
            Push
          </FieldLabel>
          <Switch id="fs-n-push" checked={push} onCheckedChange={setPush} />
        </Field>
        <Field orientation="horizontal">
          <FieldLabel htmlFor="fs-n-sms" className="font-normal">
            SMS
          </FieldLabel>
          <Switch id="fs-n-sms" checked={sms} onCheckedChange={setSms} />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}

function DisabledFieldSetExample() {
  return (
    <FieldSet className="w-72" disabled>
      <FieldLegend>Account details</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fs-d-name">Name</FieldLabel>
          <Input id="fs-d-name" defaultValue="John Smith" />
        </Field>
        <Field>
          <FieldLabel htmlFor="fs-d-email">Email</FieldLabel>
          <Input id="fs-d-email" defaultValue="john@example.com" />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}

function LegendVariantExample() {
  return (
    <div className="flex flex-col gap-4">
      <FieldSet className="w-64">
        <FieldLegend variant="legend">Legend variant</FieldLegend>
        <Field>
          <FieldLabel htmlFor="fs-v-a">Field</FieldLabel>
          <Input id="fs-v-a" placeholder="Value" />
        </Field>
      </FieldSet>
      <FieldSet className="w-64">
        <FieldLegend variant="label">Label variant</FieldLegend>
        <Field>
          <FieldLabel htmlFor="fs-v-b">Field</FieldLabel>
          <Input id="fs-v-b" placeholder="Value" />
        </Field>
      </FieldSet>
    </div>
  )
}

export function FieldSetExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="Radio group — FieldSet + FieldLegend wrapping related options">
          <RadioGroupFieldSetExample />
        </ExItem>
        <ExItem label="Multi-field — address form grouped under a single legend">
          <AddressFieldSetExample />
        </ExItem>
        <ExItem label="Toggle group — notification preferences with horizontal fields">
          <NotificationsFieldSetExample />
        </ExItem>
      </ExRow>

      <ExRow label="State">
        <ExItem label="Disabled — all controls inside non-interactive">
          <DisabledFieldSetExample />
        </ExItem>
      </ExRow>

      <ExRow label="Legend variant">
        <ExItem label="legend (base) vs label (sm) — controls heading size">
          <LegendVariantExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
