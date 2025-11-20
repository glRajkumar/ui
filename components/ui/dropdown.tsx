"use client"

import { useState } from "react"
import { cn, getKey, getLabel, getValue, isSeparator, optionTypeChecker, parseAllowedPrimitive } from "@/lib/utils"

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
  groupLabelCls?: string
}

type dropdownSubMenuT = {
  submenu: string
  options: (dropdownOptionT | dropdownGroupT)[]
  triggerCls?: string
  contentCls?: string
}

type dropdownOptionsT = (dropdownOptionT | dropdownGroupT | dropdownSubMenuT)[]

type inputOptionT = allowedPrimitiveT | optionT | (optionT & {
  disabled?: boolean
})

type inputGroupT = {
  group: string
  options: inputOptionT[]
  className?: string
  groupLabelCls?: string
}

type inputSubMenuT = {
  submenu: string
  options: (inputOptionT | inputGroupT)[]
  triggerCls?: string
  contentCls?: string
}

type inputOptionsT = (inputOptionT | inputGroupT | inputSubMenuT)[]

const isDropdownGroup = optionTypeChecker<dropdownGroupT>("group")
const isSubMenu = optionTypeChecker<dropdownSubMenuT>("submenu")
const isInputGroup = optionTypeChecker<inputGroupT>("group")
const isInputSubMenu = optionTypeChecker<inputSubMenuT>("submenu")

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
      {label}
      {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
    </DropdownMenuItem>
  )
}

type SubMenuProps = {
  submenu: dropdownSubMenuT
  itemCls?: string
  groupCls?: string
  groupLabelCls?: string
  onSelect?: (value: allowedPrimitiveT) => void
}

