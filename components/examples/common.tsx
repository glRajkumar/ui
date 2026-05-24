'use client'

import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"

type exRowProps = {
  label: string
  children: React.ReactNode
  className?: string
}

export function ExRow({ label, children, className }: exRowProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <div className="row-container flex flex-wrap gap-4">{children}</div>
    </div>
  )
}

type exItemProps = {
  label: string
  children: React.ReactNode
  className?: string
}

export function ExItem({ label, children, className }: exItemProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

export function renderSearchStatus(isLoading: boolean, isFetching: boolean): React.ReactNode {
  if (isLoading) return (
    <p className='flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground'>
      <Loader2 className='size-4 animate-spin' /> Loading...
    </p>
  )
  if (isFetching) return (
    <p className='flex items-center gap-2 p-2 text-sm text-muted-foreground'>
      <Loader2 className='size-4 animate-spin' /> Fetching...
    </p>
  )
  return null
}

export function renderSearchEmpty(
  hasTyped: boolean,
  isLoading: boolean,
  isFetching: boolean,
  message = 'No results found',
): React.ReactNode {
  if (!hasTyped && !isLoading && !isFetching) return <p className='py-6'>Start typing to fetch results...</p>
  if (!hasTyped || isLoading || isFetching) return null
  return <p className='py-6'>{message}</p>
}
