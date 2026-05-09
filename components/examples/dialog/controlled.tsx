'use client'

import { useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { DialogWrapper } from '@/components/ui/dialog'

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

      <DialogWrapper
        open={open}
        onOpenChange={setOpen}
        title="Controlled dialog"
        description="Opened programmatically — no built-in trigger."
        action="Confirm"
        cancel="Cancel"
        onAction={() => setOpen(false)}
      />
    </>
  )
}

export function AsyncActionExample() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    await new Promise<void>((r) => setTimeout(r, 1500))
    setLoading(false)
    setOpen(false)
  }

  return (
    <DialogWrapper
      open={open}
      onOpenChange={setOpen}
      trigger="Async Action"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Save changes?"
      description="Your changes will be persisted to the server."
      action="Save"
      loading={loading}
      onAction={handleSave}
    />
  )
}
