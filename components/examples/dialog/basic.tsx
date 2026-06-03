'use client'

import { Settings } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { DialogWrapper } from '@/components/ui/dialog'

export function BasicExample() {
  return (
    <DialogWrapper
      trigger="Basic"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Edit profile"
      description="Make changes to your profile here. Click save when done."
      action="Save"
    />
  )
}

export function NoDescriptionExample() {
  return (
    <DialogWrapper
      trigger="No Description"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Quick confirm"
      description=""
      action="Confirm"
    />
  )
}

export function NoActionExample() {
  return (
    <DialogWrapper
      trigger="No Action"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Information"
      description="This dialog has no action button — only cancel."
      action=""
      cancel="Got it"
    />
  )
}

export function NoCloseButtonExample() {
  return (
    <DialogWrapper
      trigger="No Close Btn"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="No close button"
      description="The X button in the top-right is hidden."
      showCloseButton={false}
      action="Done"
    />
  )
}

export function IconTriggerExample() {
  return (
    <DialogWrapper
      trigger={
        <>
          <Settings /> Settings
        </>
      }
      triggerCls={buttonVariants({ variant: 'secondary', size: 'sm' })}
      title="Settings"
      description="Manage your application preferences."
      action="Save changes"
    />
  )
}
