"use client"

import { useState } from "react"
import {
  cn, getKey, getLabel, getValue,
  isSeparator,
  isSubMenu,
  isGroupMenu,
  isInputSubMenu,
  isInputGroupMenu,
  parseAllowedPrimitive,
} from "@/lib/utils"

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu"

type commonCheckboxProps = {
  checked?: allowedPrimitiveT[]
  indicatorAt?: indicatorAtT
  onCheckedChange?: (value: allowedPrimitiveT, checked: boolean) => void
}

type commonRadioProps = {
  value?: allowedPrimitiveT
  indicatorAt?: indicatorAtT
  onValueChange?: (value: allowedPrimitiveT) => void
}

type commonSubMenuT = {
  itemCls?: string
  groupCls?: string
  groupLabelCls?: string
}

type commonPropsT = {
  children: React.ReactNode
  itemCls?: string
  groupCls?: string
  groupLabelCls?: string
  contentProps?: React.ComponentProps<typeof ContextMenuContent>
  onSelect?: (value: allowedPrimitiveT) => void
} & React.ComponentProps<typeof ContextMenu>

// -------

type itemProps = {
  option: menuOptionT
  className?: string
  onSelect?: () => void
}
function Item({
  option,
  className,
  onSelect
}: itemProps) {
  const value = getValue(option)

  if (isSeparator(value)) return <ContextMenuSeparator className={className} />

  const label = getLabel(option)
  const opt: any = typeof option === "object" ? option : {}
  const shortcut = opt?.shortcut

  return (
    <ContextMenuItem
      {...opt}
      onSelect={onSelect}
      className={cn(className, opt?.className)}
    >
      {label}
      {shortcut && <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>}
    </ContextMenuItem>
  )
}

type checkboxItemProps = {
  option: menuInputOptionT
  className?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  indicatorAt?: indicatorAtT
}
function CheckboxItem({
  option,
  className,
  checked = false,
  indicatorAt,
  onCheckedChange = () => { }
}: checkboxItemProps) {
  const value = getValue(option)

  if (isSeparator(value)) return <ContextMenuSeparator className={className} />

  const label = getLabel(option)
  const disabled = (option as any)?.disabled

  return (
    <ContextMenuCheckboxItem
      checked={checked}
      disabled={disabled}
      className={className}
      indicatorAt={indicatorAt}
      onCheckedChange={onCheckedChange}
    >
      {label}
    </ContextMenuCheckboxItem>
  )
}

type radioItemProps = {
  option: menuInputOptionT
  className?: string
  indicatorAt?: indicatorAtT
}
function RadioItem({
  option,
  className,
  indicatorAt
}: radioItemProps) {
  const value = getValue(option)

  if (isSeparator(value)) return <ContextMenuSeparator className={className} />

  const label = getLabel(option)
  const disabled = (option as any)?.disabled

  return (
    <ContextMenuRadioItem
      value={`${value}`}
      disabled={disabled}
      className={className}
      indicatorAt={indicatorAt}
    >
      {label}
    </ContextMenuRadioItem>
  )
}

