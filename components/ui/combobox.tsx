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

  if (isSeparator(value)) return <CommandSeparator className={className} />

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
}

type comboboxProps = base & {
  value?: allowedPrimitiveT
  canCreateNew?: boolean
  onValueChange?: (value: allowedPrimitiveT) => void
}

function Combobox({
  id,
  value = "",
  options = [],
  placeholder = "",
  emptyMessage = "",
  isLoading = false,
  canCreateNew = false,
  indicatorAt,
  triggerCls, contentCls, groupCls, itemCls,
  onValueChange = () => { },
}: comboboxProps) {
  const { ref, width } = useElementWidth<HTMLButtonElement>()

  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          ref={ref}
          variant="outline"
          role="combobox"
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
          <CommandInput
            placeholder="Search..."
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>
            <CommandEmpty>{emptyMessage || "No options found"}</CommandEmpty>

            {filtered.map((item, i) => {
              if (isGroup(item)) {
                return (
                  <CommandGroup
                    key={item.group}
                    heading={item.group}
                    className={cn(groupCls, item.className)}
                  >
                    {item.options.map((opt, j) => (
                      <Item
                        key={`g-${i}-${j}`}
                        option={opt}
                        selected={getValue(opt) === value}
                        onSelect={(v) => {
                          onValueChange(v)
                          setOpen(false)
                        }}
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
                  selected={getValue(item) === value}
                  onSelect={(v) => {
                    onValueChange(v)
                    setOpen(false)
                  }}
                  indicatorAt={indicatorAt}
                  className={itemCls}
                />
              )
            })}

            {showCreate && (
              <CommandGroup>
                <CommandItem
                  value={`__create-${query}`}
                  onSelect={() => {
                    onValueChange(query)
                    setQuery("")
                    setOpen(false)
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
}
function ButtonLabel({
  value,
  options,
  isLoading,
  placeholder,
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

  if (value.length <= 2) {
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
  onValueChange?: (v: allowedPrimitiveT[]) => void
}

function MultiSelectCombobox({
  id,
  value = [],
  options = [],
  placeholder = "",
  emptyMessage = "",
  isLoading = false,
  indicatorAt,
  triggerCls, contentCls, groupCls, itemCls,
  onValueChange = () => { },
}: multiSelectComboboxProps) {
  const { ref, width } = useElementWidth<HTMLButtonElement>()

  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const filtered = filteredOptions(options, query)

  const toggle = (v: allowedPrimitiveT) => {
    onValueChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
          <ButtonLabel
            value={value}
            options={options}
            isLoading={isLoading}
            placeholder={placeholder}
          />

          <ChevronsUpDown className="ml-auto size-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn("p-0", contentCls)} style={{ width: width ? `${width}px` : "auto" }}>
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search..." value={query} onValueChange={setQuery} />

          <CommandList>
            <CommandEmpty>{emptyMessage || "No options found"}</CommandEmpty>

            {filtered.map((item, i) => {
              if (isGroup(item)) {
                return (
                  <CommandGroup
                    key={item.group}
                    heading={item.group}
                    className={cn(groupCls, item.className)}
                  >
                    {item.options.map((opt, j) => (
                      <Item
                        key={`g-${i}-${j}`}
                        option={opt}
                        selected={value.includes(getValue(opt))}
                        onSelect={toggle}
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
                  onSelect={toggle}
                  indicatorAt={indicatorAt}
                  className={itemCls}
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