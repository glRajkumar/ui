'use client'

import { useState } from 'react'
import { Bell, Settings, User } from 'lucide-react'

import { ExItem, ExRow } from '@/components/examples/common'
import { TabsWrapper } from '@/components/ui/tabs'

const TABS = [
  { value: 'profile', trigger: 'Profile', content: 'Manage your profile information.' },
  { value: 'account', trigger: 'Account', content: 'Update your account settings.' },
  { value: 'security', trigger: 'Security', content: 'Change your password and 2FA.' },
]

function DefaultExample() {
  return <TabsWrapper tabs={TABS} defaultValue="profile" className="w-80" />
}

function LineExample() {
  return <TabsWrapper tabs={TABS} defaultValue="profile" variant="line" className="w-80" />
}

function IconsExample() {
  return (
    <TabsWrapper
      tabs={[
        {
          value: 'profile',
          trigger: (
            <>
              <User /> Profile
            </>
          ),
          content: 'Profile content.',
        },
        {
          value: 'settings',
          trigger: (
            <>
              <Settings /> Settings
            </>
          ),
          content: 'Settings content.',
        },
        {
          value: 'alerts',
          trigger: (
            <>
              <Bell /> Alerts
            </>
          ),
          content: 'Notification settings.',
        },
      ]}
      defaultValue="profile"
      className="w-80"
    />
  )
}

function ControlledExample() {
  const [value, setValue] = useState('profile')

  return (
    <div className="flex flex-col gap-3 w-80">
      <TabsWrapper tabs={TABS} value={value} onValueChange={setValue} />
      <p className="text-sm text-muted-foreground">Active: {value}</p>
    </div>
  )
}

function VerticalExample() {
  return <TabsWrapper tabs={TABS} defaultValue="profile" orientation="vertical" className="w-80" />
}

function ActivationExample() {
  return (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <p className="text-xs text-muted-foreground mb-2">
          Manual (default) — Enter/Space to activate
        </p>
        <TabsWrapper tabs={TABS} defaultValue="profile" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">
          activateOnFocus — arrow keys activate immediately
        </p>
        <TabsWrapper tabs={TABS} defaultValue="profile" activateOnFocus />
      </div>
    </div>
  )
}

function DisabledExample() {
  return (
    <TabsWrapper
      tabs={[
        { value: 'profile', trigger: 'Profile', content: 'Profile content.' },
        { value: 'account', trigger: 'Account', content: 'Account content.', disabled: true },
        { value: 'security', trigger: 'Security', content: 'Security content.' },
      ]}
      defaultValue="profile"
      className="w-80"
    />
  )
}

export function TabsExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Variants">
        <ExItem label="Default — pill with sliding indicator animation">
          <DefaultExample />
        </ExItem>
        <ExItem label="Line — sliding underline indicator">
          <LineExample />
        </ExItem>
      </ExRow>

      <ExRow label="Icons">
        <ExItem label="Icon + label in trigger">
          <IconsExample />
        </ExItem>
      </ExRow>

      <ExRow label="Controlled">
        <ExItem label="value + onValueChange — driven by external state">
          <ControlledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Orientation">
        <ExItem label="orientation: vertical — list on left, content to right">
          <VerticalExample />
        </ExItem>
      </ExRow>

      <ExRow label="Activation mode">
        <ExItem label="activateOnFocus — arrow keys activate immediately vs manual Enter/Space">
          <ActivationExample />
        </ExItem>
      </ExRow>

      <ExRow label="Disabled">
        <ExItem label="tab.disabled — tab cannot be selected, focus skips it">
          <DisabledExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