type SubMenuProps = commonSubMenuT & {
  submenu: subMenuT
  onSelect?: (value: allowedPrimitiveT) => void
}
function SubMenu({
  submenu,
  itemCls,
  groupCls,
  groupLabelCls,
  onSelect
}: SubMenuProps) {
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger className={submenu.triggerCls}>
        {submenu.submenu}
      </ContextMenuSubTrigger>

      <ContextMenuSubContent className={submenu.contentCls}>
        {submenu.options.map((option, i) => {
          if (isGroupMenu(option)) {
            return (
              <ContextMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                <ContextMenuLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                  {option.group}
                </ContextMenuLabel>

                {option.options.map((grOpt, j) => (
                  <Item
                    key={getKey(grOpt, j)}
                    option={grOpt}
                    className={itemCls}
                    onSelect={() => onSelect?.(getValue(grOpt))}
                  />
                ))}
              </ContextMenuGroup>
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
      </ContextMenuSubContent>
    </ContextMenuSub>
  )
}

type CheckboxSubMenuProps = commonSubMenuT & commonCheckboxProps & {
  submenu: inputSubMenuT
}
function CheckboxSubMenu({
  submenu,
  itemCls,
  groupCls,
  groupLabelCls,
  checked = [],
  indicatorAt,
  onCheckedChange = () => { }
}: CheckboxSubMenuProps) {
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger className={submenu.triggerCls}>
        {submenu.submenu}
      </ContextMenuSubTrigger>

      <ContextMenuSubContent className={submenu.contentCls}>
        {submenu.options.map((option, i) => {
          if (isInputGroupMenu(option)) {
            return (
              <ContextMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                <ContextMenuLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                  {option.group}
                </ContextMenuLabel>

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
              </ContextMenuGroup>
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
      </ContextMenuSubContent>
    </ContextMenuSub>
  )
}

type RadioSubMenuProps = commonSubMenuT & commonRadioProps & {
  submenu: inputSubMenuT
}
function RadioSubMenu({
  submenu,
  itemCls,
  groupCls,
  groupLabelCls,
  value = "",
  indicatorAt,
  onValueChange = () => { }
}: RadioSubMenuProps) {
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger className={submenu.triggerCls}>
        {submenu.submenu}
      </ContextMenuSubTrigger>

      <ContextMenuSubContent className={submenu.contentCls}>
        <ContextMenuRadioGroup value={`${value}`} onValueChange={onValueChange}>
          {submenu.options.map((option, i) => {
            if (isInputGroupMenu(option)) {
              return (
                <ContextMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                  <ContextMenuLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                    {option.group}
                  </ContextMenuLabel>

                  {option.options.map((grOpt, j) => (
                    <RadioItem
                      key={getKey(grOpt, j)}
                      option={grOpt}
                      className={itemCls}
                      indicatorAt={indicatorAt}
                    />
                  ))}
                </ContextMenuGroup>
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
        </ContextMenuRadioGroup>
      </ContextMenuSubContent>
    </ContextMenuSub>
  )
}

type ContextWrapperProps = commonPropsT & {
  options: menuOptionsT
}
function ContextWrapper({
  children,
  options,
  itemCls,
  groupCls,
  groupLabelCls,
  contentProps,
  onSelect,
  ...props
}: ContextWrapperProps) {
  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent {...contentProps}>
        {options.map((option, i) => {
          if (isGroupMenu(option)) {
            return (
              <ContextMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                <ContextMenuLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                  {option.group}
                </ContextMenuLabel>

                {option.options.map((grOpt, j) => (
                  <Item
                    key={getKey(grOpt, j)}
                    option={grOpt}
                    className={itemCls}
                    onSelect={() => onSelect?.(getValue(grOpt))}
                  />
                ))}
              </ContextMenuGroup>
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
      </ContextMenuContent>
    </ContextMenu>
  )
}

type ContextCheckboxWrapperProps = commonPropsT & commonCheckboxProps & {
  options: menuInputOptionsT
  label?: string
}
function ContextCheckboxWrapper({
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
}: ContextCheckboxWrapperProps) {
  const [i_checked, setIChecked] = useState<allowedPrimitiveT[]>([])

  function i_Checked(v: allowedPrimitiveT, c: boolean) {
    setIChecked(prev => !c ? prev.filter(p => p !== v) : [...prev, v])
  }

  const checked = o_checked ?? i_checked
  const onCheckedChange = o_onCheckedChange ?? i_Checked

  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent {...contentProps}>
        {label && (
          <>
            <ContextMenuLabel>{label}</ContextMenuLabel>
            <ContextMenuSeparator />
          </>
        )}
        {options.map((option, i) => {
          if (isInputGroupMenu(option)) {
            return (
              <ContextMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                <ContextMenuLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                  {option.group}
                </ContextMenuLabel>

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
              </ContextMenuGroup>
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
      </ContextMenuContent>
    </ContextMenu>
  )
}

type ContextRadioWrapperProps = commonPropsT & commonRadioProps & {
  options: menuInputOptionsT
  label?: string
}
function ContextRadioWrapper({
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
}: ContextRadioWrapperProps) {
  const [i_value, setIValue] = useState<allowedPrimitiveT>("")

  const value = o_value ?? i_value
  const onValueChange = o_onValueChange ?? setIValue

  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>

      <ContextMenuContent {...contentProps}>
        {label && (
          <>
            <ContextMenuLabel>{label}</ContextMenuLabel>
            <ContextMenuSeparator />
          </>
        )}
        <ContextMenuRadioGroup value={`${value}`} onValueChange={v => onValueChange(parseAllowedPrimitive(v))}>
          {options.map((option, i) => {
            if (isInputGroupMenu(option)) {
              return (
                <ContextMenuGroup key={option.group} className={cn(groupCls, option.className)}>
                  <ContextMenuLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                    {option.group}
                  </ContextMenuLabel>

                  {option.options.map((grOpt, j) => (
                    <RadioItem
                      key={getKey(grOpt, j)}
                      option={grOpt}
                      className={itemCls}
                      indicatorAt={indicatorAt}
                    />
                  ))}
                </ContextMenuGroup>
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
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export {
  ContextWrapper,
  ContextCheckboxWrapper,
  ContextRadioWrapper,
}