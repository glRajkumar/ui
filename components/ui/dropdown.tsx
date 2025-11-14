"use client"

import { useState } from "react"
import { cn, getLabel, getValue, isSeparator, parseAllowedPrimitive } from "@/lib/utils"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"

type dropdownOptionT = allowedPrimitiveT | optionT | (optionT & {
  variant?: "default" | "destructive"
  shortcut?: string
  disabled?: boolean
})

type dropdownGroupT = {
  group: string
  options: dropdownOptionT[]
  className?: string
}

type dropdownSubMenuT = {
  submenu: string
  options: (dropdownOptionT | dropdownGroupT)[]
  triggerCls?: string
  contentCls?: string
}

type dropdownOptionsT = (dropdownOptionT | dropdownGroupT | dropdownSubMenuT)[]

type inputOptionT = allowedPrimitiveT | optionT | (optionT & {
  label: React.ReactNode
  value: string
  disabled?: boolean
})

type inputGroupT = {
  group: string
  options: inputOptionT[]
  className?: string
}

type inputSubMenuT = {
  submenu: string
  options: (inputOptionT | inputGroupT)[]
  triggerCls?: string
  contentCls?: string
}

type inputOptionsT = (inputOptionT | inputGroupT | inputSubMenuT)[]

function isDropdownGroup(option: any): option is dropdownGroupT {
  return option && typeof option === "object" && "group" in option
}

function isSubMenu(option: any): option is dropdownSubMenuT {
  return option && typeof option === "object" && "submenu" in option
}

function isInputGroup(option: any): option is inputGroupT {
  return option && typeof option === "object" && "group" in option
}

function isInputSubMenu(option: any): option is inputSubMenuT {
  return option && typeof option === "object" && "submenu" in option
}

type ItemProps = {
  option: dropdownOptionT
  className?: string
  onSelect?: () => void
}

