# @glraj/ui

Opinionated, type-safe wrappers around [shadcn/ui](https://ui.shadcn.com) components built on [Base UI](https://base-ui.com).

Docs: https://ui.glrk.dev

## Install

```bash
pnpm add @glraj/ui @base-ui/react lucide-react
```

Some components need extra peer dependencies — install only what you use:

| Component                                      | Peer dependencies                                 |
| ---------------------------------------------- | ------------------------------------------------- |
| `data-table`                                   | `@tanstack/react-table` (v9), `@tanstack/react-virtual` |
| `autocomplete-virtualised`, `combobox-virtualised` | `@tanstack/react-virtual`                     |
| `date-picker`                                  | `@daypicker/react`, `date-fns`                    |
| `carousel`                                     | `embla-carousel-react`                            |
| `field-wrapper-rhf`                            | `react-hook-form`                                 |
| `field-wrapper-tf`                             | `@tanstack/react-form`                            |

## Styles (Tailwind CSS v4)

```css
@import "tailwindcss";
@import "tw-animate-css";

/* shadcn theme tokens — skip if your app already defines them */
@import "@glraj/ui/theme.css";

/* lets Tailwind scan the package's classes */
@import "@glraj/ui/styles.css";
```

## Usage

```tsx
import { Button } from '@glraj/ui/button'
import { SelectWrapper } from '@glraj/ui/select'
import { DataTable } from '@glraj/ui/data-table'
import { cn } from '@glraj/ui/utils'
```

Each component has its own entry point (`@glraj/ui/<name>`), so you only bundle what you import.

Shared option types are exported from `@glraj/ui/types` — nothing is added to your global scope:

```tsx
import type { itemsT, menuItemsT } from '@glraj/ui/types'
```

## Customising

- **Text / i18n** — wrap your app in `UIProvider` from `@glraj/ui/ui-provider` and override any default string (placeholders, empty / loading states, pagination, aria labels). Component props still win.
- **Links** — `NavigationMenuWrapper`, `NavList` and `NavLinkItem` render `<a>` by default; pass `linkAs={Link}` from your router.
- **Styles** — theme via CSS variables; restyle `button`, `badge`, `toggle`, `input`, `textarea` app-wide with `configureUI` (below); per instance with `className` / `*Cls` props.

### App-wide component styles (`configureUI`)

`Button`, `Badge` and `Toggle` take their classes from a `cva()` function, `Input` and `Textarea` from a class string. Replace them once — every component that renders them (dialog footers, pagination, data-table menus, date picker, …) follows:

```ts
// src/lib/ui-config.ts
import { cva } from 'class-variance-authority'
import { configureUI } from '@glraj/ui/config'

configureUI({
  button: cva('inline-flex items-center justify-center rounded-md text-sm font-medium …', {
    variants: {
      variant: { default: 'bg-primary text-primary-foreground hover:bg-primary/80', brand: 'bg-pink-600 text-white' },
      size: { default: 'h-9 px-2.5', sm: 'h-8 px-2.5' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }),
  input: base => `${base} px-2.5 text-base md:text-sm`, // or a full string to replace it
})
```

- Replace (pass a `cva`) or extend — the library's own function / class string arrives as `base`:
  `button: (props, base) => cn(base(props), props?.variant === 'brand' && 'bg-pink-600 text-white')`.
  Don't call the exported `buttonVariants` inside the override: it already routes through `configureUI`.
- It is module-level state, not React context: import the file once from every runtime that renders components. In Next.js import it from the root `layout.tsx` (server) **and** from a `'use client'` provider (client/SSR).
- Per-instance `className` still wins — it is merged last.
- New variant names (`brand`) work at runtime; to type them, re-export a narrowed alias in your app:
  ```ts
  import { Button as UIButton } from '@glraj/ui/button'
  export const Button = UIButton as (
    props: Omit<React.ComponentProps<typeof UIButton>, 'variant'> & {
      variant?: React.ComponentProps<typeof UIButton>['variant'] | 'brand'
    },
  ) => React.JSX.Element
  ```

The shadcn-registry (copy-paste) version is plain shadcn source with none of this — edit the files directly.

## Upgrading from 0.1

- `data-table` targets TanStack Table v9: `useTable` → `useDataTable`, column types are `AppColumnDef`, read state from `table.state`.
- Option types are no longer global — import them from `@glraj/ui/types` (or keep your own global declarations).
- `CollapsibleTrigger` no longer adds a chevron by default (`CollapsibleWrapper` still does); pass `indicatorAt`.
- `navigation-menu-wrapper` no longer imports `next/link`; pass `linkAs`.
- `Button`, `Input`, `Textarea`, `Card`, `Switch` follow current shadcn styles; `Switch` gains `size`.
- `field-wrapper-rhf` wrappers accept every prop of the underlying field and call your own `onChange` / `onBlur` / `onValueChange` after updating the form.

## Prefer copying the source?

Every component is also available through the shadcn registry:

```bash
npx shadcn@latest add https://ui.glrk.dev/registry/select.json
```
