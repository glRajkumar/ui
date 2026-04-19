'use client'

import { Toast as ToastPrimitive } from '@base-ui/react/toast'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function ToastProvider(props: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider data-slot="toast-provider" {...props} />
}

function ToastPortal(props: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal {...props} />
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        'fixed bottom-4 right-4 z-50 mx-auto flex w-[300px] outline-none sm:bottom-8 sm:right-8 sm:w-[360px]',
        className,
      )}
      {...props}
    />
  )
}

function ToastRoot({ className, ...props }: ToastPrimitive.Root.Props) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(
        '[--gap:0.75rem] [--peek:0.75rem]',
        '[--scale:calc(max(0,1-(var(--toast-index)*0.1)))]',
        '[--shrink:calc(1-var(--scale))]',
        '[--height:var(--toast-frontmost-height,var(--toast-height))]',
        '[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]',
        'absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] w-full',
        'origin-bottom rounded-lg border bg-background bg-clip-padding p-4 shadow-lg select-none',
        'after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[""]',
        'h-[var(--height)] [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]',
        '[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]',
        'data-[starting-style]:[transform:translateY(150%)]',
        'data-[ending-style]:opacity-0',
        '[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]',
        'data-[expanded]:h-[var(--toast-height)]',
        'data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]',
        'data-[limited]:opacity-0',
        'data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
        'data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
        'data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
        'data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
        'data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
        'data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
        'data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]',
        'data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]',
        className,
      )}
      {...props}
    />
  )
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        'overflow-hidden transition-opacity [transition-duration:250ms]',
        'data-[behind]:pointer-events-none data-[behind]:opacity-0',
        'data-[expanded]:pointer-events-auto data-[expanded]:opacity-100',
        className,
      )}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn('text-sm leading-5 font-semibold', className)}
      {...props}
    />
  )
}

function ToastDescription({ className, ...props }: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn('text-sm leading-5 text-muted-foreground', className)}
      {...props}
    />
  )
}

function ToastClose({ className, ...props }: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close"
      className={cn(
        'absolute top-2 right-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm',
        'text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      {...props}
    >
      <XIcon className="h-4 w-4" />
    </ToastPrimitive.Close>
  )
}

type toasterProps = {
  viewportCls?: string
  toastCls?: string
  contentCls?: string
  titleCls?: string
  descriptionCls?: string
  closeCls?: string
  showClose?: boolean
} & ToastPrimitive.Provider.Props

function Toaster({
  viewportCls,
  toastCls,
  contentCls,
  titleCls,
  descriptionCls,
  closeCls,
  showClose = true,
  children,
  ...props
}: toasterProps) {
  return (
    <ToastProvider {...props}>
      {children}
      <ToastPortal>
        <ToastViewport className={viewportCls}>
          <ToastList
            toastCls={toastCls}
            contentCls={contentCls}
            titleCls={titleCls}
            descriptionCls={descriptionCls}
            closeCls={closeCls}
            showClose={showClose}
          />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

type toastListProps = {
  toastCls?: string
  contentCls?: string
  titleCls?: string
  descriptionCls?: string
  closeCls?: string
  showClose?: boolean
}

function ToastList({
  toastCls,
  contentCls,
  titleCls,
  descriptionCls,
  closeCls,
  showClose = true,
}: toastListProps) {
  const { toasts } = ToastPrimitive.useToastManager()
  return toasts.map(toast => (
    <ToastRoot key={toast.id} toast={toast} className={toastCls}>
      <ToastContent className={contentCls}>
        <ToastTitle className={titleCls} />
        <ToastDescription className={descriptionCls} />
        {showClose && <ToastClose className={closeCls} />}
      </ToastContent>
    </ToastRoot>
  ))
}

const createToastManager = ToastPrimitive.createToastManager
const useToastManager = ToastPrimitive.useToastManager

export {
  ToastProvider,
  ToastPortal,
  ToastViewport,
  ToastRoot,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastClose,
  Toaster,
  createToastManager,
  useToastManager,
}
