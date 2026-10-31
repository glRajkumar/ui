import { cn } from '@/lib/utils'

type variantPropsT = {
  variant?: string | null
  size?: string | null
}

type variantFnT = (props?: variantPropsT) => string

// Method syntax keeps these bivariant, so a cva() built with literal variant unions is assignable.
// `base` is the library's own variants fn — use it to extend instead of replace.
type uiConfigT = {
  button?(props: variantPropsT | undefined, base: variantFnT): string
  badge?(props: variantPropsT | undefined, base: variantFnT): string
  toggle?(props: variantPropsT | undefined, base: variantFnT): string
  input?: string | ((base: string) => string)
  textarea?: string | ((base: string) => string)
}

type variantKeyT = 'button' | 'badge' | 'toggle'
type classKeyT = 'input' | 'textarea'

let config: uiConfigT = {}

// Module-level (not React context) so it also reaches server components and the direct
// buttonVariants() calls inside composed components. Call it once per runtime, before render.
function configureUI(next: uiConfigT) {
  config = { ...config, ...next }
}

function resolveVariants<P extends variantPropsT>(
  key: variantKeyT,
  getBase: () => (props?: P) => string,
) {
  return (props?: P) => {
    const custom = config[key]
    if (!custom) return getBase()(props)

    // Instance className is applied after the override, so per-instance classes keep winning.
    const { className, ...variantProps } = (props ?? {}) as P & { className?: string }
    return cn(custom(variantProps, getBase() as variantFnT), className)
  }
}

function resolveClass(key: classKeyT, base: string) {
  const custom = config[key]
  if (custom === undefined) return base
  return typeof custom === 'string' ? custom : custom(base)
}

export { configureUI, resolveVariants, resolveClass, type uiConfigT }
