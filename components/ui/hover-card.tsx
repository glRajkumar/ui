'use client'

import { PreviewCard as HoverCardPrimitive } from '@base-ui/react/preview-card'
import type * as React from 'react'

import { cn } from '@/lib/utils'

function HoverCard(props: HoverCardPrimitive.Root.Props) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({ className, ...props }: HoverCardPrimitive.Trigger.Props) {
  return (
    <HoverCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

function HoverCardArrow({ className, ...props }: HoverCardPrimitive.Arrow.Props) {
  return (
    <HoverCardPrimitive.Arrow
      data-slot="hover-card-arrow"
      className={cn(
        'flex data-[side=bottom]:top-[-10px] data-[side=left]:right-[-14px] data-[side=left]:rotate-90 data-[side=right]:left-[-14px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-10px] data-[side=top]:rotate-180',
        className,
      )}
      {...props}
    >
      <svg width="20" height="10" viewBox="0 0 20 10" className="block">
        <path d="M 0 10 L 10 0 L 20 10 Z" className="fill-popover" />
        <path
          d="M 0 10 L 10 0 L 20 10"
          className="fill-none stroke-foreground/10"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </HoverCardPrimitive.Arrow>
  )
}

type hoverCardContentType = HoverCardPrimitive.Popup.Props &
  Pick<
    HoverCardPrimitive.Positioner.Props,
    | 'align'
    | 'alignOffset'
    | 'side'
    | 'sideOffset'
    | 'arrowPadding'
    | 'collisionAvoidance'
    | 'collisionBoundary'
    | 'collisionPadding'
  > & {
    showArrow?: boolean
    arrowClassName?: string
  }

function HoverCardContent({
  className,
  align = 'center',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  arrowPadding,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  showArrow,
  arrowClassName,
  children,
  ...props
}: hoverCardContentType) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
        collisionPadding={collisionPadding}
        collisionBoundary={collisionBoundary}
        collisionAvoidance={collisionAvoidance}
      >
        <HoverCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            'flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        >
          {children}
          {showArrow && <HoverCardArrow className={arrowClassName} />}
        </HoverCardPrimitive.Popup>
      </HoverCardPrimitive.Positioner>
    </HoverCardPrimitive.Portal>
  )
}

function HoverCardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="hover-card-header"
      className={cn('flex flex-col gap-0.5 text-sm', className)}
      {...props}
    />
  )
}

function HoverCardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="hover-card-title" className={cn('font-medium', className)} {...props} />
}

function HoverCardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="hover-card-description"
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  )
}

type HoverCardWrapperProps = {
  trigger?: React.ReactNode
  content?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  triggerCls?: string
  triggerProps?: Omit<HoverCardPrimitive.Trigger.Props, 'className' | 'children'>
  contentCls?: string
  contentProps?: Omit<hoverCardContentType, 'className'>
} & Omit<React.ComponentProps<typeof HoverCardPrimitive.Root>, 'children'>

function HoverCardWrapper({
  trigger,
  content,
  title,
  description,
  triggerCls,
  triggerProps,
  contentCls,
  contentProps,
  ...props
}: HoverCardWrapperProps) {
  return (
    <HoverCard {...props}>
      <HoverCardTrigger className={cn(triggerCls)} {...triggerProps}>
        {trigger}
      </HoverCardTrigger>

      <HoverCardContent {...contentProps} className={cn(contentCls)}>
        {(title || description) && (
          <HoverCardHeader>
            {title && <HoverCardTitle>{title}</HoverCardTitle>}
            {description && <HoverCardDescription>{description}</HoverCardDescription>}
          </HoverCardHeader>
        )}
        {content}
      </HoverCardContent>
    </HoverCard>
  )
}

export {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardDescription,
  HoverCardHeader,
  HoverCardTitle,
  HoverCardTrigger,
  HoverCardWrapper,
}
