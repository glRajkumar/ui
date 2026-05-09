'use client'

import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'

import { buttonVariants } from '@/components/ui/button'
import { AlertDialogTrigger, AlertDialogWrapper } from '@/components/ui/alert-dialog'

const singleHandle = AlertDialogPrimitive.createHandle()

export function DetachedTriggerExample() {
  return (
    <>
      <AlertDialogTrigger
        handle={singleHandle}
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        Detached
      </AlertDialogTrigger>

      <AlertDialogWrapper
        handle={singleHandle}
        title="Detached trigger"
        description="This dialog is controlled by a trigger placed outside the wrapper."
      />
    </>
  )
}

const multiHandle = AlertDialogPrimitive.createHandle()

export function MultipleDetachedExample() {
  return (
    <>
      <AlertDialogTrigger
        handle={multiHandle}
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        Trigger 1
      </AlertDialogTrigger>

      <AlertDialogTrigger
        handle={multiHandle}
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        Trigger 2
      </AlertDialogTrigger>

      <AlertDialogWrapper
        handle={multiHandle}
        title="Multiple detached triggers"
        description="Two separate triggers sharing one dialog via the same handle."
      />
    </>
  )
}
