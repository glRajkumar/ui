"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react"

import { cn, extractText, filteredOptions, findOptionByValue, getLabel, getValue, isGroup, isOption, isSeparator } from "@/lib/utils"
import { useElementWidth } from "@/hooks/use-element"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type ItemProps = {
  option: allowedPrimitiveT | optionT
  selected: boolean
  className?: string
  indicatorAt?: indicatorAt
  onSelect: (value: allowedPrimitiveT) => void
}

function Item({ option, selected, indicatorAt = "right", onSelect, className }: ItemProps) {
  const value = getValue(option)
  const label = getLabel(option)
  const optCls = isOption(option) ? option.className : undefined

  if (isSeparator(value)) return <CommandSeparator className={cn("my-0.5", className, "mx-0")} />

  return (
    <CommandItem
      value={`${value}`}
      className={cn(indicatorAt === "right" ? "pr-8 pl-2" : "pr-2 pl-8", className, optCls)}
      onSelect={() => onSelect(value)}
    >
      {typeof label === "object" ? label : `${label}`}

      <Check
        className={cn(
          "absolute size-4",
          selected ? "opacity-100" : "opacity-0",
          indicatorAt === "right" ? "right-2" : "left-2",
        )}
      />
    </CommandItem>
  )
}

type base = {
  id?: string
  options: optionsT
  isLoading?: boolean
  placeholder?: string
  emptyMessage?: string

  indicatorAt?: indicatorAt
  triggerCls?: string
  contentCls?: string
  groupCls?: string
  itemCls?: string

  open?: boolean
  onOpenChange?: (v: boolean) => void
  query?: string
  onQueryChange?: (v: string) => void
}

type comboboxProps = base & {
  value?: allowedPrimitiveT
  canCreateNew?: boolean
  onValueChange?: (value: allowedPrimitiveT) => void
}

