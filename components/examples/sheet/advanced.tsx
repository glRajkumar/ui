'use client'

import { buttonVariants } from '@/components/ui/button'
import { SheetWrapper } from '@/components/ui/sheet'

export function NestedSheetExample() {
  return (
    <SheetWrapper
      trigger="Nested"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      side="right"
      title="Outer sheet"
      description="Open a second sheet from inside this one."
      action=""
      cancel="Close outer"
    >
      <SheetWrapper
        trigger="Open inner"
        triggerCls={buttonVariants({ variant: 'secondary', size: 'sm' })}
        side="left"
        title="Inner sheet"
        description="Nested inside the outer sheet, sliding from the opposite side."
        action="Confirm"
      />
    </SheetWrapper>
  )
}

export function MultipleOpenExample() {
  return (
    <>
      <SheetWrapper
        trigger="Sheet A"
        triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
        side="right"
        title="Sheet A"
        description="First sheet — open Sheet B while this is open."
        action=""
        cancel="Close A"
      />

      <SheetWrapper
        trigger="Sheet B"
        triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
        side="left"
        title="Sheet B"
        description="Second sheet — both A and B can be open simultaneously."
        action=""
        cancel="Close B"
      />
    </>
  )
}
