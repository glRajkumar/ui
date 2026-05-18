'use client'

import { useState } from 'react'

import { ExRow, ExItem } from '@/components/examples/common'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

function BasicExample() {
  return (
    <Field className="w-64">
      <FieldLabel htmlFor="fp-username">Username</FieldLabel>
      <Input id="fp-username" placeholder="Enter username" />
    </Field>
  )
}

function WithDescriptionExample() {
  return (
    <Field className="w-64">
      <FieldLabel htmlFor="fp-email">Email</FieldLabel>
      <Input id="fp-email" type="email" placeholder="user@example.com" />
      <FieldDescription>Used for account recovery only.</FieldDescription>
    </Field>
  )
}

function WithErrorExample() {
  return (
    <Field className="w-64" invalid>
      <FieldLabel htmlFor="fp-pw">Password</FieldLabel>
      <Input id="fp-pw" type="password" aria-invalid />
      <FieldError errors={[{ message: 'At least 8 characters required' }]} />
    </Field>
  )
}

function HorizontalExample() {
  const [checked, setChecked] = useState(false)

  return (
    <Field orientation="horizontal" className="w-64">
      <FieldLabel htmlFor="fp-notify" className="font-normal">
        Email notifications
      </FieldLabel>
      <Switch id="fp-notify" checked={checked} onCheckedChange={setChecked} />
    </Field>
  )
}

function HorizontalWithContentExample() {
  const [checked, setChecked] = useState(true)

  return (
    <Field orientation="horizontal" className="w-72">
      <FieldContent>
        <FieldTitle>Marketing emails</FieldTitle>
        <FieldDescription>Receive news and product updates.</FieldDescription>
      </FieldContent>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </Field>
  )
}

function ResponsiveExample() {
  return (
    <FieldGroup className="w-72">
      <Field orientation="responsive">
        <FieldLabel htmlFor="fp-resp-name">Full name</FieldLabel>
        <Input id="fp-resp-name" placeholder="John Smith" />
      </Field>
      <Field orientation="responsive">
        <FieldLabel htmlFor="fp-resp-email">Email</FieldLabel>
        <Input id="fp-resp-email" type="email" placeholder="user@example.com" />
      </Field>
    </FieldGroup>
  )
}

function FieldGroupExample() {
  return (
    <FieldGroup className="w-64">
      <Field>
        <FieldLabel htmlFor="fp-g-first">First name</FieldLabel>
        <Input id="fp-g-first" placeholder="First" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fp-g-last">Last name</FieldLabel>
        <Input id="fp-g-last" placeholder="Last" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fp-g-bio">Bio</FieldLabel>
        <Textarea id="fp-g-bio" placeholder="Tell us about yourself" rows={3} />
        <FieldDescription>Max 160 characters.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}

function WithSeparatorExample() {
  return (
    <FieldGroup className="w-64">
      <Field>
        <FieldLabel htmlFor="fp-s-email">Email</FieldLabel>
        <Input id="fp-s-email" type="email" placeholder="user@example.com" />
      </Field>
      <FieldSeparator>or</FieldSeparator>
      <Field>
        <FieldLabel htmlFor="fp-s-phone">Phone</FieldLabel>
        <Input id="fp-s-phone" type="tel" placeholder="+1 000 000 0000" />
      </Field>
    </FieldGroup>
  )
}

export function FieldPrimitivesExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="Label + input — minimal composition">
          <BasicExample />
        </ExItem>
        <ExItem label="With description — supplementary hint below control">
          <WithDescriptionExample />
        </ExItem>
        <ExItem label="With error — invalid state, destructive label + message">
          <WithErrorExample />
        </ExItem>
      </ExRow>

      <ExRow label="Orientation">
        <ExItem label="Horizontal — label and control on the same row">
          <HorizontalExample />
        </ExItem>
        <ExItem label="Horizontal with FieldContent — title + description stacked beside control">
          <HorizontalWithContentExample />
        </ExItem>
        <ExItem label="Responsive — vertical on mobile, horizontal at md breakpoint">
          <ResponsiveExample />
        </ExItem>
      </ExRow>

      <ExRow label="Group">
        <ExItem label="FieldGroup — consistent gap between stacked fields">
          <FieldGroupExample />
        </ExItem>
        <ExItem label="FieldSeparator — divider with optional label between fields">
          <WithSeparatorExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
