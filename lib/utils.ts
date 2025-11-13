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

export const isGroup = (item: allowedPrimitiveT | optionT | groupT): item is groupT => {
  return !!item && typeof item === "object" && "group" in item
}

export const isOption = (item: allowedPrimitiveT | optionT): item is optionT => {
  return !!item && typeof item === "object" && "value" in item
}

export const isSeparator = (item: allowedPrimitiveT | optionT) => item === "---"

export const getValue = (item: allowedPrimitiveT | optionT) => isOption(item) ? item.value : item
export const getLabel = (item: allowedPrimitiveT | optionT) => isOption(item) ? item.label : item

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
