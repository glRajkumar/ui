'use client'

import { buttonVariants } from '@/components/ui/button'
import { DialogWrapper } from '@/components/ui/dialog'

export function NestedDialogExample() {
  return (
    <DialogWrapper
      trigger="Nested"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Outer dialog"
      description="This is the outer dialog. You can open another from inside."
      action=""
      cancel="Close outer"
    >
      <DialogWrapper
        trigger="Open inner"
        triggerCls={buttonVariants({ variant: 'secondary', size: 'sm' })}
        title="Inner dialog"
        description="Nested inside the outer dialog. Base UI handles stacking automatically."
        action="Confirm"
      />
    </DialogWrapper>
  )
}

export function MultipleOpenExample() {
  return (
    <>
      <DialogWrapper
        trigger="Dialog A"
        triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
        title="Dialog A"
        description="First dialog — open Dialog B while this is open."
        action=""
        cancel="Close A"
      />

      <DialogWrapper
        trigger="Dialog B"
        triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
        title="Dialog B"
        description="Second dialog — both A and B can be open simultaneously."
        action=""
        cancel="Close B"
      />
    </>
  )
}
