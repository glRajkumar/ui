'use client'

import * as React from 'react'
import { ChevronDownIcon, XIcon, Loader2 } from 'lucide-react'
import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete'

import { useVirtualizer, type VirtualizerOptions } from '@tanstack/react-virtual'

import { cn, extractText, getKey, getLabel, getValue, isGroup, isOption, isSeparator } from '@/lib/utils'

const AutocompleteRoot = AutocompletePrimitive.Root

function AutocompleteTrigger({ className, children, ...props }: AutocompletePrimitive.Trigger.Props) {
  return (
    <AutocompletePrimitive.Trigger
      data-slot="autocomplete-trigger"
      className={cn(
        'flex size-7 shrink-0 items-center justify-center rounded-sm text-muted-foreground',
        'transition-colors hover:bg-accent hover:text-foreground',
        '[&_svg]:pointer-events-none',
        className,
      )}
      {...props}
    >
      {children ?? <ChevronDownIcon className="size-4" />}
    </AutocompletePrimitive.Trigger>
  )
}

function AutocompleteClear({ className, ...props }: AutocompletePrimitive.Clear.Props) {
  return (
    <AutocompletePrimitive.Clear
      data-slot="autocomplete-clear"
      className={cn(
        'flex size-7 shrink-0 items-center justify-center rounded-sm text-muted-foreground',
        'transition-colors hover:bg-accent hover:text-foreground',
        '[&_svg]:pointer-events-none',
        className,
      )}
      {...props}
    >
      <XIcon className="size-3.5" />
    </AutocompletePrimitive.Clear>
  )
}

