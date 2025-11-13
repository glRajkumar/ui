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
