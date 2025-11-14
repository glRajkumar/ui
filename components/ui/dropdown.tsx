import { cn, getLabel, getValue, isSeparator } from "@/lib/utils"

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

type dropdownOptionT = optionT & {
  shortcut?: string
  variant?: "default" | "destructive"
  disabled?: boolean
  onSelect?: () => void
}

type dropdownGroupT = {
  group: string
  options: (allowedPrimitiveT | dropdownOptionT)[]
  className?: string
}

type dropdownSubMenuT = {
  submenu: string
  options: (allowedPrimitiveT | dropdownOptionT | dropdownGroupT)[]
  className?: string
}

type dropdownOptionsT = (
  | allowedPrimitiveT
  | dropdownOptionT
  | dropdownGroupT
  | dropdownSubMenuT
)[]

type checkboxOptionT = {
  label: React.ReactNode
  value: string
  checked: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

type radioOptionT = {
  label: React.ReactNode
  value: string
  disabled?: boolean
}

function isDropdownGroup(option: any): option is dropdownGroupT {
  return option && typeof option === "object" && "group" in option
}

function isSubMenu(option: any): option is dropdownSubMenuT {
  return option && typeof option === "object" && "submenu" in option
}

function isDropdownOption(option: any): option is dropdownOptionT {
  return option && typeof option === "object" && "value" in option
}

type ItemProps = {
  option: allowedPrimitiveT | dropdownOptionT
  className?: string
  inset?: boolean
}

function Item({ option, className, inset }: ItemProps) {
  const value = getValue(option)
  const label = getLabel(option)

  if (isSeparator(value)) return <DropdownMenuSeparator className={className} />

  const opt = isDropdownOption(option) ? option : undefined
  const shortcut = opt?.shortcut
  const variant = opt?.variant
  const disabled = opt?.disabled
  const onSelect = opt?.onSelect

  return (
    <DropdownMenuItem
      className={cn(className, opt?.className)}
      inset={inset}
      variant={variant}
      disabled={disabled}
      onSelect={onSelect}
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
}

function SubMenu({ submenu, itemCls, groupCls }: SubMenuProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={cn(itemCls, submenu.className)}>
        {submenu.submenu}
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent>
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
                    inset
                  />
                ))}
              </DropdownMenuGroup>
            )
          }

          if (isSubMenu(option)) {
            return <SubMenu key={`submenu-${i}`} submenu={option} itemCls={itemCls} groupCls={groupCls} />
          }

          return <Item key={`item-${i}`} option={option} className={itemCls} />
        })}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}

type DropdownWrapperProps = {
  trigger: React.ReactNode
  options: dropdownOptionsT
  contentProps?: React.ComponentProps<typeof DropdownMenuContent>
  groupCls?: string
  itemCls?: string
}

function DropdownWrapper({
  trigger,
  options,
  contentProps,
  groupCls,
  itemCls,
  ...props
}: React.ComponentProps<typeof DropdownMenu> & DropdownWrapperProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        {trigger}
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
                    inset
                  />
                ))}
              </DropdownMenuGroup>
            )
          }

          if (isSubMenu(option)) {
            return <SubMenu key={`submenu-${i}`} submenu={option} itemCls={itemCls} groupCls={groupCls} />
          }

          return <Item key={`item-${i}`} option={option} className={itemCls} />
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type DropdownCheckboxWrapperProps = {
  trigger: React.ReactNode
  options: checkboxOptionT[]
  label?: string
  contentProps?: React.ComponentProps<typeof DropdownMenuContent>
  itemCls?: string
}

function DropdownCheckboxWrapper({
  trigger,
  options,
  label,
  contentProps,
  itemCls,
  ...props
}: React.ComponentProps<typeof DropdownMenu> & DropdownCheckboxWrapperProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent {...contentProps}>
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {label && <DropdownMenuSeparator />}
        {options.map((option, i) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={option.checked}
            onCheckedChange={option.onCheckedChange}
            disabled={option.disabled}
            className={itemCls}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type DropdownRadioWrapperProps = {
  trigger: React.ReactNode
  options: radioOptionT[]
  value: string
  onValueChange: (value: string) => void
  label?: string
  contentProps?: React.ComponentProps<typeof DropdownMenuContent>
  itemCls?: string
}

function DropdownRadioWrapper({
  trigger,
  options,
  value,
  onValueChange,
  label,
  contentProps,
  itemCls,
  ...props
}: React.ComponentProps<typeof DropdownMenu> & DropdownRadioWrapperProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent {...contentProps}>
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {label && <DropdownMenuSeparator />}
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={itemCls}
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
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
  type checkboxOptionT,
  type radioOptionT,
}