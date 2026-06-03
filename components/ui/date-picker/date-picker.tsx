'use client'

import * as React from 'react'
import { type DateRange } from '@daypicker/react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

import { Calendar } from './calendar'

type Selected = Date | Date[] | DateRange | undefined

function formatSelected(selected: Selected, fmt: string): string | null {
  if (!selected) return null
  if (selected instanceof Date) return format(selected, fmt)
  if (Array.isArray(selected)) {
    if (!selected.length) return null
    return selected.length === 1 ? format(selected[0]!, fmt) : `${selected.length} dates selected`
  }
  const range = selected as DateRange
  if (!range.from) return null
  if (!range.to) return format(range.from, fmt)
  return `${format(range.from, fmt)} - ${format(range.to, fmt)}`
}

function getDefaultMonth(selected: Selected): Date | undefined {
  if (!selected) return undefined
  if (selected instanceof Date) return selected
  if (Array.isArray(selected)) return selected[0]
  return (selected as DateRange).from
}

type DatePickerProps = Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect'> & {
  mode?: 'single' | 'multiple' | 'range'
  selected?: Selected
  onSelect?: (...args: any[]) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  dateFormat?: string
  triggerProps?: Omit<React.ComponentProps<typeof Button>, 'children'>
  align?: React.ComponentProps<typeof PopoverContent>['align']
}

function DatePicker({
  open: controlledOpen,
  onOpenChange: onOpenChangeProp,
  placeholder = 'Pick a date',
  dateFormat = 'dd/MM/yyyy',
  triggerProps,
  align = 'start',
  mode,
  selected,
  onSelect,
  ...calendarProps
}: DatePickerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  function handleOpenChange(next: boolean) {
    if (!isControlled) setInternalOpen(next)
    onOpenChangeProp?.(next)
  }

  function handleSelect(...args: any[]) {
    onSelect?.(...args)
    const effectiveMode = mode ?? 'single'
    if (effectiveMode === 'single') {
      handleOpenChange(false)
    } else if (effectiveMode === 'range') {
      const val = args[0] as DateRange | undefined
      if (val?.from && val?.to) handleOpenChange(false)
    }
  }

  const { className: triggerClassName, ...restTriggerProps } = triggerProps ?? {}
  const label = formatSelected(selected, dateFormat)

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            {...restTriggerProps}
            className={cn(
              'w-full pl-3 text-left font-normal shadow-xs',
              !label && 'text-muted-foreground',
              triggerClassName,
            )}
          >
            {label ?? <span>{placeholder}</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        }
      />

      <PopoverContent className="w-auto p-0" align={align}>
        <Calendar
          {...({
            autoFocus: true,
            captionLayout: 'dropdown',
            defaultMonth: getDefaultMonth(selected),
            mode: mode ?? 'single',
            selected,
            onSelect: handleSelect,
            ...calendarProps,
          } as React.ComponentProps<typeof Calendar>)}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
export type { DatePickerProps }
