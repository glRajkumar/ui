"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn, getLabel, getValue, isOption } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

type toggleItemT = allowedPrimitiveT | (optionT & {
  "aria-label"?: string
})

type toggleItemsT = toggleItemT[]

type itemProps = {
  option: toggleItemT
  className?: string
}

function Item({ option, className }: itemProps) {
  const value = getValue(option)
  const label = getLabel(option)
  const isObj = isOption(option)

  return (
    <ToggleGroupItem
      value={`${value}`}
      className={cn("border", className, isObj && option.className)}
      aria-label={isObj ? option["aria-label"] : undefined}
    >
      {isObj ? label : `${label}`}
    </ToggleGroupItem>
  )
}

type props = {
  options: toggleItemT[]
  itemCls?: string
  type?: "single" | "multiple"
} & Omit<React.ComponentProps<typeof ToggleGroupPrimitive.Root>, "type">

function ToggleGroupWrapper({
  options,
  itemCls,
  type = "single",
  ...props
}: props) {
  return (
    <ToggleGroup type={type} {...(props as any)}>
      {options.map((option, i) => (
        <Item
          key={i}
          option={option}
          className={itemCls}
        />
      ))}
    </ToggleGroup>
  )
}

export {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupWrapper,
  type toggleItemT,
  type toggleItemsT,
}