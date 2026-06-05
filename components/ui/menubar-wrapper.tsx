'use client'

import { useState } from 'react'
import { cn, getKey, getLabel, getValue, isSeparator, parseAllowedPrimitive } from '@/lib/utils'
import { isSubMenu, isGroupMenu, isInputSubMenu, isInputGroupMenu } from '@/lib/menu'

import {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarLabel,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarMenu,
} from '@/components/ui/menubar'

type commomClsT = {
  itemCls?: string
  groupCls?: string
  groupLabelCls?: string
}

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

type commonInner = commomClsT & {
  trigger: React.ReactNode
  triggerCls?: string
  triggerProps?: Omit<React.ComponentProps<typeof MenubarTrigger>, 'children' | 'className'>
  contentProps?: React.ComponentProps<typeof MenubarContent>
}

type menubarBaseT = commomClsT & {
  key: string
  trigger: React.ReactNode
  triggerCls?: string
  triggerProps?: Omit<React.ComponentProps<typeof MenubarTrigger>, 'children' | 'className'>
  contentProps?: React.ComponentProps<typeof MenubarContent>
}

type menubaritemsT = (menubarBaseT & {
  items: menuItemsT
  onSelect?: (value: allowedPrimitiveT) => void
})[]

type menubarInputitemT = menubarBaseT & {
  items: menuInputItemsT
}

type menubarCheckboxitemsT = (menubarInputitemT & commonCheckboxProps)[]
type menubarRadioitemsT = (menubarInputitemT & commonRadioProps)[]

type commonWrapT = commomClsT &
  Omit<React.ComponentProps<typeof Menubar>, 'children' | 'value'> & {
    triggerCls?: string
    triggerProps?: Omit<React.ComponentProps<typeof MenubarTrigger>, 'children' | 'className'>
    contentProps?: React.ComponentProps<typeof MenubarContent>
  }

type itemProps = {
  item: menuItemT
  className?: string
  onSelect?: () => void
}
function Item({ item, className, onSelect }: itemProps) {
  const value = getValue(item)

  if (isSeparator(value)) return <MenubarSeparator className={cn(className)} />

  const label = getLabel(item)
  const opt: any = typeof item === 'object' ? item : {}
  const shortcut = opt?.shortcut

  return (
    <MenubarItem {...opt} onSelect={onSelect} className={cn(className, opt?.className)}>
      {label}
      {shortcut && <MenubarShortcut>{shortcut}</MenubarShortcut>}
    </MenubarItem>
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
  className,
  checked = false,
  indicatorAt,
  onCheckedChange = () => { },
}: checkboxItemProps) {
  const value = getValue(item)

  if (isSeparator(value)) return <MenubarSeparator className={cn(className)} />

  const label = getLabel(item)
  const disabled = (item as any)?.disabled

  return (
    <MenubarCheckboxItem
      checked={checked}
      disabled={disabled}
      className={cn(className)}
      indicatorAt={indicatorAt}
      onCheckedChange={onCheckedChange}
    >
      {label}
    </MenubarCheckboxItem>
  )
}

type radioItemProps = {
  item: menuInputItemT
  className?: string
  indicatorAt?: indicatorAtT
}
function RadioItem({ item, className, indicatorAt }: radioItemProps) {
  const value = getValue(item)

  if (isSeparator(value)) return <MenubarSeparator className={cn(className)} />

  const label = getLabel(item)
  const disabled = (item as any)?.disabled

  return (
    <MenubarRadioItem
      value={`${value}`}
      disabled={disabled}
      className={cn(className)}
      indicatorAt={indicatorAt}
    >
      {label}
    </MenubarRadioItem>
  )
}

