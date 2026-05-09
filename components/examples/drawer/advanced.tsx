'use client'

import { buttonVariants } from '@/components/ui/button'
import { DrawerWrapper } from '@/components/ui/drawer'

export function SnapPointsExample() {
  return (
    <DrawerWrapper
      trigger="Snap Points"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Snap points"
      description="Drawer snaps to 40% or 100% of the viewport height. Drag to switch."
      action="Confirm"
      snapPoints={[0.4, 1]}
    />
  )
}

export function NonModalExample() {
  return (
    <DrawerWrapper
      trigger="Non-modal"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      modal={false}
      title="Non-modal drawer"
      description="Page content behind this drawer remains interactive."
      action="Close"
    />
  )
}

export function NestedDrawerExample() {
  return (
    <DrawerWrapper
      trigger="Nested"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Outer drawer"
      description="Open a second drawer from inside this one."
      action=""
      cancel="Close outer"
    >
      <DrawerWrapper
        trigger="Open inner"
        triggerCls={buttonVariants({ variant: 'secondary', size: 'sm' })}
        title="Inner drawer"
        description="Nested inside the outer drawer."
        action="Confirm"
      />
    </DrawerWrapper>
  )
}
