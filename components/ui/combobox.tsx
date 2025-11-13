"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react"

import { cn, isAllowedPrimitive } from "@/lib/utils"
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

const isGroup = (item: allowedPrimitiveT | optionT | groupT): item is groupT => !!item && typeof item === "object" && "group" in item
const isOption = (item: allowedPrimitiveT | optionT): item is optionT => !!item && typeof item === "object" && "value" in item
const isSeparator = (item: allowedPrimitiveT | optionT) => item === "---"

const getValue = (item: allowedPrimitiveT | optionT) => isOption(item) ? item.value : item
const getLabel = (item: allowedPrimitiveT | optionT) => isOption(item) ? item.label : item

const extractText = (node: any): string => {
  if (node === null || node === undefined) return ""
  if (isAllowedPrimitive(node)) return String(node)
  if (Array.isArray(node)) return node.map(extractText).join(" ")
  if (node.props?.children) return extractText(node.props.children)
  return ""
}

const findOptionByValue = (options: optionsT, value: allowedPrimitiveT) => {
  for (const item of options) {
    if (isGroup(item)) {
      const found = item.options.find((opt) => getValue(opt) === value)
      if (found) return found
    } else if (!isSeparator(item) && getValue(item) === value) {
      return item
    }
  }
  return ""
}

type ItemProps = {
  option: allowedPrimitiveT | optionT
  selected: boolean
  indicatorAt: indicatorAt
  onSelect: (value: allowedPrimitiveT) => void
  className?: string
}

function Item({ option, selected, indicatorAt, onSelect, className }: ItemProps) {
  if (isSeparator(option)) {
    return <CommandSeparator className={className} />
  }

  const value = getValue(option)
  const label = getLabel(option)
  const optCls = isOption(option) ? option.className : undefined

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
  value = "",
  options = [],
  placeholder = "",
  emptyMessage = "",
  isLoading = false,
  canCreateNew = false,
  indicatorAt = "right",
  triggerCls,
  contentCls,
  groupCls,
  itemCls,
  onValueChange = () => { },
}: comboboxProps) {
  const { ref, width } = useElementWidth<HTMLButtonElement>()

  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const selectedOption = findOptionByValue(options, value)
  const filtered = options
    .map((item) => {
      if (isGroup(item)) {
        const filtered = item.options.filter((opt) => extractText(getLabel(opt)).toLowerCase().includes(query.toLowerCase()))
        return filtered.length ? { ...item, options: filtered } : null
      }
      if (isSeparator(item)) return item
      return extractText(getLabel(item)).toLowerCase().includes(query.toLowerCase()) ? item : null
    })
    .filter(v => v !== null) as optionsT

  const showCreate =
    canCreateNew &&
    query &&
    !options.some((o) =>
      isGroup(o)
        ? o.options.some((x) => extractText(getLabel(x)) === query)
        : extractText(getLabel(o)) === query
    )

  const label = getLabel(selectedOption)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
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
    if (!found) return val.toString()
    const l = getLabel(found)
    return typeof l === "boolean" ? l.toString() : l
  }

  if (isLoading)
    return (
      <>
        <Loader2 className="size-4 animate-spin" />
        <span>Loading...</span>
      </>
    )

  if (value.length === 0) {
    return placeholder ? <span className="text-muted-foreground">{placeholder}</span> : null
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
  value = [],
  options = [],
  placeholder = "",
  emptyMessage = "",
  isLoading = false,
  indicatorAt = "right",
  triggerCls,
  contentCls,
  groupCls,
  itemCls,
  onValueChange = () => { },
}: multiSelectComboboxProps) {
  const { ref, width } = useElementWidth<HTMLButtonElement>()

  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const toggle = (v: allowedPrimitiveT) => {
    onValueChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  }

  const filtered = options
    .map((item) => {
      if (isGroup(item)) {
        const filtered = item.options.filter((opt) =>
          extractText(getLabel(opt)).toLowerCase().includes(query.toLowerCase())
        )
        return filtered.length ? { ...item, options: filtered } : null
      }
      if (isSeparator(item)) return item
      return extractText(getLabel(item)).toLowerCase().includes(query.toLowerCase()) ? item : null
    })
    .filter(v => v !== null) as optionsT

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
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