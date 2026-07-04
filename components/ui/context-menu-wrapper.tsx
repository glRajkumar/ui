'use client'

import { useState } from 'react'
import { cn, getKey, getLabel, getValue, isSeparator, parseAllowedPrimitive } from '@/lib/utils'
import { isSubMenu, isGroupMenu, isInputSubMenu, isInputGroupMenu } from '@/lib/menu'

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
} from '@/components/ui/context-menu'

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

type itemProps = {
  item: menuItemT
  className?: string
  onSelect?: () => void
}
function Item({ item, className, onSelect }: itemProps) {
  const value = getValue(item)

  if (isSeparator(value)) return <ContextMenuSeparator className={cn(className)} />

  const label = getLabel(item)
  const opt: any = typeof item === 'object' ? item : {}
  const shortcut = opt?.shortcut

  return (
    <ContextMenuItem {...opt} onSelect={onSelect} className={cn(className, opt?.className)}>
      {label}
      {shortcut && <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>}
    </ContextMenuItem>
  )
}

type checkboxItemProps = {
  item: menuInputItemT
  checked?: boolean
  className?: string
  indicatorAt?: indicatorAtT
  onCheckedChange?: (checked: boolean) => void
}
function CheckboxItem({
  item,
  checked = false,
  className,
  indicatorAt,
  onCheckedChange = () => {},
}: checkboxItemProps) {
  const value = getValue(item)

  if (isSeparator(value)) return <ContextMenuSeparator className={cn(className)} />

  const label = getLabel(item)
  const disabled = (item as any)?.disabled

  return (
    <ContextMenuCheckboxItem
      checked={checked}
      disabled={disabled}
      className={cn(className)}
      indicatorAt={indicatorAt}
      onCheckedChange={onCheckedChange}
    >
      {label}
    </ContextMenuCheckboxItem>
  )
}

type radioItemProps = {
  item: menuInputItemT
  className?: string
  indicatorAt?: indicatorAtT
}
function RadioItem({ item, className, indicatorAt }: radioItemProps) {
  const value = getValue(item)

  if (isSeparator(value)) return <ContextMenuSeparator className={cn(className)} />

  const label = getLabel(item)
  const disabled = (item as any)?.disabled

  return (
    <ContextMenuRadioItem
      value={`${value}`}
      disabled={disabled}
      className={cn(className)}
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
function SubMenu({ submenu, itemCls, groupCls, groupLabelCls, onSelect }: SubMenuProps) {
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger className={cn(submenu.triggerCls)}>
        {submenu.submenu}
      </ContextMenuSubTrigger>

      <ContextMenuSubContent className={cn(submenu.contentCls)}>
        {submenu.items.map((item, i) => {
          if (isGroupMenu(item)) {
            return (
              <ContextMenuGroup key={item.group} className={cn(groupCls, item.className)}>
                <ContextMenuLabel
                  className={cn(
                    'pb-0.5 text-xs text-muted-foreground font-normal',
                    groupLabelCls,
                    item.groupLabelCls,
                  )}
                >
                  {item.group}
                </ContextMenuLabel>

                {item.items.map((grOpt, j) => (
                  <Item
                    key={getKey(grOpt, j)}
                    item={grOpt}
                    className={itemCls}
                    onSelect={() => onSelect?.(getValue(grOpt))}
                  />
                ))}
              </ContextMenuGroup>
            )
          }

          if (isSubMenu(item)) {
            return (
              <SubMenu
                key={item.submenu}
                submenu={item}
                itemCls={itemCls}
                groupCls={groupCls}
                onSelect={onSelect}
              />
            )
          }

          return (
            <Item
              key={getKey(item, i)}
              item={item}
              className={itemCls}
              onSelect={() => onSelect?.(getValue(item))}
            />
          )
        })}
      </ContextMenuSubContent>
    </ContextMenuSub>
  )
}

type CheckboxSubMenuProps = commonSubMenuT &
  commonCheckboxProps & {
    submenu: inputSubMenuT
  }
function CheckboxSubMenu({
  submenu,
  itemCls,
  groupCls,
  groupLabelCls,
  checked = [],
  indicatorAt,
  onCheckedChange = () => {},
}: CheckboxSubMenuProps) {
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger className={cn(submenu.triggerCls)}>
        {submenu.submenu}
      </ContextMenuSubTrigger>

      <ContextMenuSubContent className={cn(submenu.contentCls)}>
        {submenu.items.map((item, i) => {
          if (isInputGroupMenu(item)) {
            return (
              <ContextMenuGroup key={item.group} className={cn(groupCls, item.className)}>
                <ContextMenuLabel
                  className={cn(
                    'pb-0.5 text-xs text-muted-foreground font-normal',
                    groupLabelCls,
                    item.groupLabelCls,
                  )}
                >
                  {item.group}
                </ContextMenuLabel>

                {item.items.map((grOpt, j) => {
                  const v = getValue(grOpt)
                  return (
                    <CheckboxItem
                      key={getKey(grOpt, j)}
                      item={grOpt}
                      checked={checked.includes(v)}
                      className={itemCls}
                      indicatorAt={indicatorAt}
                      onCheckedChange={checked => onCheckedChange?.(v, checked)}
                    />
                  )
                })}
              </ContextMenuGroup>
            )
          }

          if (isInputSubMenu(item)) {
            return (
              <CheckboxSubMenu
                key={item.submenu}
                submenu={item}
                checked={checked}
                itemCls={itemCls}
                groupCls={groupCls}
                indicatorAt={indicatorAt}
                groupLabelCls={groupLabelCls}
                onCheckedChange={onCheckedChange}
              />
            )
          }

          const v = getValue(item)
          return (
            <CheckboxItem
              key={getKey(item, i)}
              item={item}
              checked={checked.includes(v)}
              className={itemCls}
              indicatorAt={indicatorAt}
              onCheckedChange={checked => onCheckedChange?.(v, checked)}
            />
          )
        })}
      </ContextMenuSubContent>
    </ContextMenuSub>
  )
}

