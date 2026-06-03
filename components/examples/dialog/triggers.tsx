'use client'

import { TriangleAlert } from 'lucide-react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'

import { buttonVariants } from '@/components/ui/button'
import { DialogTrigger, DialogWrapper } from '@/components/ui/dialog'

export function CustomElementTriggerExample() {
  return (
    <DialogWrapper
      trigger={
        <>
          <TriangleAlert className="size-4" /> div trigger
        </>
      }
      triggerProps={{
        render: <div role="button" tabIndex={0} />,
        nativeButton: false,
      }}
      triggerCls="flex cursor-pointer items-center gap-1.5 rounded border border-dashed border-primary/50 px-2 py-1 text-sm text-primary hover:bg-primary/10"
      title="Custom element trigger"
      description="This dialog was opened via a div element, not a button."
      action="OK"
    />
  )
}

const detachedHandle = DialogPrimitive.createHandle()

export function DetachedTriggerExample() {
  return (
    <>
      <DialogTrigger
        handle={detachedHandle}
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        Detached
      </DialogTrigger>

      <DialogWrapper
        handle={detachedHandle}
        title="Detached trigger"
        description="Trigger lives outside the wrapper — linked via handle."
        action="OK"
      />
    </>
  )
}

type ItemPayload = { name: string; role: string }
const multiHandle = DialogPrimitive.createHandle<ItemPayload>()

export function MultipleTriggersExample() {
  return (
    <>
      <DialogTrigger
        handle={multiHandle}
        payload={{ name: 'Alice', role: 'Admin' }}
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        Alice
      </DialogTrigger>

      <DialogTrigger
        handle={multiHandle}
        payload={{ name: 'Bob', role: 'Editor' }}
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        Bob
      </DialogTrigger>

      <DialogPrimitive.Root handle={multiHandle}>
        {({ payload }) => (
          <DialogPrimitive.Portal>
            <DialogPrimitive.Backdrop className="fixed inset-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
            <DialogPrimitive.Popup className="fixed top-1/2 left-1/2 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-4 text-sm ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
              <DialogPrimitive.Title className="text-base font-medium">
                {payload?.name}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm text-muted-foreground">
                Role: {payload?.role}
              </DialogPrimitive.Description>
              <DialogPrimitive.Close className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                Close
              </DialogPrimitive.Close>
            </DialogPrimitive.Popup>
          </DialogPrimitive.Portal>
        )}
      </DialogPrimitive.Root>
    </>
  )
}