function Combobox({
  id,
  options = [],
  isLoading = false,
  placeholder = "",
  emptyMessage = "",
  canCreateNew = false,

  indicatorAt,
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
}: comboboxProps) {
  const { ref, width } = useElementWidth<HTMLButtonElement>()

  const [i_value, setIValue] = useState("")
  const [i_query, setIQuery] = useState("")
  const [i_open, setIOpen] = useState(false)

  const value = o_value ?? i_value
  const query = o_query ?? i_query
  const open = o_open ?? i_open

  const onValueChange = o_onValueChange ?? setIValue
  const onQueryChange = o_onQueryChange ?? setIQuery
  const onOpenChange = o_onOpenChange ?? setIOpen

  const selectedOption = findOptionByValue(options, value)
  const filtered = filteredOptions(options, query)
  const label = getLabel(selectedOption)

  const showCreate =
    canCreateNew &&
    query &&
    !options.some((o) =>
      isGroup(o)
        ? o.options.some((x) => extractText(getLabel(x)) === query)
        : extractText(getLabel(o)) === query
    )

  function onSelect(v: allowedPrimitiveT) {
    onValueChange(v as string)
    onOpenChange(false)
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          ref={ref}
          role="combobox"
          variant="outline"
          className={cn("font-normal", triggerCls, {
            "text-muted-foreground": !value && value !== false,
          })}
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Loading...
            </>
          ) :
            <span className="flex items-center gap-2 truncate">
              {
                (selectedOption || selectedOption === false)
                  ? typeof label === "object" ? label : `${label}`
                  : placeholder
              }
            </span>
          }

          <ChevronsUpDown className="ml-auto size-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn("p-0", contentCls)} style={{ width: width ? `${width}px` : "auto" }}>
        <Command shouldFilter={false}>
          {
            !isLoading &&
            <CommandInput
              placeholder="Search..."
              value={query}
              onValueChange={onQueryChange}
            />
          }

          <CommandList className="py-1">
            {
              isLoading &&
              <CommandLoading>
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin size-4" /> Loading...
                </span>
              </CommandLoading>
            }

            {
              !isLoading &&
              <CommandEmpty>{emptyMessage || "No options found"}</CommandEmpty>
            }

            {!isLoading && filtered.map((item, i) => {
              if (isGroup(item)) {
                return (
                  <CommandGroup
                    key={item.group}
                    heading={item.group}
                    className={cn("[&_[cmdk-group-heading]]:pb-0.5", groupCls, item.className)}
                  >
                    {item.options.map((opt, j) => (
                      <Item
                        key={`g-${i}-${j}`}
                        option={opt}
                        selected={getValue(opt) === value}
                        onSelect={onSelect}
                        className={itemCls}
                        indicatorAt={indicatorAt}
                      />
                    ))}
                  </CommandGroup>
                )
              }

              return (
                <Item
                  key={`i-${i}`}
                  option={item}
                  selected={getValue(item) === value}
                  onSelect={onSelect}
                  indicatorAt={indicatorAt}
                  className={cn("mx-1", itemCls)}
                />
              )
            })}

            {showCreate && (
              <CommandGroup>
                <CommandItem
                  value={`__create-${query}`}
                  onSelect={() => {
                    onValueChange(query)
                    onQueryChange("")
                    onOpenChange(false)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Create: {query}
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

type btnLableProps = {
  value: allowedPrimitiveT[]
  options: optionsT
  isLoading?: boolean
  placeholder?: string
  maxVisibleCount?: number
}
function ButtonLabel({
  value,
  options,
  isLoading,
  placeholder,
  maxVisibleCount = 2,
}: btnLableProps) {
  const labelOf = (val: allowedPrimitiveT) => {
    const found = findOptionByValue(options, val)
    if (!found) return `${val}`
    const label = getLabel(found)
    return typeof label === "object" ? label : `${label}`
  }

  if (isLoading)
    return (
      <>
        <Loader2 className="size-4 animate-spin" />
        Loading...
      </>
    )

  if (value.length === 0) {
    return placeholder
  }

  if (value.length <= maxVisibleCount) {
    return (
      <>
        {value.map((v) => (
          <Badge key={String(v)} variant="secondary" className="rounded-sm px-1 font-normal">
            {labelOf(v)}
          </Badge>
        ))}
      </>
    )
  }

  return (
    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
      {value.length} selected
    </Badge>
  )
}

type multiSelectComboboxProps = base & {
  value?: allowedPrimitiveT[]
  maxVisibleCount?: number
  label?: React.ReactNode
  onValueChange?: (v: allowedPrimitiveT[]) => void
}

function MultiSelectCombobox({
  id,
  options = [],
  isLoading = false,
  placeholder = "",
  emptyMessage = "",

  maxVisibleCount,
  indicatorAt,
  triggerCls,
  contentCls,
  groupCls,
  itemCls,
  label,

  value: o_value,
  onValueChange: o_onValueChange,

  query: o_query,
  onQueryChange: o_onQueryChange,

  open: o_open,
  onOpenChange: o_onOpenChange,
}: multiSelectComboboxProps) {
  const { ref, width } = useElementWidth<HTMLButtonElement>()

  const [i_value, setIValue] = useState<allowedPrimitiveT[]>([])
  const [i_query, setIQuery] = useState("")
  const [i_open, setIOpen] = useState(false)

  const value = o_value ?? i_value
  const query = o_query ?? i_query
  const open = o_open ?? i_open

  const onValueChange = o_onValueChange ?? setIValue
  const onQueryChange = o_onQueryChange ?? setIQuery
  const onOpenChange = o_onOpenChange ?? setIOpen

  const filtered = filteredOptions(options, query)

  const onSelect = (v: allowedPrimitiveT) => {
    onValueChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          ref={ref}
          role="combobox"
          variant="outline"
          aria-expanded={open}
          className={cn("font-normal", triggerCls, {
            "text-muted-foreground": value.length === 0,
          })}
        >
          {label}

          <ButtonLabel
            value={value}
            options={options}
            isLoading={isLoading}
            placeholder={placeholder}
            maxVisibleCount={maxVisibleCount}
          />

          <ChevronsUpDown className="ml-auto size-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn("p-0", contentCls)} style={{ width: width ? `${width}px` : "auto" }}>
        <Command shouldFilter={false}>
          {
            !isLoading &&
            <CommandInput
              placeholder="Search..."
              value={query}
              onValueChange={onQueryChange}
            />
          }

          <CommandList className="py-1">
            {
              isLoading &&
              <CommandLoading>
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin size-4" /> Loading...
                </span>
              </CommandLoading>
            }

            {
              !isLoading &&
              <CommandEmpty>{emptyMessage || "No options found"}</CommandEmpty>
            }

            {!isLoading && filtered.map((item, i) => {
              if (isGroup(item)) {
                return (
                  <CommandGroup
                    key={item.group}
                    heading={item.group}
                    className={cn("[&_[cmdk-group-heading]]:pb-0.5", groupCls, item.className)}
                  >
                    {item.options.map((opt, j) => (
                      <Item
                        key={`g-${i}-${j}`}
                        option={opt}
                        selected={value.includes(getValue(opt))}
                        onSelect={onSelect}
                        indicatorAt={indicatorAt}
                        className={itemCls}
                      />
                    ))}
                  </CommandGroup>
                )
              }

              return (
                <Item
                  key={`i-${i}`}
                  option={item}
                  selected={value.includes(getValue(item))}
                  onSelect={onSelect}
                  indicatorAt={indicatorAt}
                  className={cn("mx-1 mb-1", itemCls)}
                />
              )
            })}

            {value.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={() => onValueChange([])} value="__clear__" className="justify-center">
                    Clear selection(s)
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export {
  Combobox,
  MultiSelectCombobox,
}