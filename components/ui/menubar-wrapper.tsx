"use client"

import { useState } from "react"
import { cn, getKey, getLabel, getValue, isSeparator, optionTypeChecker, parseAllowedPrimitive } from "@/lib/utils"

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

const isMenubarGroup = optionTypeChecker<dropdownGroupT>("group")
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

  if (isSeparator(value)) return <MenubarSeparator className={className} />

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

type SubMenuProps = {
  submenu: dropdownSubMenuT
  itemCls?: string
  groupCls?: string
  groupLabelCls?: string
  onSelect?: (value: allowedPrimitiveT) => void
}

function SubMenu({ submenu, itemCls, groupCls, groupLabelCls, onSelect }: SubMenuProps) {
  return (
    <MenubarSub>
      <MenubarSubTrigger className={submenu.triggerCls}>
        {submenu.submenu}
      </MenubarSubTrigger>

      <MenubarSubContent className={submenu.contentCls}>
        {submenu.options.map((option, i) => {
          if (isMenubarGroup(option)) {
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
      </MenubarSubContent>
    </MenubarSub>
  )
}

type common = {
  itemCls?: string
  groupCls?: string
  groupLabelCls?: string
  contentProps?: React.ComponentProps<typeof MenubarContent>
  onSelect?: (value: allowedPrimitiveT) => void
}

type innerProps = common & {
  trigger: React.ReactNode
  options: dropdownOptionsT
}

function MenubarWrapperInner({
  trigger,
  options,
  itemCls,
  groupCls,
  groupLabelCls,
  contentProps,
  onSelect
}: innerProps) {
  return (
    <MenubarMenu>
      <MenubarTrigger asChild={typeof trigger !== "string"}>
        {trigger}
      </MenubarTrigger>

      <MenubarContent {...contentProps}>
        {options.map((option, i) => {
          if (isMenubarGroup(option)) {
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
      </MenubarContent>
    </MenubarMenu>
  )
}

type menubarOptionT = common & {
  value: string
  trigger: React.ReactNode
  options: dropdownOptionsT
}

type menubarOptionsT = menubarOptionT[]

type MenubarWrapperProps = common & React.ComponentProps<typeof Menubar> & {
  options: menubarOptionsT
}

function MenubarWrapper({
  options,
  itemCls,
  groupCls,
  groupLabelCls,
  contentProps,
  onSelect,
  ...props
}: MenubarWrapperProps) {
  return (
    <Menubar {...props}>
      {
        options.map(op => (
          <MenubarWrapperInner
            {...op}
            key={op.value}
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

  if (isSeparator(value)) return <MenubarSeparator className={className} />

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
    <MenubarSub>
      <MenubarSubTrigger className={submenu.triggerCls}>
        {submenu.submenu}
      </MenubarSubTrigger>

      <MenubarSubContent className={submenu.contentCls}>
        {submenu.options.map((option, i) => {
          if (isInputGroup(option)) {
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
      </MenubarSubContent>
    </MenubarSub>
  )
}

type common2 = {
  itemCls?: string
  groupCls?: string
  groupLabelCls?: string
  contentProps?: React.ComponentProps<typeof MenubarContent>

  checked?: allowedPrimitiveT[]
  onCheckedChange?: (value: allowedPrimitiveT, checked: boolean) => void

  indicatorAt?: indicatorAtT
}

type inputWrapperProps = common2 & {
  trigger: React.ReactNode
  options: inputOptionsT
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
}: inputWrapperProps) {
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
          if (isInputGroup(option)) {
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
      </MenubarContent>
    </MenubarMenu>
  )
}

type menubarOptionInputT = common2 & {
  value: string
  label?: string
  trigger: React.ReactNode
  options: inputOptionsT
}

type menubarOptionInputsT = menubarOptionInputT[]

type MenubarCheckboxWrapperProps = common2 & React.ComponentProps<typeof Menubar> & {
  options: menubarOptionInputsT
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
}: MenubarCheckboxWrapperProps) {
  return (
    <Menubar {...props}>
      {options.map(op => (
        <MenubarCheckboxWrapperInner
          {...op}
          key={op.value}
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

type RadioItemProps = {
  option: inputOptionT
  className?: string
  indicatorAt?: indicatorAtT
}

function RadioItem({ option, className, indicatorAt }: RadioItemProps) {
  const value = getValue(option)
  const label = getLabel(option)
  const disabled = (option as any)?.disabled

  if (isSeparator(value)) return <MenubarSeparator className={className} />

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
    <MenubarSub>
      <MenubarSubTrigger className={submenu.triggerCls}>
        {submenu.submenu}
      </MenubarSubTrigger>

      <MenubarSubContent className={submenu.contentCls}>
        <MenubarRadioGroup value={`${value}`} onValueChange={onValueChange}>
          {submenu.options.map((option, i) => {
            if (isInputGroup(option)) {
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
        </MenubarRadioGroup>
      </MenubarSubContent>
    </MenubarSub>
  )
}

type common3 = {
  itemCls?: string
  groupCls?: string
  groupLabelCls?: string
  contentProps?: React.ComponentProps<typeof MenubarContent>

  value?: allowedPrimitiveT
  onValueChange?: (value: allowedPrimitiveT) => void

  indicatorAt?: indicatorAtT
}

type inputWrapperProps2 = common3 & {
  trigger: React.ReactNode
  options: inputOptionsT
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
}: inputWrapperProps2) {
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
            if (isInputGroup(option)) {
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
        </MenubarRadioGroup>
      </MenubarContent>
    </MenubarMenu>
  )
}

type menubarOptionInputT2 = common3 & {
  value: string
  label?: string
  trigger: React.ReactNode
  options: inputOptionsT
}

type menubarOptionInputsT2 = menubarOptionInputT2[]

type MenubarRadioWrapperProps = common3 & React.ComponentProps<typeof Menubar> & {
  options: menubarOptionInputsT2
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
}: MenubarRadioWrapperProps) {
  return (
    <Menubar {...props}>
      {options.map(op => (
        <MenubarRadioWrapperInner
          {...op}
          key={op.value}
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
  MenubarRadioWrapper
}