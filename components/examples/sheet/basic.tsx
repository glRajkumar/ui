'use client'

import { buttonVariants } from '@/components/ui/button'
import { SheetWrapper } from '@/components/ui/sheet'

export function BasicExample() {
  return (
    <SheetWrapper
      trigger="Basic"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Basic sheet"
      description="Default right-side sheet."
      action="Save"
    />
  )
}

export function NoActionExample() {
  return (
    <SheetWrapper
      trigger="No Action"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Notifications"
      description="You have no new notifications."
      action=""
      cancel="Close"
    />
  )
}

export function NoCloseButtonExample() {
  return (
    <SheetWrapper
      trigger="No Close Btn"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="No close button"
      description="Use the footer buttons to close this sheet."
      showCloseButton={false}
      action="Done"
    />
  )
}

export function SideRightExample() {
  return (
    <SheetWrapper
      trigger="Right"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      side="right"
      title="Right sheet"
      description="Slides in from the right edge."
      action="Save"
    />
  )
}

export function SideLeftExample() {
  return (
    <SheetWrapper
      trigger="Left"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      side="left"
      title="Left sheet"
      description="Slides in from the left edge."
      action="Save"
    />
  )
}

export function SideTopExample() {
  return (
    <SheetWrapper
      trigger="Top"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      side="top"
      title="Top sheet"
      description="Slides down from the top edge."
      action="Save"
    />
  )
}

export function SideBottomExample() {
  return (
    <SheetWrapper
      trigger="Bottom"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      side="bottom"
      title="Bottom sheet"
      description="Slides up from the bottom edge."
      action="Save"
    />
  )
}
