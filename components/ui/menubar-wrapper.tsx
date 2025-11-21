"use client"

import { useState } from "react"
import {
  cn, getKey, getLabel, getValue,
  isSeparator,
  isDropdownGroup,
  isDropdownSubMenu,
  isDropdownInputGroup,
  isDropdownInputSubMenu,
  parseAllowedPrimitive,
} from "@/lib/utils"

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
} from "@/components/ui/menubar"

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
  contentProps?: React.ComponentProps<typeof MenubarContent>
}

type menubarBaseT = commomClsT & {
  key: string
  trigger: React.ReactNode
  contentProps?: React.ComponentProps<typeof MenubarContent>
}

type menubarOptionsT = (menubarBaseT & {
  options: dropdownOptionsT
  onSelect?: (value: allowedPrimitiveT) => void
})[]

type menubarInputOptionT = menubarBaseT & {
  options: dropdownInputOptionsT
}

type menubarCheckboxOptionsT = (menubarInputOptionT & commonCheckboxProps)[]
type menubarRadioOptionsT = (menubarInputOptionT & commonRadioProps)[]

type commonWrapT = commomClsT & Omit<React.ComponentProps<typeof Menubar>, "children" | "asChild" | "value"> & {
  contentProps?: React.ComponentProps<typeof MenubarContent>
}

// -------

type itemProps = {
  option: dropdownOptionT
  className?: string
  onSelect?: () => void
}
function Item({
  option,
  className,
  onSelect
}: itemProps) {
  const value = getValue(option)

  if (isSeparator(value)) return <MenubarSeparator className={className} />

  const label = getLabel(option)
  const opt: any = typeof option === "object" ? option : {}
  const shortcut = opt?.shortcut

  return (
    <MenubarItem
      {...opt}
      onSelect={onSelect}
      className={cn(className, opt?.className)}
    >
      {label}
      {shortcut && <MenubarShortcut>{shortcut}</MenubarShortcut>}
    </MenubarItem>
  )
}

type checkboxItemProps = {
  option: dropdownInputOptionT
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

  if (isSeparator(value)) return <MenubarSeparator className={className} />

  const label = getLabel(option)
  const disabled = (option as any)?.disabled

  return (
    <MenubarCheckboxItem
      checked={checked}
      disabled={disabled}
      className={className}
      indicatorAt={indicatorAt}
      onCheckedChange={onCheckedChange}
    >
      {label}
    </MenubarCheckboxItem>
  )
}

type radioItemProps = {
  option: dropdownInputOptionT
  className?: string
  indicatorAt?: indicatorAtT
}
function RadioItem({
  option,
  className,
  indicatorAt
}: radioItemProps) {
  const value = getValue(option)

  if (isSeparator(value)) return <MenubarSeparator className={className} />

  const label = getLabel(option)
  const disabled = (option as any)?.disabled

  return (
    <MenubarRadioItem
      value={`${value}`}
      disabled={disabled}
      className={className}
      indicatorAt={indicatorAt}
    >
      {label}
    </MenubarRadioItem>
  )
}

