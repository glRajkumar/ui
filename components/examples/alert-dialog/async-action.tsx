'use client'

import { useState } from 'react'

import { AlertDialogWrapper } from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'

function simulateRequest() {
  return new Promise<void>((resolve) => setTimeout(resolve, 1500))
}

export function AsyncActionExample() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleAction() {
    setLoading(true)
    await simulateRequest()
    setLoading(false)
    setOpen(false)
  }

  return (
    <AlertDialogWrapper
      open={open}
      onOpenChange={setOpen}
      trigger="Async Action"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Delete this record?"
      description="This will permanently delete the record and all related data."
      loading={loading}
      onAction={handleAction}
    />
  )
}