function Item({ option, className, onSelect }: ItemProps) {
  const value = getValue(option)
  const label = getLabel(option)

  if (isSeparator(value)) return <DropdownMenuSeparator className={className} />

  const opt: any = typeof option === "object" ? option : {}
  const shortcut = opt?.shortcut

  return (
    <DropdownMenuItem
      {...opt}
      onSelect={onSelect}
      className={cn(className, opt?.className)}
    >
      {typeof label === "object" ? label : `${label}`}
      {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
    </DropdownMenuItem>
  )
}

type SubMenuProps = {
  submenu: dropdownSubMenuT
  itemCls?: string
  groupCls?: string
  onSelect?: (value: allowedPrimitiveT) => void
}

function SubMenu({ submenu, itemCls, groupCls, onSelect }: SubMenuProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={cn(submenu.triggerCls)}>
        {submenu.submenu}
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent className={cn(submenu.contentCls)}>
        {submenu.options.map((option, i) => {
          if (isDropdownGroup(option)) {
            return (
              <DropdownMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                <DropdownMenuLabel>{option.group}</DropdownMenuLabel>
                {option.options.map((grOpt, j) => (
                  <Item
                    key={`${option.group}-item-${j}`}
                    option={grOpt}
                    className={itemCls}
                    onSelect={() => onSelect?.(getValue(grOpt))}
                  />
                ))}
              </DropdownMenuGroup>
            )
          }

          if (isSubMenu(option)) {
            return (
              <SubMenu
                key={`submenu-${i}`}
                submenu={option}
                itemCls={itemCls}
                groupCls={groupCls}
                onSelect={onSelect}
              />
            )
          }

          return (
            <Item
              key={`item-${i}`}
              option={option}
              className={itemCls}
              onSelect={() => onSelect?.(getValue(option))}
            />
          )
        })}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}

type DropdownWrapperProps = {
  children: React.ReactNode
  options: dropdownOptionsT
  itemCls?: string
  groupCls?: string
  contentProps?: React.ComponentProps<typeof DropdownMenuContent>
  onSelect?: (value: allowedPrimitiveT) => void
} & React.ComponentProps<typeof DropdownMenu>

function DropdownWrapper({
  children,
  options,
  itemCls,
  groupCls,
  contentProps,
  onSelect,
  ...props
}: DropdownWrapperProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent {...contentProps}>
        {options.map((option, i) => {
          if (isDropdownGroup(option)) {
            return (
              <DropdownMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                <DropdownMenuLabel>{option.group}</DropdownMenuLabel>
                {option.options.map((grOpt, j) => (
                  <Item
                    key={`${option.group}-item-${j}`}
                    option={grOpt}
                    className={itemCls}
                    onSelect={() => onSelect?.(getValue(grOpt))}
                  />
                ))}
              </DropdownMenuGroup>
            )
          }

          if (isSubMenu(option)) {
            return (
              <SubMenu
                key={`submenu-${i}`}
                submenu={option}
                itemCls={itemCls}
                groupCls={groupCls}
                onSelect={onSelect}
              />
            )
          }

          return (
            <Item
              key={`item-${i}`}
              option={option}
              className={itemCls}
              onSelect={() => onSelect?.(getValue(option))}
            />
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type CheckboxItemProps = {
  option: inputOptionT
  className?: string

  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function CheckboxItem({ option, className, checked = false, onCheckedChange = () => { } }: CheckboxItemProps) {
  const label = getLabel(option)
  const value = getValue(option)
  const disabled = (option as any)?.disabled

  if (isSeparator(value)) return <DropdownMenuSeparator className={className} />

  return (
    <DropdownMenuCheckboxItem
      checked={checked}
      disabled={disabled}
      className={className}
      onCheckedChange={onCheckedChange}
    >
      {typeof label === "object" ? label : `${label}`}
    </DropdownMenuCheckboxItem>
  )
}

type CheckboxSubMenuProps = {
  submenu: inputSubMenuT
  itemCls?: string
  groupCls?: string

  checked?: allowedPrimitiveT[]
  onCheckedChange?: (value: allowedPrimitiveT, checked: boolean) => void
}

function CheckboxSubMenu({ submenu, itemCls, groupCls, checked = [], onCheckedChange = () => { } }: CheckboxSubMenuProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={cn(submenu.triggerCls)}>
        {submenu.submenu}
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent className={cn(submenu.contentCls)}>
        {submenu.options.map((option, i) => {
          if (isInputGroup(option)) {
            return (
              <DropdownMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                <DropdownMenuLabel>{option.group}</DropdownMenuLabel>
                {option.options.map((grOpt, j) => {
                  const v = getValue(grOpt)
                  return (
                    <CheckboxItem
                      key={`${v}-${j}`}
                      option={grOpt}
                      className={itemCls}
                      checked={checked.includes(v)}
                      onCheckedChange={(checked) => onCheckedChange?.(v, checked)}
                    />
                  )
                })}
              </DropdownMenuGroup>
            )
          }

          if (isInputSubMenu(option)) {
            return (
              <CheckboxSubMenu
                key={`submenu-${i}`}
                submenu={option}
                itemCls={itemCls}
                groupCls={groupCls}
                checked={checked}
                onCheckedChange={onCheckedChange}
              />
            )
          }

          const v = getValue(option)
          return (
            <CheckboxItem
              key={`${v}-${i}`}
              option={option}
              className={itemCls}
              checked={checked.includes(v)}
              onCheckedChange={(checked) => onCheckedChange?.(v, checked)}
            />
          )
        })}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}

type DropdownCheckboxWrapperProps = {
  children: React.ReactNode
  options: inputOptionsT

  label?: string
  itemCls?: string
  groupCls?: string
  contentProps?: React.ComponentProps<typeof DropdownMenuContent>

  checked?: allowedPrimitiveT[]
  onCheckedChange?: (value: allowedPrimitiveT, checked: boolean) => void
} & React.ComponentProps<typeof DropdownMenu>

function DropdownCheckboxWrapper({
  children,
  options,

  label,
  contentProps,
  itemCls,
  groupCls,

  checked: o_checked,
  onCheckedChange: o_onCheckedChange,
  ...props
}: DropdownCheckboxWrapperProps) {
  const [i_checked, setIChecked] = useState<allowedPrimitiveT[]>([])

  function i_Checked(v: allowedPrimitiveT, c: boolean) {
    setIChecked(prev => !c ? prev.filter(p => p !== v) : [...prev, v])
  }

  const checked = o_checked ?? i_checked
  const onCheckedChange = o_onCheckedChange ?? i_Checked

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent {...contentProps}>
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {options.map((option, i) => {
          if (isInputGroup(option)) {
            return (
              <DropdownMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                <DropdownMenuLabel>{option.group}</DropdownMenuLabel>
                {option.options.map((grOpt, j) => {
                  const v = getValue(grOpt)
                  return (
                    <CheckboxItem
                      key={`${v}-${j}`}
                      option={grOpt}
                      className={itemCls}
                      checked={checked.includes(v)}
                      onCheckedChange={(checked) => onCheckedChange?.(v, checked)}
                    />
                  )
                })}
              </DropdownMenuGroup>
            )
          }

          if (isInputSubMenu(option)) {
            return (
              <CheckboxSubMenu
                key={`submenu-${i}`}
                submenu={option}
                itemCls={itemCls}
                groupCls={groupCls}
                checked={checked}
                onCheckedChange={onCheckedChange}
              />
            )
          }

          const v = getValue(option)
          return (
            <CheckboxItem
              key={`${v}-${i}`}
              option={option}
              className={itemCls}
              checked={checked.includes(v)}
              onCheckedChange={(checked) => onCheckedChange?.(v, checked)}
            />
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type RadioItemProps = {
  option: inputOptionT
  className?: string
}

function RadioItem({ option, className }: RadioItemProps) {
  const value = getValue(option)
  const label = getLabel(option)
  const disabled = (option as any)?.disabled

  if (isSeparator(value)) return <DropdownMenuSeparator className={className} />

  return (
    <DropdownMenuRadioItem
      value={`${value}`}
      disabled={disabled}
      className={className}
    >
      {typeof label === "object" ? label : `${label}`}
    </DropdownMenuRadioItem>
  )
}

type RadioSubMenuProps = {
  submenu: inputSubMenuT
  itemCls?: string
  groupCls?: string

  value?: allowedPrimitiveT
  onValueChange?: (value: allowedPrimitiveT) => void
}

function RadioSubMenu({ submenu, itemCls, groupCls, value = "", onValueChange = () => { } }: RadioSubMenuProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={cn(submenu.triggerCls)}>
        {submenu.submenu}
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent className={cn(submenu.contentCls)}>
        <DropdownMenuRadioGroup value={`${value}`} onValueChange={onValueChange}>
          {submenu.options.map((option, i) => {
            if (isInputGroup(option)) {
              return (
                <DropdownMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                  <DropdownMenuLabel>{option.group}</DropdownMenuLabel>
                  {option.options.map((grOpt, j) => (
                    <RadioItem
                      key={`${getValue(grOpt)}-${j}`}
                      option={grOpt}
                      className={itemCls}
                    />
                  ))}
                </DropdownMenuGroup>
              )
            }

            if (isInputSubMenu(option)) {
              return (
                <RadioSubMenu
                  key={`submenu-${i}`}
                  submenu={option}
                  itemCls={itemCls}
                  groupCls={groupCls}
                  value={value}
                  onValueChange={onValueChange}
                />
              )
            }

            return (
              <RadioItem
                key={`${getValue(option)}-${i}`}
                option={option}
                className={itemCls}
              />
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}

type DropdownRadioWrapperProps = {
  children: React.ReactNode
  options: inputOptionsT

  label?: string
  itemCls?: string
  groupCls?: string
  contentProps?: React.ComponentProps<typeof DropdownMenuContent>

  value?: allowedPrimitiveT
  onValueChange?: (value: allowedPrimitiveT) => void
} & React.ComponentProps<typeof DropdownMenu>

function DropdownRadioWrapper({
  children,
  options,

  label,
  itemCls,
  groupCls,
  contentProps,

  value: o_value,
  onValueChange: o_onValueChange,
  ...props
}: DropdownRadioWrapperProps) {
  const [i_value, setIValue] = useState<allowedPrimitiveT>("")

  const value = o_value ?? i_value
  const onValueChange = o_onValueChange ?? setIValue

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent {...contentProps}>
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuRadioGroup value={`${value}`} onValueChange={v => onValueChange(parseAllowedPrimitive(v))}>
          {options.map((option, i) => {
            if (isInputGroup(option)) {
              return (
                <DropdownMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                  <DropdownMenuLabel>{option.group}</DropdownMenuLabel>
                  {option.options.map((grOpt, j) => (
                    <RadioItem
                      key={`${getValue(grOpt)}-${j}`}
                      option={grOpt}
                      className={itemCls}
                    />
                  ))}
                </DropdownMenuGroup>
              )
            }

            if (isInputSubMenu(option)) {
              return (
                <RadioSubMenu
                  key={`submenu-${i}`}
                  submenu={option}
                  itemCls={itemCls}
                  groupCls={groupCls}
                  value={value}
                  onValueChange={v => onValueChange(parseAllowedPrimitive(v))}
                />
              )
            }

            return (
              <RadioItem
                key={`${getValue(option)}-${i}`}
                option={option}
                className={itemCls}
              />
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export {
  DropdownWrapper,
  DropdownCheckboxWrapper,
  DropdownRadioWrapper,
  type dropdownOptionT,
  type dropdownGroupT,
  type dropdownSubMenuT,
  type dropdownOptionsT,
  type inputOptionT,
  type inputGroupT,
  type inputSubMenuT,
  type inputOptionsT,
}