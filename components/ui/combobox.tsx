"use client"

import * as React from "react"
import { ChevronDownIcon, XIcon, CheckIcon, Loader2, Plus } from "lucide-react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn, getKey, getLabel, getValue, isGroup, isOption, isSeparator } from "@/lib/utils"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"

const Combobox = ComboboxPrimitive.Root

function ComboboxValue(props: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn("group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className)}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function ComboboxCollection(props: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function ComboboxChips({ className, ...props }: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-8 flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent bg-clip-padding px-2.5 py-1 text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 outline-none", className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

type ItemProps = {
  option: allowedPrimitiveT | optionT
  className?: string
}

function Item({ option, className }: ItemProps) {
  const value = getValue(option)
  const label = getLabel(option)
  const optCls = isOption(option) ? option.className : undefined

  return (
    <ComboboxItem value={value} className={cn(className, optCls)}>
      {label}
    </ComboboxItem>
  )
}

type ListBodyProps = {
  options: optionsT
  itemCls?: string
  groupCls?: string
  isLoading?: boolean
  emptyMessage?: string
}

function ListBody({ options, itemCls, groupCls, isLoading, emptyMessage }: ListBodyProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Loading...
      </div>
    )
  }

  const hasMixedGroups = options.some(isGroup)

  return (
    <>
      <ComboboxEmpty>{emptyMessage ?? "No options found"}</ComboboxEmpty>

      <ComboboxList>
        {!hasMixedGroups && (
          <ComboboxCollection>
            {(item: allowedPrimitiveT | optionT) => {
              const v = getValue(item)
              if (isSeparator(v)) {
                return <ComboboxSeparator key={`sep-${String(v)}`} />
              }
              return (
                <Item key={getKey(item, 0)} option={item} className={itemCls} />
              )
            }}
          </ComboboxCollection>
        )}

        {hasMixedGroups &&
          options.map((item, i) => {
            if (isGroup(item)) {
              return (
                <ComboboxGroup
                  key={item.group}
                  items={item.options as (allowedPrimitiveT | optionT)[]}
                  className={cn(groupCls, item.className)}
                >
                  <ComboboxLabel>{item.group}</ComboboxLabel>
                  <ComboboxCollection>
                    {(opt: allowedPrimitiveT | optionT) => (
                      <Item
                        key={getKey(opt, 0)}
                        option={opt}
                        className={itemCls}
                      />
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
              )
            }

            if (isSeparator(item)) {
              return <ComboboxSeparator key={`sep-${i}`} />
            }

            return (
              <Item key={getKey(item, i)} option={item} className={itemCls} />
            )
          })}
      </ComboboxList>
    </>
  )
}

type BaseProps = {
  id?: string
  options?: optionsT
  isLoading?: boolean
  placeholder?: string
  emptyMessage?: string

  triggerCls?: string
  contentCls?: string
  groupCls?: string
  itemCls?: string
  matchTriggerWidth?: boolean

  open?: boolean
  onOpenChange?: (v: boolean) => void
  query?: string
  onQueryChange?: (v: string) => void

  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
}

type ComboboxWrapperProps = BaseProps & {
  value?: allowedPrimitiveT | null
  canCreateNew?: boolean
  onValueChange?: (value: allowedPrimitiveT | null) => void
}

type MultiSelectComboboxProps = BaseProps & {
  value?: allowedPrimitiveT[]
  onValueChange?: (v: allowedPrimitiveT[]) => void
}

function ComboboxWrapper({
  id,
  options = [],
  isLoading,
  placeholder,
  emptyMessage,
  canCreateNew,

  matchTriggerWidth = true,
  triggerCls,
  contentCls,
  groupCls,
  itemCls,

  value: o_value,
  onValueChange,

  query: o_query,
  onQueryChange: o_onQueryChange,

  open: o_open,
  onOpenChange: o_onOpenChange,

  disabled,
  readOnly,
  required,
  name,
}: ComboboxWrapperProps) {
  const [i_value, setIValue] = React.useState<allowedPrimitiveT | null>(null)
  const [i_query, setIQuery] = React.useState("")
  const [i_open, setIOpen] = React.useState(false)

  const value = o_value !== undefined ? o_value : i_value
  const query = o_query ?? i_query
  const open = o_open ?? i_open

  const onQueryChange = o_onQueryChange ?? setIQuery
  const onOpenChange = o_onOpenChange ?? setIOpen

  const flatItems = options.filter(
    (o): o is allowedPrimitiveT | optionT => !isGroup(o) && !isSeparator(o),
  )

  const showCreate =
    canCreateNew &&
    query.trim() &&
    !options.some((o) =>
      isGroup(o)
        ? o.options.some((x) => String(getLabel(x)).toLowerCase() === query.toLowerCase())
        : !isSeparator(o) && String(getLabel(o)).toLowerCase() === query.toLowerCase(),
    )

  return (
    <Combobox
      id={id}
      name={name}
      items={flatItems}
      value={`${value}`}
      onValueChange={(v) => (onValueChange ?? setIValue)(v as allowedPrimitiveT | null)}
      inputValue={query}
      onInputValueChange={onQueryChange}
      open={open}
      onOpenChange={onOpenChange}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      filter={(item, q) =>
        String(getLabel(item as allowedPrimitiveT | optionT))
          .toLowerCase()
          .includes(q.toLowerCase())
      }
    >
      <ComboboxInput
        id={id}
        placeholder={placeholder}
        disabled={disabled ?? isLoading}
        showTrigger
        showClear
        className={cn(matchTriggerWidth && "w-full", triggerCls)}
      />

      <ComboboxContent className={contentCls}>
        <ListBody
          options={options}
          groupCls={groupCls}
          itemCls={itemCls}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
        />

        {showCreate && (
          <ComboboxList>
            <ComboboxSeparator />
            <ComboboxItem
              value={query}
              className="gap-2"
              onClick={() => {
                onQueryChange("")
                onOpenChange(false)
              }}
            >
              <Plus className="size-4" />
              Create: {query}
            </ComboboxItem>
          </ComboboxList>
        )}
      </ComboboxContent>
    </Combobox>
  )
}

function MultiSelectCombobox({
  id,
  options = [],
  isLoading,
  placeholder,
  emptyMessage,

  matchTriggerWidth = true,
  triggerCls,
  contentCls,
  groupCls,
  itemCls,

  value: o_value,
  onValueChange: o_onValueChange,

  query: o_query,
  onQueryChange: o_onQueryChange,

  open: o_open,
  onOpenChange: o_onOpenChange,

  disabled,
  readOnly,
  required,
  name,
}: MultiSelectComboboxProps) {
  const [i_value, setIValue] = React.useState<allowedPrimitiveT[]>([])
  const [i_query, setIQuery] = React.useState("")
  const [i_open, setIOpen] = React.useState(false)

  const value = o_value ?? i_value
  const query = o_query ?? i_query
  const open = o_open ?? i_open

  const onValueChange = o_onValueChange ?? setIValue
  const onQueryChange = o_onQueryChange ?? setIQuery
  const onOpenChange = o_onOpenChange ?? setIOpen

  const anchor = useComboboxAnchor()

  const flatItems = options.filter(
    (o): o is allowedPrimitiveT | optionT => !isGroup(o) && !isSeparator(o),
  )

  const labelOf = (val: allowedPrimitiveT): string => {
    for (const item of options) {
      if (isGroup(item)) {
        const found = item.options.find((o) => getValue(o) === val)
        if (found) return String(getLabel(found))
      } else if (!isSeparator(item) && getValue(item) === val) {
        return String(getLabel(item))
      }
    }
    return String(val)
  }

  return (
    <Combobox
      id={id}
      name={name}
      multiple
      items={flatItems}
      value={value}
      onValueChange={(v) => onValueChange(v as allowedPrimitiveT[])}
      inputValue={query}
      onInputValueChange={onQueryChange}
      open={open}
      onOpenChange={onOpenChange}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      filter={(item, q) =>
        String(getLabel(item as allowedPrimitiveT | optionT))
          .toLowerCase()
          .includes(q.toLowerCase())
      }
    >
      <ComboboxChips
        ref={anchor}
        className={cn(matchTriggerWidth && "w-full", triggerCls)}
      >
        {value.map((v) => (
          <ComboboxChip key={String(v)}>
            {labelOf(v)}
          </ComboboxChip>
        ))}

        {isLoading ? (
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading...
          </span>
        ) : (
          <ComboboxChipsInput placeholder={value.length === 0 ? placeholder : undefined} />
        )}
      </ComboboxChips>

      <ComboboxContent anchor={anchor} className={contentCls}>
        <ListBody
          options={options}
          groupCls={groupCls}
          itemCls={itemCls}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
        />

        {value.length > 0 && !isLoading && (
          <ComboboxList>
            <ComboboxSeparator />
            <ComboboxItem
              value="__clear__"
              className="justify-center text-muted-foreground"
              onClick={() => onValueChange([])}
            >
              Clear selection(s)
            </ComboboxItem>
          </ComboboxList>
        )}
      </ComboboxContent>
    </Combobox>
  )
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
  ComboboxWrapper,
  MultiSelectCombobox,
  type ComboboxWrapperProps,
  type MultiSelectComboboxProps,
}