type RadioSubMenuProps = commonSubMenuT &
  commonRadioProps & {
    submenu: inputSubMenuT
  }
function RadioSubMenu({
  submenu,
  itemCls,
  groupCls,
  groupLabelCls,
  value = '',
  indicatorAt,
  onValueChange = () => {},
}: RadioSubMenuProps) {
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger className={cn(submenu.triggerCls)}>
        {submenu.submenu}
      </ContextMenuSubTrigger>

      <ContextMenuSubContent className={cn(submenu.contentCls)}>
        <ContextMenuRadioGroup value={`${value}`} onValueChange={onValueChange}>
          {submenu.items.map((item, i) => {
            if (isInputGroupMenu(item)) {
              return (
                <ContextMenuGroup key={item.group} className={cn(groupCls, item.className)}>
                  <ContextMenuLabel
                    className={cn(
                      'pb-0.5 text-xs text-muted-foreground font-normal',
                      groupLabelCls,
                      item.groupLabelCls,
                    )}
                  >
                    {item.group}
                  </ContextMenuLabel>

                  {item.items.map((grOpt, j) => (
                    <RadioItem
                      key={getKey(grOpt, j)}
                      item={grOpt}
                      className={itemCls}
                      indicatorAt={indicatorAt}
                    />
                  ))}
                </ContextMenuGroup>
              )
            }

            if (isInputSubMenu(item)) {
              return (
                <RadioSubMenu
                  key={item.submenu}
                  value={value}
                  submenu={item}
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
                key={getKey(item, i)}
                item={item}
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
  items: menuItemsT
}
function ContextWrapper({
  children,
  items,
  itemCls,
  groupCls,
  groupLabelCls,
  contentProps,
  onSelect,
  ...props
}: ContextWrapperProps) {
  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent {...contentProps}>
        {items.map((item, i) => {
          if (isGroupMenu(item)) {
            return (
              <ContextMenuGroup key={item.group} className={cn(groupCls, item.className)}>
                <ContextMenuLabel
                  className={cn(
                    'pb-0.5 text-xs text-muted-foreground font-normal',
                    groupLabelCls,
                    item.groupLabelCls,
                  )}
                >
                  {item.group}
                </ContextMenuLabel>

                {item.items.map((grOpt, j) => (
                  <Item
                    key={getKey(grOpt, j)}
                    item={grOpt}
                    className={itemCls}
                    onSelect={() => onSelect?.(getValue(grOpt))}
                  />
                ))}
              </ContextMenuGroup>
            )
          }

          if (isSubMenu(item)) {
            return (
              <SubMenu
                key={item.submenu}
                submenu={item}
                itemCls={itemCls}
                groupCls={groupCls}
                groupLabelCls={groupLabelCls}
                onSelect={onSelect}
              />
            )
          }

          return (
            <Item
              key={getKey(item, i)}
              item={item}
              className={itemCls}
              onSelect={() => onSelect?.(getValue(item))}
            />
          )
        })}
      </ContextMenuContent>
    </ContextMenu>
  )
}

type ContextCheckboxWrapperProps = commonPropsT &
  commonCheckboxProps & {
    items: menuInputItemsT
  }
function ContextCheckboxWrapper({
  children,
  items,

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
    setIChecked(prev => (!c ? prev.filter(p => p !== v) : [...prev, v]))
  }

  const checked = o_checked ?? i_checked
  const onCheckedChange = o_onCheckedChange ?? i_Checked

  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent {...contentProps}>
        {items.map((item, i) => {
          if (isInputGroupMenu(item)) {
            return (
              <ContextMenuGroup key={item.group} className={cn(groupCls, item.className)}>
                <ContextMenuLabel
                  className={cn(
                    'pb-0.5 text-xs text-muted-foreground font-normal',
                    groupLabelCls,
                    item.groupLabelCls,
                  )}
                >
                  {item.group}
                </ContextMenuLabel>

                {item.items.map((grOpt, j) => {
                  const v = getValue(grOpt)
                  return (
                    <CheckboxItem
                      key={getKey(grOpt, j)}
                      item={grOpt}
                      checked={checked.includes(v)}
                      className={itemCls}
                      indicatorAt={indicatorAt}
                      onCheckedChange={checked => onCheckedChange?.(v, checked)}
                    />
                  )
                })}
              </ContextMenuGroup>
            )
          }

          if (isInputSubMenu(item)) {
            return (
              <CheckboxSubMenu
                key={item.submenu}
                submenu={item}
                checked={checked}
                itemCls={itemCls}
                groupCls={groupCls}
                indicatorAt={indicatorAt}
                groupLabelCls={groupLabelCls}
                onCheckedChange={onCheckedChange}
              />
            )
          }

          const v = getValue(item)
          return (
            <CheckboxItem
              key={getKey(item, i)}
              item={item}
              checked={checked.includes(v)}
              className={itemCls}
              indicatorAt={indicatorAt}
              onCheckedChange={checked => onCheckedChange?.(v, checked)}
            />
          )
        })}
      </ContextMenuContent>
    </ContextMenu>
  )
}

type ContextRadioWrapperProps = commonPropsT &
  commonRadioProps & {
    items: menuInputItemsT
  }
function ContextRadioWrapper({
  children,
  items,

  itemCls,
  groupCls,
  groupLabelCls,
  contentProps,

  value: o_value,
  onValueChange: o_onValueChange,

  indicatorAt,
  ...props
}: ContextRadioWrapperProps) {
  const [i_value, setIValue] = useState<allowedPrimitiveT>('')

  const value = o_value ?? i_value
  const onValueChange = o_onValueChange ?? setIValue

  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent {...contentProps}>
        <ContextMenuRadioGroup
          value={`${value}`}
          onValueChange={v => onValueChange(parseAllowedPrimitive(v))}
        >
          {items.map((item, i) => {
            if (isInputGroupMenu(item)) {
              return (
                <ContextMenuGroup key={item.group} className={cn(groupCls, item.className)}>
                  <ContextMenuLabel
                    className={cn(
                      'pb-0.5 text-xs text-muted-foreground font-normal',
                      groupLabelCls,
                      item.groupLabelCls,
                    )}
                  >
                    {item.group}
                  </ContextMenuLabel>

                  {item.items.map((grOpt, j) => (
                    <RadioItem
                      key={getKey(grOpt, j)}
                      item={grOpt}
                      className={itemCls}
                      indicatorAt={indicatorAt}
                    />
                  ))}
                </ContextMenuGroup>
              )
            }

            if (isInputSubMenu(item)) {
              return (
                <RadioSubMenu
                  key={item.submenu}
                  value={value}
                  submenu={item}
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
                key={getKey(item, i)}
                item={item}
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

export { ContextWrapper, ContextCheckboxWrapper, ContextRadioWrapper }
