import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAllowedPrimitive(value: unknown): value is allowedPrimitiveT {
  return ["string", "number", "boolean"].includes(typeof value)
}

export function parseAllowedPrimitive(value: allowedPrimitiveT): allowedPrimitiveT {
  if (typeof value !== "string") return value

  const trimmed = value.trim()

  if (trimmed === "true") return true
  if (trimmed === "false") return false
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed)

  return trimmed
}

export function optionTypeChecker<T>(key: keyof T) {
  return (option: any): option is T => !!option && typeof option === "object" && key in option
}

export const isSeparator = (item: any) => item === "---"
export const isOption = optionTypeChecker<optionT>("value")
export const isGroup = optionTypeChecker<groupT>("group")

export const getValue = (item: any) => typeof item === "object" ? item.value : item
export const getLabel = (item: any) => typeof item === "object" ? item.label : item

export const extractText = (node: any): string => {
  if (node === null || node === undefined) return ""
  if (isAllowedPrimitive(node)) return String(node)
  if (Array.isArray(node)) return node.map(extractText).join(" ")
  if (node.props?.children) return extractText(node.props.children)
  return ""
}

export const findOptionByValue = (options: optionsT, value: allowedPrimitiveT) => {
  for (const item of options) {
    if (isGroup(item)) {
      const found = item.options.find((opt) => getValue(opt) === value)
      if (found) return found
    } else if (!isSeparator(item) && getValue(item) === value) {
      return item
    }
  }
  return ""
}

export const filteredOptions = (options: optionsT, query: string): optionsT => {
  return options
    .map((item) => {
      if (isGroup(item)) {
        const filtered = item.options.filter((opt) => extractText(getLabel(opt)).toLowerCase().includes(query.toLowerCase()))
        return filtered.length ? { ...item, options: filtered } : null
      }
      if (isSeparator(item)) return item
      return extractText(getLabel(item)).toLowerCase().includes(query.toLowerCase()) ? item : null
    })
    .filter(v => v !== null)
}
