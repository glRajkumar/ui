'use client'

import { useState } from 'react'
import { CircleHelpIcon, Info, LayoutDashboard, Settings, ShieldCheck } from 'lucide-react'

import { ExRow, ExItem } from '@/components/examples/common'
import {
  NavigationMenuWrapper,
  NavLinkItem,
  NavList,
} from '@/components/ui/navigation-menu-wrapper'
import { buttonVariants } from '@/components/ui/button'

function GroupLabelContent() {
  return (
    <div className="p-3 w-72">
      <p className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Platform
      </p>
      <NavList
        wrapperCls="mb-3"
        items={[
          { href: '/dashboard', children: <><LayoutDashboard className="size-4" /> Dashboard</> },
          { href: '/settings', children: <><Settings className="size-4" /> Settings</> },
        ]}
      />
      <p className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Security
      </p>
      <NavList
        items={[
          { href: '/audit', children: <><ShieldCheck className="size-4" /> Audit Log</> },
          { href: '/roles', children: 'Roles & Permissions' },
        ]}
      />
    </div>
  )
}

function BasicExample() {
  return (
    <NavigationMenuWrapper
      items={[
        {
          key: 'home',
          trigger: 'Home',
          content: (
            <div className="p-2 w-56">
              <NavList
                items={[
                  { href: '/', children: 'Dashboard' },
                  { href: '/about', children: 'About Us' },
                ]}
              />
            </div>
          ),
        },
        { key: 'pricing', href: '/pricing', children: 'Pricing' },
        {
          key: 'features',
          trigger: 'Features',
          content: (
            <div className="p-2 w-72">
              <p className="text-sm font-semibold mb-1">Product Features</p>
              <NavList
                items={[
                  { href: '/fast', children: 'Fast Performance' },
                  { href: '/secure', children: 'Secure Infrastructure' },
                  {
                    href: '/todo',
                    children: (
                      <>
                        <CircleHelpIcon className="size-4" /> Backlog
                      </>
                    ),
                  },
                ]}
              />
            </div>
          ),
        },
      ]}
    />
  )
}

function GroupLabelExample() {
  return (
    <NavigationMenuWrapper
      items={[
        {
          key: 'platform',
          trigger: 'Platform',
          content: <GroupLabelContent />,
        },
        { key: 'docs', href: '/docs', children: 'Docs' },
      ]}
    />
  )
}

function DefaultOpenExample() {
  return (
    <NavigationMenuWrapper
      defaultValue="tools"
      items={[
        {
          key: 'tools',
          trigger: 'Tools',
          content: (
            <div className="p-2 w-48">
              <NavList
                items={[
                  { href: '/formatter', children: 'Formatter' },
                  { href: '/linter', children: 'Linter' },
                ]}
              />
            </div>
          ),
        },
        {
          key: 'docs',
          trigger: 'Docs',
          content: (
            <div className="p-2 w-48">
              <NavList
                items={[
                  { href: '/api', children: 'API Reference' },
                  { href: '/guides', children: 'Guides' },
                ]}
              />
            </div>
          ),
        },
      ]}
    />
  )
}

function InstantHoverExample() {
  return (
    <NavigationMenuWrapper
      delay={0}
      closeDelay={150}
      items={[
        {
          key: 'products',
          trigger: 'Products',
          content: (
            <div className="p-2 w-56">
              <NavList
                items={[
                  { href: '/analytics', children: 'Analytics' },
                  { href: '/reporting', children: 'Reporting' },
                ]}
              />
            </div>
          ),
        },
        {
          key: 'company',
          trigger: 'Company',
          content: (
            <div className="p-2 w-56">
              <NavList
                items={[
                  { href: '/about', children: 'About' },
                  { href: '/careers', children: 'Careers' },
                ]}
              />
            </div>
          ),
        },
        { key: 'blog', href: '/blog', children: 'Blog' },
      ]}
    />
  )
}

function ControlledExample() {
  const [value, setValue] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
          onClick={() => setValue(value === 'tools' ? null : 'tools')}
        >
          {value === 'tools' ? 'Close Tools' : 'Open Tools'}
        </button>
        <button
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
          onClick={() => setValue(null)}
        >
          Close All
        </button>
      </div>

      <NavigationMenuWrapper
        value={value}
        onValueChange={v => setValue(v)}
        items={[
          {
            key: 'tools',
            trigger: 'Tools',
            content: (
              <div className="p-2 w-56">
                <NavList
                  items={[
                    { href: '/formatter', children: 'Formatter' },
                    { href: '/linter', children: 'Linter' },
                  ]}
                />
              </div>
            ),
          },
          {
            key: 'docs',
            trigger: 'Docs',
            content: (
              <div className="p-2 w-48">
                <NavList
                  items={[
                    { href: '/api', children: 'API Reference' },
                    { href: '/guides', children: 'Guides' },
                  ]}
                />
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}

function NavListExample() {
  return (
    <NavList
      wrapperCls="space-y-1"
      items={[
        {
          href: '/',
          children: (
            <>
              <LayoutDashboard className="size-4" /> Dashboard
            </>
          ),
        },
        {
          href: '/about',
          children: (
            <>
              <Info className="size-4" /> About
            </>
          ),
        },
      ]}
    />
  )
}

export function NavigationMenuExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="Triggers and link items">
          <BasicExample />
        </ExItem>
        <ExItem label="Group labels in content">
          <GroupLabelExample />
        </ExItem>
      </ExRow>

      <ExRow label="Behavior">
        <ExItem label="Default open (defaultValue)">
          <DefaultOpenExample />
        </ExItem>
        <ExItem label="Instant hover (delay=0)">
          <InstantHoverExample />
        </ExItem>
        <ExItem label="Controlled value">
          <ControlledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Helpers">
        <ExItem label="NavList">
          <NavListExample />
        </ExItem>
        <ExItem label="NavLinkItem">
          <NavLinkItem href="/about">About Us</NavLinkItem>
        </ExItem>
      </ExRow>
    </div>
  )
}