type SubMenuProps = commomClsT & {
  submenu: subMenuT
  onSelect?: (value: allowedPrimitiveT) => void
}
function SubMenu({ submenu, itemCls, groupCls, groupLabelCls, onSelect }: SubMenuProps) {
  return (
    <MenubarSub>
      <MenubarSubTrigger className={cn(submenu.triggerCls)}>{submenu.submenu}</MenubarSubTrigger>

      <MenubarSubContent className={cn(submenu.contentCls)}>
        {submenu.items.map((item, i) => {
          if (isGroupMenu(item)) {
            return (
              <MenubarGroup key={item.group} className={cn(groupCls, item.className)}>
                <MenubarLabel
                  className={cn(
                    'pb-0.5 text-xs text-muted-foreground font-normal',
                    groupLabelCls,
                    item.groupLabelCls,
                  )}
                >
                  {item.group}
                </MenubarLabel>

                {item.items.map((grOpt, j) => (
                  <Item
                    key={getKey(grOpt, j)}
                    item={grOpt}
                    className={itemCls}
                    onSelect={() => onSelect?.(getValue(grOpt))}
                  />
                ))}
              </MenubarGroup>
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
      </MenubarSubContent>
    </MenubarSub>
  )
}

type CheckboxSubMenuProps = commomClsT &
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
  onCheckedChange = () => { },
}: CheckboxSubMenuProps) {
  return (
    <MenubarSub>
      <MenubarSubTrigger className={cn(submenu.triggerCls)}>{submenu.submenu}</MenubarSubTrigger>

      <MenubarSubContent className={cn(submenu.contentCls)}>
        {submenu.items.map((item, i) => {
          if (isInputGroupMenu(item)) {
            return (
              <MenubarGroup key={item.group} className={cn(groupCls, item.className)}>
                <MenubarLabel
                  className={cn(
                    'pb-0.5 text-xs text-muted-foreground font-normal',
                    groupLabelCls,
                    item.groupLabelCls,
                  )}
                >
                  {item.group}
                </MenubarLabel>

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
              </MenubarGroup>
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
      </MenubarSubContent>
    </MenubarSub>
  )
}

type RadioSubMenuProps = commomClsT &
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
  onValueChange = () => { },
}: RadioSubMenuProps) {
  return (
    <MenubarSub>
      <MenubarSubTrigger className={cn(submenu.triggerCls)}>{submenu.submenu}</MenubarSubTrigger>

      <MenubarSubContent className={cn(submenu.contentCls)}>
        <MenubarRadioGroup value={`${value}`} onValueChange={onValueChange}>
          {submenu.items.map((item, i) => {
            if (isInputGroupMenu(item)) {
              return (
                <MenubarGroup key={item.group} className={cn(groupCls, item.className)}>
                  <MenubarLabel
                    className={cn(
                      'pb-0.5 text-xs text-muted-foreground font-normal',
                      groupLabelCls,
                      item.groupLabelCls,
                    )}
                  >
                    {item.group}
                  </MenubarLabel>

                  {item.items.map((grOpt, j) => (
                    <RadioItem
                      key={getKey(grOpt, j)}
                      item={grOpt}
                      className={itemCls}
                      indicatorAt={indicatorAt}
                    />
                  ))}
                </MenubarGroup>
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
        </MenubarRadioGroup>
      </MenubarSubContent>
    </MenubarSub>
  )
}

type wrapperInner = commonInner & {
  items: menuItemsT
  onSelect?: (value: allowedPrimitiveT) => void
}
function MenubarWrapperInner({
  trigger,
  items,
  triggerCls,
  triggerProps,
  itemCls,
  groupCls,
  groupLabelCls,
  contentProps,
  onSelect,
}: wrapperInner) {
  return (
    <MenubarMenu>
      <MenubarTrigger className={triggerCls} {...triggerProps}>
        {trigger}
      </MenubarTrigger>

      <MenubarContent {...contentProps}>
        {items.map((item, i) => {
          if (isGroupMenu(item)) {
            return (
              <MenubarGroup key={item.group} className={cn(groupCls, item.className)}>
                <MenubarLabel
                  className={cn(
                    'pb-0.5 text-xs text-muted-foreground font-normal',
                    groupLabelCls,
                    item.groupLabelCls,
                  )}
                >
                  {item.group}
                </MenubarLabel>

                {item.items.map((grOpt, j) => (
                  <Item
                    key={getKey(grOpt, j)}
                    item={grOpt}
                    className={itemCls}
                    onSelect={() => onSelect?.(getValue(grOpt))}
                  />
                ))}
              </MenubarGroup>
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
      </MenubarContent>
    </MenubarMenu>
  )
}

type checkboxWrapperInner = commonInner &
  commonCheckboxProps & {
    items: menuInputItemsT
  }
function MenubarCheckboxWrapperInner({
  trigger,
  items,

  triggerCls,
  triggerProps,
  contentProps,
  itemCls,
  groupCls,
  groupLabelCls,

  checked: o_checked,
  onCheckedChange: o_onCheckedChange,

  indicatorAt,
}: checkboxWrapperInner) {
  const [i_checked, setIChecked] = useState<allowedPrimitiveT[]>([])

  function i_Checked(v: allowedPrimitiveT, c: boolean) {
    setIChecked(prev => (!c ? prev.filter(p => p !== v) : [...prev, v]))
  }

  const checked = o_checked ?? i_checked
  const onCheckedChange = o_onCheckedChange ?? i_Checked

  return (
    <MenubarMenu>
      <MenubarTrigger className={triggerCls} {...triggerProps}>
        {trigger}
      </MenubarTrigger>

      <MenubarContent {...contentProps}>
        {items.map((item, i) => {
          if (isInputGroupMenu(item)) {
            return (
              <MenubarGroup key={item.group} className={cn(groupCls, item.className)}>
                <MenubarLabel
                  className={cn(
                    'pb-0.5 text-xs text-muted-foreground font-normal',
                    groupLabelCls,
                    item.groupLabelCls,
                  )}
                >
                  {item.group}
                </MenubarLabel>

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
              </MenubarGroup>
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
      </MenubarContent>
    </MenubarMenu>
  )
}

type radioWrapperInner = commonInner &
  commonRadioProps & {
    items: menuInputItemsT
  }
function MenubarRadioWrapperInner({
  trigger,
  items,

  triggerCls,
  triggerProps,
  itemCls,
  groupCls,
  groupLabelCls,
  contentProps,

  value: o_value,
  onValueChange: o_onValueChange,

  indicatorAt,
}: radioWrapperInner) {
  const [i_value, setIValue] = useState<allowedPrimitiveT>('')

  const value = o_value ?? i_value
  const onValueChange = o_onValueChange ?? setIValue

  return (
    <MenubarMenu>
      <MenubarTrigger className={cn(triggerCls)} {...triggerProps}>
        {trigger}
      </MenubarTrigger>

      <MenubarContent {...contentProps}>
        <MenubarRadioGroup
          value={`${value}`}
          onValueChange={v => onValueChange(parseAllowedPrimitive(v))}
        >
          {items.map((item, i) => {
            if (isInputGroupMenu(item)) {
              return (
                <MenubarGroup key={item.group} className={cn(groupCls, item.className)}>
                  <MenubarLabel
                    className={cn(
                      'pb-0.5 text-xs text-muted-foreground font-normal',
                      groupLabelCls,
                      item.groupLabelCls,
                    )}
                  >
                    {item.group}
                  </MenubarLabel>

                  {item.items.map((grOpt, j) => (
                    <RadioItem
                      key={getKey(grOpt, j)}
                      item={grOpt}
                      className={itemCls}
                      indicatorAt={indicatorAt}
                    />
                  ))}
                </MenubarGroup>
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
        </MenubarRadioGroup>
      </MenubarContent>
    </MenubarMenu>
  )
}

type wrap = commonWrapT & {
  items: menubaritemsT
  onSelect?: (value: allowedPrimitiveT) => void
}
function MenubarWrapper({
  items,
  triggerCls,
  triggerProps,
  itemCls,
  groupCls,
  groupLabelCls,
  contentProps,
  onSelect,
  ...props
}: wrap) {
  return (
    <Menubar {...props}>
      {items.map(op => (
        <MenubarWrapperInner
          key={op.key}
          trigger={op.trigger}
          items={op.items}
          triggerCls={cn(triggerCls, op.triggerCls)}
          triggerProps={{ ...triggerProps, ...op.triggerProps }}
          itemCls={cn(itemCls, op.itemCls)}
          groupCls={cn(groupCls, op.groupCls)}
          groupLabelCls={cn(groupLabelCls, op.groupLabelCls)}
          contentProps={{ ...contentProps, ...op?.contentProps }}
          onSelect={op?.onSelect || onSelect}
        />
      ))}
    </Menubar>
  )
}

type wrapCheckboxT = commonWrapT &
  commonCheckboxProps & {
    items: menubarCheckboxitemsT
  }
function MenubarCheckboxWrapper({
  items,

  triggerCls,
  triggerProps,
  contentProps,
  itemCls,
  groupCls,
  groupLabelCls,

  checked,
  onCheckedChange,

  indicatorAt,
  ...props
}: wrapCheckboxT) {
  return (
    <Menubar {...props}>
      {items.map(op => (
        <MenubarCheckboxWrapperInner
          key={op.key}
          trigger={op.trigger}
          items={op.items}
          triggerCls={cn(triggerCls, op.triggerCls)}
          triggerProps={{ ...triggerProps, ...op.triggerProps }}
          itemCls={cn(itemCls, op.itemCls)}
          groupCls={cn(groupCls, op.groupCls)}
          groupLabelCls={cn(groupLabelCls, op.groupLabelCls)}
          contentProps={{ ...contentProps, ...op?.contentProps }}
          onCheckedChange={op.onCheckedChange ?? onCheckedChange}
          indicatorAt={op.indicatorAt ?? indicatorAt}
          checked={op.checked ?? checked}
        />
      ))}
    </Menubar>
  )
}

type wrapRadioT = commonWrapT &
  commonRadioProps & {
    items: menubarRadioitemsT
  }
function MenubarRadioWrapper({
  items,

  triggerCls,
  triggerProps,
  contentProps,
  itemCls,
  groupCls,
  groupLabelCls,

  value,
  onValueChange,

  indicatorAt,
  ...props
}: wrapRadioT) {
  return (
    <Menubar {...props}>
      {items.map(op => (
        <MenubarRadioWrapperInner
          key={op.key}
          trigger={op.trigger}
          items={op.items}
          triggerCls={cn(triggerCls, op.triggerCls)}
          triggerProps={{ ...triggerProps, ...op.triggerProps }}
          itemCls={cn(itemCls, op.itemCls)}
          groupCls={cn(groupCls, op.groupCls)}
          groupLabelCls={cn(groupLabelCls, op.groupLabelCls)}
          contentProps={{ ...contentProps, ...op?.contentProps }}
          onValueChange={op.onValueChange ?? onValueChange}
          indicatorAt={op.indicatorAt ?? indicatorAt}
          value={op.value ?? value}
        />
      ))}
    </Menubar>
  )
}

export {
  MenubarWrapper,
  MenubarCheckboxWrapper,
  MenubarRadioWrapper,
  type menubaritemsT,
  type menubarCheckboxitemsT,
  type menubarRadioitemsT,
}
