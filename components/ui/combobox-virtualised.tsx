'use client'

import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { Combobox as ComboboxPrimitive } from '@base-ui/react'
import { useVirtualizer, type VirtualizerOptions } from '@tanstack/react-virtual'

import { cn, extractText, getLabel, getValue, isGroup, isOption, isSeparator } from '@/lib/utils'
import {
  ComboboxRoot,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxStatus,
} from '@/components/ui/combobox'

type ComboboxVirtualListProps = {
  itemCls?: string
  maxHeight: number
  estimateSize: number
  indicatorAt?: indicatorAtT
  virtualizerOptions?: Partial<
    Omit<VirtualizerOptions<HTMLDivElement, Element>, 'count' | 'getScrollElement'>
  >
}

function ComboboxVirtualList({
  itemCls,
  maxHeight,
  indicatorAt,
  estimateSize,
  virtualizerOptions,
}: ComboboxVirtualListProps) {
  const items = (ComboboxPrimitive.useFilteredItems() ?? []) as (allowedPrimitiveT | itemT)[]
  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 5,
    ...virtualizerOptions,
  })

  return (
    <ComboboxPrimitive.List data-slot="combobox-list" className="data-empty:hidden">
      <div ref={parentRef} className="overflow-y-auto overscroll-contain p-1" style={{ maxHeight }}>
        <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
          {virtualizer.getVirtualItems().map(virtualRow => {
            const item = items[virtualRow.index]
            if (!item) return null
            const value = getValue(item)
            const label = getLabel(item)
            const optCls = isOption(item) ? item.className : undefined
            const disabled = isOption(item) ? item.disabled : undefined
            return (
              <ComboboxItem
                key={String(value)}
                value={value}
                index={virtualRow.index}
                ref={virtualizer.measureElement}
                data-index={virtualRow.index}
                disabled={disabled}
                indicatorAt={indicatorAt}
                className={cn(itemCls, optCls)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {label}
              </ComboboxItem>
            )
          })}
        </div>
      </div>
    </ComboboxPrimitive.List>
  )
}

type ComboboxVirtualisedWrapperProps = Omit<
  ComboboxPrimitive.Root.Props<unknown, false>,
  'items' | 'multiple'
> & {
  items?: itemsT
  isLoading?: boolean
  placeholder?: string
  emptyMessage?: string
  triggerCls?: string
  contentCls?: string
  itemCls?: string
  indicatorAt?: indicatorAtT
  showTrigger?: boolean
  showClear?: boolean
  inputProps?: React.ComponentProps<'input'>
  renderStatus?: React.ReactNode
  renderEmpty?: React.ReactNode
  estimateSize?: number
  maxHeight?: number
  virtualizerOptions?: Partial<
    Omit<VirtualizerOptions<HTMLDivElement, Element>, 'count' | 'getScrollElement'>
  >
}

function ComboboxVirtualisedWrapper({
  items,
  isLoading,
  placeholder,
  emptyMessage,
  triggerCls,
  contentCls,
  itemCls,
  indicatorAt = 'right',
  showTrigger = true,
  showClear = false,
  disabled,
  inputProps,
  renderStatus,
  renderEmpty,
  estimateSize = 32,
  maxHeight = 300,
  virtualizerOptions,
  ...props
}: ComboboxVirtualisedWrapperProps) {
  const labelStringMap = React.useMemo(() => {
    const map: Record<string, string> = {}
    if (!items) return map
    for (const opt of items) {
      if (isGroup(opt)) continue
      const o = opt as allowedPrimitiveT | itemT
      const val = getValue(o)
      if (!isSeparator(val)) {
        const key = String(val)
        const label = getLabel(o)
        map[key] = typeof label === 'string' ? label : extractText(label).trim() || key
      }
    }
    return map
  }, [items])

  const itemsForBase = React.useMemo(() => {
    if (!items) return []
    return items.filter(
      item => !isGroup(item) && !isSeparator(getValue(item as allowedPrimitiveT | itemT)),
    ) as (allowedPrimitiveT | itemT)[]
  }, [items])

  return (
    <ComboboxRoot
      disabled={disabled}
      items={itemsForBase as unknown[]}
      virtualized
      itemToStringLabel={item => {
        const key = String(getValue(item as allowedPrimitiveT | itemT))
        return labelStringMap[key] ?? key
      }}
      {...props}
    >
      <ComboboxInput
        disabled={disabled}
        showClear={showClear}
        showTrigger={showTrigger}
        placeholder={placeholder}
        className={cn('w-full', triggerCls)}
        {...inputProps}
      />

      <ComboboxContent className={contentCls}>
        <ComboboxStatus>
          {renderStatus !== undefined
            ? renderStatus
            : isLoading && (
              <p className="flex items-center justify-center gap-2 py-6">
                <Loader2 className="size-4 animate-spin" /> Loading...
              </p>
            )}
        </ComboboxStatus>

        <ComboboxEmpty>
          {renderEmpty !== undefined
            ? renderEmpty
            : !isLoading && <p className="py-6">{emptyMessage ?? 'No items found'}</p>}
        </ComboboxEmpty>

        <ComboboxVirtualList
          itemCls={itemCls}
          indicatorAt={indicatorAt}
          estimateSize={estimateSize}
          maxHeight={maxHeight}
          virtualizerOptions={virtualizerOptions}
        />
      </ComboboxContent>
    </ComboboxRoot>
  )
}

export { ComboboxVirtualisedWrapper, type ComboboxVirtualisedWrapperProps }