function SubMenu({ submenu, itemCls, groupCls, groupLabelCls, onSelect }: SubMenuProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={submenu.triggerCls}>
        {submenu.submenu}
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent className={submenu.contentCls}>
        {submenu.options.map((option, i) => {
          if (isDropdownGroup(option)) {
            return (
              <DropdownMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                <DropdownMenuLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                  {option.group}
                </DropdownMenuLabel>

                {option.options.map((grOpt, j) => (
                  <Item
                    key={getKey(grOpt, j)}
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
                key={getKey(option, i)}
                submenu={option}
                itemCls={itemCls}
                groupCls={groupCls}
                onSelect={onSelect}
              />
            )
          }

          return (
            <Item
              key={getKey(option, i)}
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
  groupLabelCls?: string
  contentProps?: React.ComponentProps<typeof DropdownMenuContent>
  onSelect?: (value: allowedPrimitiveT) => void
} & React.ComponentProps<typeof DropdownMenu>

function DropdownWrapper({
  children,
  options,
  itemCls,
  groupCls,
  groupLabelCls,
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
                <DropdownMenuLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                  {option.group}
                </DropdownMenuLabel>

                {option.options.map((grOpt, j) => (
                  <Item
                    key={getKey(grOpt, j)}
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
                key={option.submenu}
                submenu={option}
                itemCls={itemCls}
                groupCls={groupCls}
                groupLabelCls={groupLabelCls}
                onSelect={onSelect}
              />
            )
          }

          return (
            <Item
              key={getKey(option, i)}
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

  indicatorAt?: indicatorAtT
}

function CheckboxItem({ option, className, checked = false, indicatorAt, onCheckedChange = () => { } }: CheckboxItemProps) {
  const label = getLabel(option)
  const value = getValue(option)
  const disabled = (option as any)?.disabled

  if (isSeparator(value)) return <DropdownMenuSeparator className={className} />

  return (
    <DropdownMenuCheckboxItem
      checked={checked}
      disabled={disabled}
      className={className}
      indicatorAt={indicatorAt}
      onCheckedChange={onCheckedChange}
    >
      {label}
    </DropdownMenuCheckboxItem>
  )
}

type CheckboxSubMenuProps = {
  submenu: inputSubMenuT
  itemCls?: string
  groupCls?: string
  groupLabelCls?: string

  checked?: allowedPrimitiveT[]
  onCheckedChange?: (value: allowedPrimitiveT, checked: boolean) => void

  indicatorAt?: indicatorAtT
}

function CheckboxSubMenu({ submenu, itemCls, groupCls, groupLabelCls, checked = [], indicatorAt, onCheckedChange = () => { } }: CheckboxSubMenuProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={submenu.triggerCls}>
        {submenu.submenu}
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent className={submenu.contentCls}>
        {submenu.options.map((option, i) => {
          if (isInputGroup(option)) {
            return (
              <DropdownMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                <DropdownMenuLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                  {option.group}
                </DropdownMenuLabel>

                {option.options.map((grOpt, j) => {
                  const v = getValue(grOpt)
                  return (
                    <CheckboxItem
                      key={getKey(grOpt, j)}
                      option={grOpt}
                      checked={checked.includes(v)}
                      className={itemCls}
                      indicatorAt={indicatorAt}
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
                key={option.submenu}
                submenu={option}
                checked={checked}
                itemCls={itemCls}
                groupCls={groupCls}
                indicatorAt={indicatorAt}
                groupLabelCls={groupLabelCls}
                onCheckedChange={onCheckedChange}
              />
            )
          }

          const v = getValue(option)
          return (
            <CheckboxItem
              key={getKey(option, i)}
              option={option}
              checked={checked.includes(v)}
              className={itemCls}
              indicatorAt={indicatorAt}
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
  groupLabelCls?: string
  contentProps?: React.ComponentProps<typeof DropdownMenuContent>

  checked?: allowedPrimitiveT[]
  onCheckedChange?: (value: allowedPrimitiveT, checked: boolean) => void

  indicatorAt?: indicatorAtT
} & React.ComponentProps<typeof DropdownMenu>

function DropdownCheckboxWrapper({
  children,
  options,

  label,
  contentProps,
  itemCls,
  groupCls,
  groupLabelCls,

  checked: o_checked,
  onCheckedChange: o_onCheckedChange,

  indicatorAt,
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
                <DropdownMenuLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                  {option.group}
                </DropdownMenuLabel>

                {option.options.map((grOpt, j) => {
                  const v = getValue(grOpt)
                  return (
                    <CheckboxItem
                      key={getKey(grOpt, j)}
                      option={grOpt}
                      checked={checked.includes(v)}
                      className={itemCls}
                      indicatorAt={indicatorAt}
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
                key={option.submenu}
                submenu={option}
                checked={checked}
                itemCls={itemCls}
                groupCls={groupCls}
                indicatorAt={indicatorAt}
                groupLabelCls={groupLabelCls}
                onCheckedChange={onCheckedChange}
              />
            )
          }

          const v = getValue(option)
          return (
            <CheckboxItem
              key={getKey(option, i)}
              option={option}
              checked={checked.includes(v)}
              className={itemCls}
              indicatorAt={indicatorAt}
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
  indicatorAt?: indicatorAtT
}

function RadioItem({ option, className, indicatorAt }: RadioItemProps) {
  const value = getValue(option)
  const label = getLabel(option)
  const disabled = (option as any)?.disabled

  if (isSeparator(value)) return <DropdownMenuSeparator className={className} />

  return (
    <DropdownMenuRadioItem
      value={`${value}`}
      disabled={disabled}
      className={className}
      indicatorAt={indicatorAt}
    >
      {label}
    </DropdownMenuRadioItem>
  )
}

type RadioSubMenuProps = {
  submenu: inputSubMenuT
  itemCls?: string
  groupCls?: string
  groupLabelCls?: string

  value?: allowedPrimitiveT
  onValueChange?: (value: allowedPrimitiveT) => void

  indicatorAt?: indicatorAtT
}

function RadioSubMenu({ submenu, itemCls, groupCls, groupLabelCls, value = "", indicatorAt, onValueChange = () => { } }: RadioSubMenuProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={submenu.triggerCls}>
        {submenu.submenu}
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent className={submenu.contentCls}>
        <DropdownMenuRadioGroup value={`${value}`} onValueChange={onValueChange}>
          {submenu.options.map((option, i) => {
            if (isInputGroup(option)) {
              return (
                <DropdownMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                  <DropdownMenuLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                    {option.group}
                  </DropdownMenuLabel>

                  {option.options.map((grOpt, j) => (
                    <RadioItem
                      key={getKey(grOpt, j)}
                      option={grOpt}
                      className={itemCls}
                      indicatorAt={indicatorAt}
                    />
                  ))}
                </DropdownMenuGroup>
              )
            }

            if (isInputSubMenu(option)) {
              return (
                <RadioSubMenu
                  key={option.submenu}
                  value={value}
                  submenu={option}
                  itemCls={itemCls}
                  groupCls={groupCls}
                  indicatorAt={indicatorAt}
                  groupLabelCls={groupLabelCls}
                  onValueChange={onValueChange}
                />
              )
            }

            return (
              <RadioItem
                key={getKey(option, i)}
                option={option}
                className={itemCls}
                indicatorAt={indicatorAt}
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
  groupLabelCls?: string
  contentProps?: React.ComponentProps<typeof DropdownMenuContent>

  value?: allowedPrimitiveT
  onValueChange?: (value: allowedPrimitiveT) => void

  indicatorAt?: indicatorAtT
} & React.ComponentProps<typeof DropdownMenu>

function DropdownRadioWrapper({
  children,
  options,

  label,
  itemCls,
  groupCls,
  groupLabelCls,
  contentProps,

  value: o_value,
  onValueChange: o_onValueChange,

  indicatorAt,
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
                  <DropdownMenuLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                    {option.group}
                  </DropdownMenuLabel>

                  {option.options.map((grOpt, j) => (
                    <RadioItem
                      key={getKey(grOpt, j)}
                      option={grOpt}
                      className={itemCls}
                      indicatorAt={indicatorAt}
                    />
                  ))}
                </DropdownMenuGroup>
              )
            }

            if (isInputSubMenu(option)) {
              return (
                <RadioSubMenu
                  key={option.submenu}
                  value={value}
                  submenu={option}
                  itemCls={itemCls}
                  groupCls={groupCls}
                  indicatorAt={indicatorAt}
                  groupLabelCls={groupLabelCls}
                  onValueChange={v => onValueChange(parseAllowedPrimitive(v))}
                />
              )
            }

            return (
              <RadioItem
                key={getKey(option, i)}
                option={option}
                className={itemCls}
                indicatorAt={indicatorAt}
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