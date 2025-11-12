
type readOnlyChildren = Readonly<{
  children: React.ReactNode;
}>

type allowedPrimitiveT = string | number | boolean

type optionT = {
  label: string
  value: allowedPrimitiveT
  className?: string
}

type groupT = {
  group: string
  options: (allowedPrimitiveT | optionT)[]
  className?: string
}

type optionsT = (allowedPrimitiveT | optionT | groupT)[]
