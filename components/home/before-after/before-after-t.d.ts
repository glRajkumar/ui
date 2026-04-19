type SettingType = 'input' | 'select' | 'switch' | 'checkbox'

type BaseSetting = {
  description?: string
}

type SettingByType = {
  input: BaseSetting & {
    type: 'input'
    default: allowedPrimitiveT
  }
  switch: BaseSetting & {
    type: 'switch'
    default: boolean
  }
  select: BaseSetting & {
    type: 'select'
    default: allowedPrimitiveT
    options: allowedPrimitiveT[]
  }
  checkbox: BaseSetting & {
    type: 'checkbox'
    default: allowedPrimitiveT[]
    options: allowedPrimitiveT[]
  }
}

type settingObjT = {
  [key: string]: SettingByType[SettingType]
}
