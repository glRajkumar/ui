'use client'

import { useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { DrawerWrapper } from '@/components/ui/drawer'

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

      <DrawerWrapper
        open={open}
        onOpenChange={setOpen}
        title="Controlled drawer"
        description="Opened programmatically — no built-in trigger."
        action="Confirm"
        onAction={() => setOpen(false)}
      />
    </>
  )
}

export function AsyncActionExample() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleAction() {
    setLoading(true)
    await new Promise<void>(r => setTimeout(r, 1500))
    setLoading(false)
    setOpen(false)
  }

  return (
    <DrawerWrapper
      open={open}
      onOpenChange={setOpen}
      trigger="Async Action"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Submit form?"
      description="Your data will be sent to the server."
      action="Submit"
      loading={loading}
      onAction={handleAction}
    />
  )
}
