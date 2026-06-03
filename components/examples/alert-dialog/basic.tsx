'use client'

import * as React from 'react'
import { Trash2, LogOut, TriangleAlert, Link } from 'lucide-react'

import { cn } from '@/lib/utils'

import { AlertDialogWrapper } from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'

const CardTrigger = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-3 py-2 flex cursor-pointer select-none items-center gap-2',
        'bg-destructive/5 text-sm text-destructive hover:bg-destructive/10',
        'rounded-md border border-destructive/30',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)

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
      trigger={
        <>
          <LogOut /> Sign out
        </>
      }
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
      trigger={
        <>
          <Trash2 /> With Media
        </>
      }
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
      triggerCls={buttonVariants({ variant: 'secondary', size: 'sm' })}
      title="Irreversible action"
      description="Proceeding will permanently alter the system state."
      footerCls="bg-primary/5"
      actionCls="ring-2 ring-ring ring-offset-1"
      cancelCls="text-destructive border-destructive/40"
    />
  )
}

export function IconTriggerExample() {
  return (
    <AlertDialogWrapper
      trigger={
        <>
          <Trash2 /> Icon + Text
        </>
      }
      triggerCls={buttonVariants({ variant: 'destructive', size: 'sm' })}
      title="Delete permanently?"
      description="This action cannot be undone."
      action="Delete"
    />
  )
}

export function IconOnlyTriggerExample() {
  return (
    <AlertDialogWrapper
      trigger={<Trash2 />}
      triggerCls={buttonVariants({ variant: 'outline', size: 'icon-sm' })}
      title="Delete permanently?"
      description="This action cannot be undone."
      action="Delete"
    />
  )
}

export function CustomElementTriggerExample() {
  return (
    <AlertDialogWrapper
      trigger={
        <>
          <TriangleAlert className="size-4" /> div trigger
        </>
      }
      triggerProps={{
        render: <div role="button" tabIndex={0} />,
        nativeButton: false,
      }}
      triggerCls={cn(
        'flex cursor-pointer items-center gap-1.5 px-2 py-1',
        'text-sm text-destructive hover:bg-destructive/10',
        'rounded border border-dashed border-destructive/50',
      )}
      title="Sign out?"
      description="You will be logged out of your account."
      action="Sign out"
    />
  )
}

export function AnchorTriggerExample() {
  return (
    <AlertDialogWrapper
      trigger={
        <>
          <Link className="size-3" /> anchor trigger
        </>
      }
      triggerProps={{
        render: <a href="#" />,
        nativeButton: false,
      }}
      triggerCls={cn(
        'inline-flex items-center gap-1',
        'text-sm text-primary underline underline-offset-4 hover:text-primary/70 cursor-pointer',
      )}
      title="Delete file?"
      description="The file will be permanently removed."
      action="Delete"
    />
  )
}

export function CustomComponentTriggerExample() {
  return (
    <AlertDialogWrapper
      trigger={
        <>
          <Trash2 className="size-4" /> custom comp
        </>
      }
      triggerProps={{ render: <CardTrigger />, nativeButton: false }}
      title="Delete record?"
      description="This record and all associated data will be permanently deleted."
      action="Delete"
    />
  )
}
