'use client'

import * as React from 'react'
import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Collapsible(props: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  className,
  children,
  indicatorAt = 'right',
  ...props
}: CollapsiblePrimitive.Trigger.Props & { indicatorAt?: indicatorAtT }) {
  const icon = (
    <ChevronDownIcon
      data-slot="collapsible-trigger-icon"
      className={cn(
        'pointer-events-none shrink-0 transition-transform duration-200 group-data-[panel-open]/collapsible-trigger:rotate-180',
        indicatorAt === 'right' && 'ml-auto',
      )}
    />
  )

  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        'group/collapsible-trigger flex w-full items-center gap-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer disabled:pointer-events-none disabled:opacity-50 **:data-[slot=collapsible-trigger-icon]:size-4 **:data-[slot=collapsible-trigger-icon]:text-muted-foreground',
        className,
      )}
      {...props}
    >
      {indicatorAt === 'left' && icon}
      {children}
      {indicatorAt === 'right' && icon}
    </CollapsiblePrimitive.Trigger>
  )
}

function CollapsibleContent({ className, ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn(
        'overflow-hidden text-sm h-(--collapsible-panel-height) transition-[height] ease-out data-ending-style:h-0 data-starting-style:h-0',
        className,
      )}
      {...props}
    />
  )
}

type CollapsibleWrapperProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  triggerCls?: string
  contentCls?: string
  indicatorAt?: indicatorAtT
  triggerProps?: Omit<CollapsiblePrimitive.Trigger.Props, 'children' | 'className'>
  contentProps?: Omit<CollapsiblePrimitive.Panel.Props, 'children' | 'className'>
} & CollapsiblePrimitive.Root.Props

function CollapsibleWrapper({
  trigger,
  children,
  triggerCls,
  contentCls,
  indicatorAt = 'right',
  triggerProps,
  contentProps,
  ...props
}: CollapsibleWrapperProps) {
  return (
    <Collapsible {...props}>
      <CollapsibleTrigger className={cn(triggerCls)} indicatorAt={indicatorAt} {...triggerProps}>
        {trigger}
      </CollapsibleTrigger>
      <CollapsibleContent className={cn(contentCls)} {...contentProps}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent, CollapsibleWrapper }
