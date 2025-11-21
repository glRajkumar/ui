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

type dropdownInputOptionT = allowedPrimitiveT | optionT | (optionT & {
  disabled?: boolean
})

type dropdownInputGroupT = {
  group: string
  options: dropdownInputOptionT[]
  className?: string
  groupLabelCls?: string
}

type dropdownInputSubMenuT = {
  submenu: string
  options: (dropdownInputOptionT | dropdownInputGroupT)[]
  triggerCls?: string
  contentCls?: string
}

type dropdownInputOptionsT = (dropdownInputOptionT | dropdownInputGroupT | dropdownInputSubMenuT)[]
