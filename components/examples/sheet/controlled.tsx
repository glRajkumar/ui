'use client'

import { useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { SheetWrapper } from '@/components/ui/sheet'

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

      <SheetWrapper
        open={open}
        onOpenChange={setOpen}
        title="Controlled sheet"
        description="Opened programmatically — no built-in trigger."
        action="Save"
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
    <SheetWrapper
      open={open}
      onOpenChange={setOpen}
      trigger="Async Action"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Save settings?"
      description="Your settings will be persisted to the server."
      action="Save"
      loading={loading}
      onAction={handleSave}
    />
  )
}
