'use client'

import { buttonVariants } from '@/components/ui/button'
import { DrawerWrapper } from '@/components/ui/drawer'

export function BasicExample() {
  return (
    <DrawerWrapper
      trigger="Basic"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Basic drawer"
      description="Default bottom drawer with swipe-to-dismiss."
      action="Confirm"
    />
  )
}

export function NoActionExample() {
  return (
    <DrawerWrapper
      trigger="No Action"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Notification"
      description="Your session will expire in 5 minutes."
      action=""
      cancel="Got it"
    />
  )
}

export function SideBottomExample() {
  return (
    <DrawerWrapper
      trigger="Bottom"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      side="bottom"
      swipeDirection="down"
      title="Bottom drawer"
      description="Swipe down to dismiss."
      action="Confirm"
    />
  )
}

export function SideTopExample() {
  return (
    <DrawerWrapper
      trigger="Top"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      side="top"
      swipeDirection="up"
      title="Top drawer"
      description="Swipe up to dismiss."
      action="Confirm"
    />
  )
}

export function SideLeftExample() {
  return (
    <DrawerWrapper
      trigger="Left"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      side="left"
      swipeDirection="left"
      title="Left drawer"
      description="Swipe left to dismiss."
      action="Confirm"
    />
  )
}

export function SideRightExample() {
  return (
    <DrawerWrapper
      trigger="Right"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      side="right"
      swipeDirection="right"
      title="Right drawer"
      description="Swipe right to dismiss."
      action="Confirm"
    />
  )
}
