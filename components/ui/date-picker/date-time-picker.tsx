'use client'

import * as React from 'react'
import { CalendarIcon, Clock } from 'lucide-react'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { type MinuteStep, type HourFormat, snapToStep, snapTimeForward, defaultNow } from './utils'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

import { Calendar } from './calendar'

type DateTimePickerProps = Omit<
  React.ComponentProps<typeof Calendar>,
  'mode' | 'selected' | 'onSelect' | 'disabled'
> & {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  dateFormat?: string
  minuteStep?: MinuteStep
  hourFormat?: HourFormat
  triggerProps?: Omit<React.ComponentProps<typeof Button>, 'children'>
  align?: React.ComponentProps<typeof PopoverContent>['align']
  disablePast?: boolean
  minDate?: Date
  maxDate?: Date
  minTime?: Date
}

function DateTimePicker({
  selected,
  onSelect,
  open: controlledOpen,
  onOpenChange: onOpenChangeProp,
  placeholder = 'Pick date & time',
  dateFormat,
  minuteStep = 5,
  hourFormat = 24,
  triggerProps,
  align = 'start',
  disablePast = false,
  minDate,
  maxDate,
  minTime,
  ...calendarProps
}: DateTimePickerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const [internalDate, setInternalDate] = React.useState<Date | undefined>(selected)
  const slotRefs = React.useRef<Record<number, HTMLButtonElement | null>>({})
  const calendarRef = React.useRef<HTMLDivElement>(null)
  const [calendarHeight, setCalendarHeight] = React.useState<number>(0)

  React.useLayoutEffect(() => {
    if (!open) return
    const el = calendarRef.current
    if (!el) return
    setCalendarHeight(el.offsetHeight)
    const ro = new ResizeObserver(() => setCalendarHeight(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [open])

  React.useEffect(() => {
    setInternalDate(selected)
  }, [selected])

  function handleOpenChange(next: boolean) {
    if (!isControlled) setInternalOpen(next)
    onOpenChangeProp?.(next)
  }

  const effectiveMinTime = React.useMemo(() => {
    const candidates: Date[] = []
    if (disablePast) candidates.push(new Date())
    if (minTime) candidates.push(minTime)
    if (!candidates.length) return null
    return candidates.reduce((a, b) => (a > b ? a : b))
  }, [disablePast, minTime, open])

  const isMinTimeDay = React.useMemo(() => {
    if (!effectiveMinTime) return false
    const reference = internalDate ?? new Date()
    const a = new Date(effectiveMinTime)
    a.setHours(0, 0, 0, 0)
    const b = new Date(reference)
    b.setHours(0, 0, 0, 0)
    return a.getTime() === b.getTime()
  }, [effectiveMinTime, internalDate])

  function commit(next: Date | undefined) {
    setInternalDate(next)
    onSelect?.(next)
  }

  function handleDaySelect(day: Date | undefined) {
    if (!day) return
    const base = internalDate ?? new Date()
    const merged = new Date(day)
    merged.setHours(base.getHours())
    merged.setMinutes(snapToStep(base.getMinutes(), minuteStep))
    merged.setSeconds(0)
    merged.setMilliseconds(0)
    if (effectiveMinTime) {
      const minDay = new Date(effectiveMinTime)
      minDay.setHours(0, 0, 0, 0)
      const selDay = new Date(merged)
      selDay.setHours(0, 0, 0, 0)
      if (selDay.getTime() === minDay.getTime() && merged < effectiveMinTime) {
        const { hours, minutes } = snapTimeForward(
          effectiveMinTime.getHours(),
          effectiveMinTime.getMinutes(),
          minuteStep,
        )
        merged.setHours(hours)
        merged.setMinutes(minutes)
        merged.setSeconds(0)
      }
    }
    commit(merged)
  }

  const timeSlots = React.useMemo(() => {
    const total = Math.floor((24 * 60) / minuteStep)
    return Array.from({ length: total }, (_, i) => {
      const totalMinutes = i * minuteStep
      return { hour: Math.floor(totalMinutes / 60), minute: totalMinutes % 60 }
    })
  }, [minuteStep])

  function formatSlot(hour: number, minute: number): string {
    const mm = String(minute).padStart(2, '0')
    if (hourFormat === 24) return `${String(hour).padStart(2, '0')}:${mm}`
    const h12 = hour % 12 === 0 ? 12 : hour % 12
    return `${String(h12).padStart(2, '0')}:${mm} ${hour < 12 ? 'AM' : 'PM'}`
  }

  function isSlotDisabled(hour: number, minute: number): boolean {
    if (!effectiveMinTime || !isMinTimeDay) return false
    return hour * 60 + minute < effectiveMinTime.getHours() * 60 + effectiveMinTime.getMinutes()
  }

  const selectedSlotKey =
    internalDate !== undefined ? internalDate.getHours() * 60 + internalDate.getMinutes() : -1

  React.useEffect(() => {
    if (selectedSlotKey >= 0) {
      slotRefs.current[selectedSlotKey]?.scrollIntoView({ block: 'center' })
    }
  }, [selectedSlotKey, open])

  function selectSlot(hour: number, minute: number) {
    if (effectiveMinTime && isMinTimeDay) {
      if (hour * 60 + minute < effectiveMinTime.getHours() * 60 + effectiveMinTime.getMinutes())
        return
    }
    const base = internalDate ?? defaultNow(minuteStep)
    const next = new Date(base)
    next.setHours(hour)
    next.setMinutes(minute)
    next.setSeconds(0)
    next.setMilliseconds(0)
    commit(next)
  }

  function setNow() {
    const n = new Date()
    n.setMinutes(snapToStep(n.getMinutes(), minuteStep))
    n.setSeconds(0)
    n.setMilliseconds(0)
    if (effectiveMinTime && n < effectiveMinTime) {
      const { hours, minutes } = snapTimeForward(
        effectiveMinTime.getHours(),
        effectiveMinTime.getMinutes(),
        minuteStep,
      )
      n.setFullYear(
        effectiveMinTime.getFullYear(),
        effectiveMinTime.getMonth(),
        effectiveMinTime.getDate(),
      )
      n.setHours(hours)
      n.setMinutes(minutes)
      n.setSeconds(0)
    }
    commit(n)
  }

  const calendarDisabled = React.useMemo(() => {
    return (date: Date) => {
      const d = new Date(date)
      d.setHours(0, 0, 0, 0)
      if (disablePast) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (d < today) return true
      }
      if (minTime) {
        const mt = new Date(minTime)
        mt.setHours(0, 0, 0, 0)
        if (d < mt) return true
      }
      if (minDate) {
        const m = new Date(minDate)
        m.setHours(0, 0, 0, 0)
        if (d < m) return true
      }
      if (maxDate) {
        const m = new Date(maxDate)
        m.setHours(23, 59, 59, 999)
        if (date > m) return true
      }
      return false
    }
  }, [disablePast, minTime, minDate, maxDate])

  const fmt = dateFormat ?? (hourFormat === 24 ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy hh:mm a')
  const { className: triggerClassName, ...restTriggerProps } = triggerProps ?? {}

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            {...restTriggerProps}
            className={cn(
              'w-full pl-3 text-left font-normal shadow-xs',
              !internalDate && 'text-muted-foreground',
              triggerClassName,
            )}
          >
            {internalDate ? format(internalDate, fmt) : <span>{placeholder}</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        }
      />

      <PopoverContent className="w-auto p-0 overflow-hidden" align={align} sideOffset={8}>
        <div className="flex flex-col">
          <div className="flex">
            <div ref={calendarRef}>
              <Calendar
                {...({
                  autoFocus: true,
                  mode: 'single',
                  selected: internalDate,
                  onSelect: handleDaySelect,
                  disabled: calendarDisabled,
                  ...calendarProps,
                } as React.ComponentProps<typeof Calendar>)}
              />
            </div>

            <div
              className="flex w-20 flex-col border-l overflow-hidden"
              style={calendarHeight ? { height: calendarHeight } : undefined}
            >
              <div className="flex items-center gap-1.5 px-2 pt-3 pb-2 text-xs font-medium">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Time</span>
              </div>

              <ScrollArea className="flex-1 min-h-0 max-h-64 pb-2">
                <div className="flex flex-col gap-0.5 px-1">
                  {timeSlots.map(({ hour, minute }) => {
                    const key = hour * 60 + minute
                    const active = key === selectedSlotKey
                    const disabled = isSlotDisabled(hour, minute)
                    return (
                      <button
                        key={key}
                        ref={el => {
                          slotRefs.current[key] = el
                        }}
                        type="button"
                        disabled={disabled}
                        onClick={() => selectSlot(hour, minute)}
                        className={cn(
                          'h-7 w-full rounded-md px-1.5 text-center text-xs font-medium tabular-nums transition-colors',
                          'hover:bg-accent hover:text-accent-foreground',
                          active &&
                            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-xs',
                          disabled && 'pointer-events-none opacity-30',
                        )}
                      >
                        {formatSlot(hour, minute)}
                      </button>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="flex items-center gap-1 p-2 border-t">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={setNow}
              className="h-7 px-2 text-xs"
            >
              Now
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => commit(undefined)}
              className="h-7 px-2 text-xs ml-auto"
            >
              Clear
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={!internalDate}
              onClick={() => handleOpenChange(false)}
              className="h-7 px-2 text-xs"
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { DateTimePicker }
export type { DateTimePickerProps }
