'use client'

import { useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { DrawerWrapper } from '@/components/ui/drawer'

export function DrawerExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DrawerWrapper
        trigger="Delete"
        triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      />

      <DrawerWrapper
        open={open}
        onOpenChange={setOpen}
        trigger="Controlled"
        triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
        title="Do you want to leave page"
        description=""
        action="Proceed"
        onAction={() => setOpen(p => !p)}
      />

      <DrawerWrapper
        trigger="No Action"
        triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      />
    </>
  )
}