type SubMenuProps = commomClsT & {
  submenu: dropdownSubMenuT
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
    <MenubarSub>
      <MenubarSubTrigger className={submenu.triggerCls}>
        {submenu.submenu}
      </MenubarSubTrigger>

      <MenubarSubContent className={submenu.contentCls}>
        {submenu.options.map((option, i) => {
          if (isDropdownGroup(option)) {
            return (
              <MenubarGroup key={option.group} className={cn(groupCls, option.className)}>
                <MenubarLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                  {option.group}
                </MenubarLabel>

                {option.options.map((grOpt, j) => (
                  <Item
                    key={getKey(grOpt, j)}
                    option={grOpt}
                    className={itemCls}
                    onSelect={() => onSelect?.(getValue(grOpt))}
                  />
                ))}
              </MenubarGroup>
            )
          }

          if (isDropdownSubMenu(option)) {
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
      </MenubarSubContent>
    </MenubarSub>
  )
}

type CheckboxSubMenuProps = commomClsT & commonCheckboxProps & {
  submenu: dropdownInputSubMenuT
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
    <MenubarSub>
      <MenubarSubTrigger className={submenu.triggerCls}>
        {submenu.submenu}
      </MenubarSubTrigger>

      <MenubarSubContent className={submenu.contentCls}>
        {submenu.options.map((option, i) => {
          if (isDropdownInputGroup(option)) {
            return (
              <MenubarGroup key={option.group} className={cn(groupCls, option.className)}>
                <MenubarLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                  {option.group}
                </MenubarLabel>

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
              </MenubarGroup>
            )
          }

          if (isDropdownInputSubMenu(option)) {
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
      </MenubarSubContent>
    </MenubarSub>
  )
}

type RadioSubMenuProps = commomClsT & commonRadioProps & {
  submenu: dropdownInputSubMenuT
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
    <MenubarSub>
      <MenubarSubTrigger className={submenu.triggerCls}>
        {submenu.submenu}
      </MenubarSubTrigger>

      <MenubarSubContent className={submenu.contentCls}>
        <MenubarRadioGroup value={`${value}`} onValueChange={onValueChange}>
          {submenu.options.map((option, i) => {
            if (isDropdownInputGroup(option)) {
              return (
                <MenubarGroup key={option.group} className={cn(groupCls, option.className)}>
                  <MenubarLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                    {option.group}
                  </MenubarLabel>

                  {option.options.map((grOpt, j) => (
                    <RadioItem
                      key={getKey(grOpt, j)}
                      option={grOpt}
                      className={itemCls}
                      indicatorAt={indicatorAt}
                    />
                  ))}
                </MenubarGroup>
              )
            }

            if (isDropdownInputSubMenu(option)) {
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
        </MenubarRadioGroup>
      </MenubarSubContent>
    </MenubarSub>
  )
}

type wrapperInner = commonInner & {
  options: dropdownOptionsT
  onSelect?: (value: allowedPrimitiveT) => void
}
function MenubarWrapperInner({
  trigger,
  options,
  itemCls,
  groupCls,
  groupLabelCls,
  contentProps,
  onSelect
}: wrapperInner) {
  return (
    <MenubarMenu>
      <MenubarTrigger asChild={typeof trigger !== "string"}>
        {trigger}
      </MenubarTrigger>

      <MenubarContent {...contentProps}>
        {options.map((option, i) => {
          if (isDropdownGroup(option)) {
            return (
              <MenubarGroup key={option.group} className={cn(groupCls, option.className)}>
                <MenubarLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                  {option.group}
                </MenubarLabel>

                {option.options.map((grOpt, j) => (
                  <Item
                    key={getKey(grOpt, j)}
                    option={grOpt}
                    className={itemCls}
                    onSelect={() => onSelect?.(getValue(grOpt))}
                  />
                ))}
              </MenubarGroup>
            )
          }

          if (isDropdownSubMenu(option)) {
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
      </MenubarContent>
    </MenubarMenu>
  )
}

type checkboxWrapperInner = commonInner & commonCheckboxProps & {
  options: dropdownInputOptionsT
  label?: string
}
function MenubarCheckboxWrapperInner({
  trigger,
  options,

  label,
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
    setIChecked(prev => !c ? prev.filter(p => p !== v) : [...prev, v])
  }

  const checked = o_checked ?? i_checked
  const onCheckedChange = o_onCheckedChange ?? i_Checked

  return (
    <MenubarMenu>
      <MenubarTrigger asChild={typeof trigger !== "string"}>
        {trigger}
      </MenubarTrigger>

      <MenubarContent {...contentProps}>
        {label && (
          <>
            <MenubarLabel>{label}</MenubarLabel>
            <MenubarSeparator />
          </>
        )}
        {options.map((option, i) => {
          if (isDropdownInputGroup(option)) {
            return (
              <MenubarGroup key={option.group} className={cn(groupCls, option.className)}>
                <MenubarLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                  {option.group}
                </MenubarLabel>

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
              </MenubarGroup>
            )
          }

          if (isDropdownInputSubMenu(option)) {
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
      </MenubarContent>
    </MenubarMenu>
  )
}

type radioWrapperInner = commonInner & commonRadioProps & {
  options: dropdownInputOptionsT
  label?: string
}
function MenubarRadioWrapperInner({
  trigger,
  options,

  label,
  itemCls,
  groupCls,
  groupLabelCls,
  contentProps,

  value: o_value,
  onValueChange: o_onValueChange,

  indicatorAt,
}: radioWrapperInner) {
  const [i_value, setIValue] = useState<allowedPrimitiveT>("")

  const value = o_value ?? i_value
  const onValueChange = o_onValueChange ?? setIValue

  return (
    <MenubarMenu>
      <MenubarTrigger asChild={typeof trigger !== "string"}>
        {trigger}
      </MenubarTrigger>

      <MenubarContent {...contentProps}>
        {label && (
          <>
            <MenubarLabel>{label}</MenubarLabel>
            <MenubarSeparator />
          </>
        )}
        <MenubarRadioGroup value={`${value}`} onValueChange={v => onValueChange(parseAllowedPrimitive(v))}>
          {options.map((option, i) => {
            if (isDropdownInputGroup(option)) {
              return (
                <MenubarGroup key={option.group} className={cn(groupCls, option.className)}>
                  <MenubarLabel className={cn("pb-0.5 text-xs text-muted-foreground font-normal", groupLabelCls, option.groupLabelCls)}>
                    {option.group}
                  </MenubarLabel>

                  {option.options.map((grOpt, j) => (
                    <RadioItem
                      key={getKey(grOpt, j)}
                      option={grOpt}
                      className={itemCls}
                      indicatorAt={indicatorAt}
                    />
                  ))}
                </MenubarGroup>
              )
            }

            if (isDropdownInputSubMenu(option)) {
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
        </MenubarRadioGroup>
      </MenubarContent>
    </MenubarMenu>
  )
}

type wrap = commonWrapT & {
  options: menubarOptionsT
  onSelect?: (value: allowedPrimitiveT) => void
}
function MenubarWrapper({
  options,
  itemCls,
  groupCls,
  groupLabelCls,
  contentProps,
  onSelect,
  ...props
}: wrap) {
  return (
    <Menubar {...props}>
      {
        options.map(op => (
          <MenubarWrapperInner
            key={op.key}
            trigger={op.trigger}
            options={op.options}
            itemCls={cn(itemCls, op.itemCls)}
            groupCls={cn(groupCls, op.groupCls)}
            groupLabelCls={cn(groupLabelCls, op.groupLabelCls)}
            contentProps={{ ...contentProps, ...op?.contentProps }}
            onSelect={op?.onSelect || onSelect}
          />
        ))
      }
    </Menubar>
  )
}

type wrapCheckboxT = commonWrapT & commonCheckboxProps & {
  options: menubarCheckboxOptionsT
}
function MenubarCheckboxWrapper({
  options,

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
      {options.map(op => (
        <MenubarCheckboxWrapperInner
          key={op.key}
          trigger={op.trigger}
          options={op.options}
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

type wrapRadioT = commonWrapT & commonRadioProps & {
  options: menubarRadioOptionsT
}
function MenubarRadioWrapper({
  options,

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
      {options.map(op => (
        <MenubarRadioWrapperInner
          key={op.key}
          trigger={op.trigger}
          options={op.options}
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
  type menubarOptionsT,
  type menubarCheckboxOptionsT,
  type menubarRadioOptionsT,
}