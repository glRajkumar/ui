import { isGroup, isOption, isSeparator } from "@/lib/utils"

const INDENT_SIZE = 2

export const indent = (level: number) => " ".repeat(level * INDENT_SIZE)

export function filterOpt(options: optionsT, components: string[], hasGroupCls: boolean = false) {
  const hasLabelValIcon = components.includes("icon / diff value than label")
  const hasTargetStyle = components.includes("target style")
  const hasSeperator = components.includes("seperator")
  const hasGroup = components.includes("group")

  const opt: any = options.map(o => {
    if (isGroup(o)) {
      if (!hasGroup) return null

      const { className, ...rest } = o
      return {
        ...rest,
        options: filterOpt(o.options, components),
        ...(hasGroupCls && { className }),
      }
    }

    if (isOption(o)) {
      if (!hasLabelValIcon) return null

      const { className, ...rest } = o
      return {
        ...rest,
        ...(hasTargetStyle && { className }),
      }
    }

    if (isSeparator(o)) {
      if (!hasSeperator) return null
      return o
    }

    return o
  }).filter(f => f !== null)

  return opt
}