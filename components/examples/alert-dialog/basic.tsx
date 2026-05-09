'use client'

import { Trash2 } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { AlertDialogWrapper } from '@/components/ui/alert-dialog'

export function BasicExample() {
  return (
    <AlertDialogWrapper
      trigger="Basic"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
    />
  )
}

export function NoDescriptionExample() {
  return (
    <AlertDialogWrapper
      trigger="No Description"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Sign out of your account?"
      description=""
      action="Sign out"
    />
  )
}

export function NoActionExample() {
  return (
    <AlertDialogWrapper
      trigger="No Action"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Read-only notice"
      description="You are viewing this project in read-only mode. Contact the owner to request edit access."
      action=""
      cancel="Got it"
    />
  )
}

export function WithMediaExample() {
  return (
    <AlertDialogWrapper
      trigger="With Media"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      media={<Trash2 />}
      title="Delete account?"
      description="All your data will be permanently deleted. This action cannot be undone."
      action="Delete"
    />
  )
}

export function CustomStylingExample() {
  return (
    <AlertDialogWrapper
      trigger="Custom Style"
      triggerCls={buttonVariants({ variant: 'outline', size: 'sm' })}
      title="Irreversible action"
      description="Proceeding will permanently alter the system state."
      actionCls="font-bold"
      cancelCls="opacity-70"
    />
  )
}
