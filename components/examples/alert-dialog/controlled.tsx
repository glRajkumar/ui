'use client'

import { useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { AlertDialogWrapper } from '@/components/ui/alert-dialog'

export function ControlledExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
        onClick={() => setOpen(true)}
      >
        No Trigger
      </button>

      <AlertDialogWrapper
        open={open}
        onOpenChange={setOpen}
        title="Leave page?"
        description="You have unsaved changes. Leaving will discard them."
        action="Leave"
        cancel="Stay"
        onAction={() => setOpen(false)}
      />
    </>
  )
}

export function ControlledWithTriggerExample() {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialogWrapper
      open={open}
      onOpenChange={setOpen}
      trigger="With Trigger"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Confirm action"
      description="This is a controlled dialog — open state is managed externally."
      onAction={() => setOpen(false)}
    />
  )
}
