'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import {
  AlertDialogWrapper,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'

function simulateDelete() {
  return new Promise<void>((resolve) => setTimeout(resolve, 1500))
}

export function AsyncActionExample() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    await simulateDelete()
    setLoading(false)
    setOpen(false)
  }

  return (
    <AlertDialogWrapper
      open={open}
      onOpenChange={(next) => { if (!loading) setOpen(next) }}
      trigger="Async Action"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Delete this record?"
      description="This will permanently delete the record and all related data."
      action=""
      cancel=""
    >
      <AlertDialogFooter>
        <AlertDialogCancel disabled={loading} onClick={() => setOpen(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction disabled={loading} onClick={handleDelete}>
          {loading ? <Loader2 className="animate-spin" /> : 'Delete'}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogWrapper>
  )
}