function AutocompleteInput({
  className,
  showClear = false,
  showTrigger = false,
  disabled,
  ...props
}: AutocompletePrimitive.Input.Props & {
  showClear?: boolean
  showTrigger?: boolean
  disabled?: boolean
}) {
  return (
    <AutocompletePrimitive.InputGroup
      data-slot="autocomplete-input-group"
      className={cn(
        'relative flex h-9 w-full items-center gap-0.5 rounded-md border border-input bg-transparent pl-3 pr-1 text-sm shadow-xs',
        'transition-colors',
        'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
        'has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20',
        'dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40',
        className,
      )}
    >
      <AutocompletePrimitive.Input
        disabled={disabled}
        className={cn(
          'h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        )}
        {...props}
      />
      {(showClear || showTrigger) && (
        <div className="ml-auto flex shrink-0 items-center">
          {showClear && <AutocompleteClear disabled={disabled} />}
          {showTrigger && <AutocompleteTrigger disabled={disabled} />}
        </div>
      )}
    </AutocompletePrimitive.InputGroup>
  )
}

function AutocompleteContent({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  ...props
}: AutocompletePrimitive.Popup.Props &
  Pick<AutocompletePrimitive.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset'>) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <AutocompletePrimitive.Popup
          data-slot="autocomplete-content"
          className={cn(
            'group/autocomplete-content relative overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
            'max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin)',
            'min-w-[max(var(--anchor-width),10rem)]',
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
            'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
            'data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2',
            className,
          )}
          {...props}
        />
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  )
}

function AutocompleteList({ className, ...props }: AutocompletePrimitive.List.Props) {
  return (
    <AutocompletePrimitive.List
      data-slot="autocomplete-list"
      className={cn(
        'max-h-(--available-height) overflow-y-auto overscroll-contain scroll-py-1 p-1',
        className,
      )}
      {...props}
    />
  )
}

function AutocompleteItem({
  className,
  children,
  ...props
}: AutocompletePrimitive.Item.Props) {
  return (
    <AutocompletePrimitive.Item
      data-slot="autocomplete-item"
      className={cn(
        'relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
        'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
    </AutocompletePrimitive.Item>
  )
}

function AutocompleteGroup({ className, ...props }: AutocompletePrimitive.Group.Props) {
  return (
    <AutocompletePrimitive.Group
      data-slot="autocomplete-group"
      className={cn('pb-1', className)}
      {...props}
    />
  )
}

function AutocompleteLabel({ className, ...props }: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="autocomplete-label"
      className={cn('px-2 py-1.5 text-xs font-medium text-muted-foreground', className)}
      {...props}
    />
  )
}

function AutocompleteCollection(props: AutocompletePrimitive.Collection.Props) {
  return <AutocompletePrimitive.Collection data-slot="autocomplete-collection" {...props} />
}

function AutocompleteEmpty({ className, ...props }: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="autocomplete-empty"
      className={cn('text-center text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function AutocompleteSeparator({ className, ...props }: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      data-slot="autocomplete-separator"
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

function AutocompleteStatus({ className, ...props }: AutocompletePrimitive.Status.Props) {
  return (
    <AutocompletePrimitive.Status
      data-slot="autocomplete-status"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

type OptionItemProps = {
  option: allowedPrimitiveT | optionT
  className?: string
}

function OptionItem({ option, className }: OptionItemProps) {
  const value = getValue(option)
  const label = getLabel(option)
  const optCls = isOption(option) ? option.className : undefined
  const disabled = isOption(option) ? option.disabled : undefined

  return (
    <AutocompleteItem value={value} className={cn(className, optCls)} disabled={disabled}>
      {label}
    </AutocompleteItem>
  )
}

type OptionsBodyProps = {
  item: optionsT[number]
  index: number
  itemCls?: string
  groupCls?: string
}

function OptionsBody({ item, index, itemCls, groupCls }: OptionsBodyProps) {
  if (isGroup(item)) {
    return (
      <AutocompleteGroup
        items={item.options as (allowedPrimitiveT | optionT)[]}
        className={cn(groupCls, item.className)}
      >
        <AutocompleteLabel>{item.group}</AutocompleteLabel>
        <AutocompleteCollection>
          {(opt: allowedPrimitiveT | optionT, i) => (
            <OptionItem
              key={getKey(opt, i)}
              option={opt}
              className={itemCls}
            />
          )}
        </AutocompleteCollection>
      </AutocompleteGroup>
    )
  }

  if (isSeparator(item)) {
    return <AutocompleteSeparator key={`sep-${index}`} />
  }

  return (
    <OptionItem
      key={getKey(item as allowedPrimitiveT | optionT, index)}
      option={item as allowedPrimitiveT | optionT}
      className={itemCls}
    />
  )
}

type AutocompleteWrapperProps = Omit<
  AutocompletePrimitive.Root.Props<unknown>,
  'items' | 'itemToStringValue'
> & {
  items?: optionsT
  className?: string
  placeholder?: string
  isLoading?: boolean
  emptyMessage?: string
  showClear?: boolean
  showTrigger?: boolean
  contentCls?: string
  itemCls?: string
  groupCls?: string
  inputProps?: Omit<React.ComponentProps<'input'>, 'value' | 'onChange'>
  renderStatus?: React.ReactNode
  renderEmpty?: React.ReactNode
}

function AutocompleteWrapper({
  items,
  className,
  placeholder,
  isLoading,
  emptyMessage,
  showClear = false,
  showTrigger = true,
  contentCls,
  itemCls,
  groupCls,
  inputProps,
  renderStatus,
  renderEmpty,
  disabled,
  ...props
}: AutocompleteWrapperProps) {
  const itemsForBase = React.useMemo(() => {
    if (!items) return []
    return items.map(item => (isGroup(item) ? { ...item, items: item.options } : item))
  }, [items])

  return (
    <AutocompleteRoot
      items={itemsForBase as unknown[]}
      disabled={disabled}
      itemToStringValue={(item: unknown) => {
        const opt = item as allowedPrimitiveT | optionT
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
            : isLoading && <p className='flex items-center justify-center gap-2 py-6'><Loader2 className='size-4 animate-spin' /> Loading...</p>}
        </AutocompleteStatus>

        <AutocompleteEmpty>
          {renderEmpty !== undefined
            ? renderEmpty
            : !isLoading && <p className='py-6'>{emptyMessage ?? 'No options found'}</p>}
        </AutocompleteEmpty>

        <AutocompleteList>
          {(item: unknown, i: number) => (
            <OptionsBody
              key={
                isGroup(item as optionsT[number])
                  ? (item as groupT).group
                  : isSeparator(item as optionsT[number])
                    ? `sep-${i}`
                    : String(getValue(item as allowedPrimitiveT | optionT))
              }
              item={item as optionsT[number]}
              index={i}
              itemCls={itemCls}
              groupCls={groupCls}
            />
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </AutocompleteRoot>
  )
}

type AutocompleteVirtualListProps = {
  itemCls?: string
  estimateSize: number
  maxHeight: number
  virtualizerOptions?: Partial<Omit<VirtualizerOptions<HTMLDivElement, Element>, 'count' | 'getScrollElement'>>
}

function AutocompleteVirtualList({ itemCls, estimateSize, maxHeight, virtualizerOptions }: AutocompleteVirtualListProps) {
  const items = (AutocompletePrimitive.useFilteredItems() ?? []) as (allowedPrimitiveT | optionT)[]
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
  items?: optionsT
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
  virtualizerOptions?: Partial<Omit<VirtualizerOptions<HTMLDivElement, Element>, 'count' | 'getScrollElement'>>
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
    return items.filter(item => !isGroup(item)) as (allowedPrimitiveT | optionT)[]
  }, [items])

  return (
    <AutocompleteRoot
      items={itemsForBase as unknown[]}
      disabled={disabled}
      virtualized
      itemToStringValue={(item: unknown) => {
        const opt = item as allowedPrimitiveT | optionT
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
            : isLoading && <p className='flex items-center justify-center gap-2 py-6'><Loader2 className='size-4 animate-spin' /> Loading...</p>}
        </AutocompleteStatus>

        <AutocompleteEmpty>
          {renderEmpty !== undefined
            ? renderEmpty
            : !isLoading && <p className='py-6'>{emptyMessage ?? 'No options found'}</p>}
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

export {
  AutocompleteRoot,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteLabel,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteSeparator,
  AutocompleteTrigger,
  AutocompleteClear,
  AutocompleteStatus,
  AutocompleteWrapper,
  AutocompleteVirtualisedWrapper,
  type AutocompleteWrapperProps,
  type AutocompleteVirtualisedWrapperProps,
}
