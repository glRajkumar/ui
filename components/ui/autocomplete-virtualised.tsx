'use client'

import * as React from 'react'
import { useVirtualizer, type VirtualizerOptions } from '@tanstack/react-virtual'
import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete'
import { Loader2 } from 'lucide-react'

import { cn, extractText, getLabel, getValue, isGroup, isOption } from '@/lib/utils'
import {
  AutocompleteRoot,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteItem,
  AutocompleteEmpty,
  AutocompleteStatus,
} from '@/components/ui/autocomplete'

type AutocompleteVirtualListProps = {
  itemCls?: string
  maxHeight: number
  estimateSize: number
  virtualizerOptions?: Partial<
    Omit<VirtualizerOptions<HTMLDivElement, Element>, 'count' | 'getScrollElement'>
  >
}

function AutocompleteVirtualList({
  itemCls,
  maxHeight,
  estimateSize,
  virtualizerOptions,
}: AutocompleteVirtualListProps) {
  const items = (AutocompletePrimitive.useFilteredItems() ?? []) as (allowedPrimitiveT | itemT)[]
  const parentRef = React.useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 5,
    ...virtualizerOptions,
  })

  return (
    <AutocompletePrimitive.List data-slot="autocomplete-list">
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
              <AutocompleteItem
                key={String(value)}
                value={value}
                ref={virtualizer.measureElement}
                data-index={virtualRow.index}
                disabled={disabled}
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
              </AutocompleteItem>
            )
          })}
        </div>
      </div>
    </AutocompletePrimitive.List>
  )
}

type AutocompleteVirtualisedWrapperProps = Omit<
  AutocompletePrimitive.Root.Props<unknown>,
  'items' | 'itemToStringValue'
> & {
  items?: itemsT
  className?: string
  placeholder?: string
  isLoading?: boolean
  emptyMessage?: string
  showClear?: boolean
  showTrigger?: boolean
  contentCls?: string
  itemCls?: string
  inputProps?: Omit<React.ComponentProps<'input'>, 'value' | 'onChange'>
  renderStatus?: React.ReactNode
  renderEmpty?: React.ReactNode
  estimateSize?: number
  maxHeight?: number
  virtualizerOptions?: Partial<
    Omit<VirtualizerOptions<HTMLDivElement, Element>, 'count' | 'getScrollElement'>
  >
}

function AutocompleteVirtualisedWrapper({
  items,
  className,
  placeholder,
  isLoading,
  emptyMessage,
  showClear = false,
  showTrigger = true,
  contentCls,
  itemCls,
  inputProps,
  renderStatus,
  renderEmpty,
  estimateSize = 32,
  maxHeight = 300,
  virtualizerOptions,
  disabled,
  ...props
}: AutocompleteVirtualisedWrapperProps) {
  const itemsForBase = React.useMemo(() => {
    if (!items) return []
    return items.filter(item => !isGroup(item)) as (allowedPrimitiveT | itemT)[]
  }, [items])

  return (
    <AutocompleteRoot
      items={itemsForBase as unknown[]}
      disabled={disabled}
      virtualized
      itemToStringValue={(item: unknown) => {
        const opt = item as allowedPrimitiveT | itemT
        const label = getLabel(opt)
        if (typeof label === 'string') return label
        return extractText(label).trim() || String(getValue(opt))
      }}
      {...props}
    >
      <AutocompleteInput
        disabled={disabled}
        showClear={showClear}
        showTrigger={showTrigger}
        placeholder={placeholder}
        className={className}
        {...(inputProps as AutocompletePrimitive.Input.Props)}
      />
      <AutocompleteContent className={contentCls}>
        <AutocompleteStatus>
          {renderStatus !== undefined
            ? renderStatus
            : isLoading && (
                <p className="flex items-center justify-center gap-2 py-6">
                  <Loader2 className="size-4 animate-spin" /> Loading...
                </p>
              )}
        </AutocompleteStatus>

        <AutocompleteEmpty>
          {renderEmpty !== undefined
            ? renderEmpty
            : !isLoading && <p className="py-6">{emptyMessage ?? 'No items found'}</p>}
        </AutocompleteEmpty>

        <AutocompleteVirtualList
          itemCls={itemCls}
          estimateSize={estimateSize}
          maxHeight={maxHeight}
          virtualizerOptions={virtualizerOptions}
        />
      </AutocompleteContent>
    </AutocompleteRoot>
  )
}

export { AutocompleteVirtualisedWrapper, type AutocompleteVirtualisedWrapperProps }
