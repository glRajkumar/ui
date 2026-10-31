# @glraj/ui

Type-safe, batteries-included wrappers around [shadcn/ui](https://ui.shadcn.com) components built on [Base UI](https://base-ui.com) and Tailwind CSS v4.

Write one line instead of ten: pass an `items` array and get a fully composed Select, Combobox, Menu or form field — while every shadcn primitive stays available for full control.

**[Documentation & live examples →](https://ui.glrk.dev)**

```tsx
import { SelectWrapper } from '@glraj/ui/select'

<SelectWrapper
  placeholder="Pick a fruit"
  items={['Apple', 'Banana', { label: 'Cherry', value: 'cherry' }, { group: 'Citrus', items: ['Lemon', 'Lime'] }]}
  onValueChange={value => console.log(value)}
/>
```

## Features

- **45+ components** — accordion, dialog, sheet, drawer, select, combobox, autocomplete, date & date-time picker, data table (TanStack Table v9, optional virtualisation), menus, toast, sidebar and more.
- **Wrappers + primitives** — every component exports the plain shadcn parts *and* an opinionated `*Wrapper` that composes them from props.
- **One options format** — strings, numbers, `{ label, value }`, groups and separators work the same across Select, Combobox, Radio, Checkbox, Toggle and all menus.
- **Form ready** — field wrappers for React Hook Form (`field-wrapper-rhf`) and TanStack Form (`field-wrapper-tf`), with labels, errors and value conversion handled.
- **Framework-agnostic** — works with Next.js, Vite, Remix, TanStack Start; nothing depends on a router.
- **i18n ready** — every built-in string can be translated through `UIProvider`.
- **Themeable** — shadcn CSS variables for colours, `configureUI` for app-wide component styles, `className` for one-offs.
- **Tree-shakable ESM** — one entry point per component, so you only ship what you import.

## Installation

```bash
npm i @glraj/ui @base-ui/react lucide-react
# or: pnpm add / yarn add / bun add
```

Requires **React 19** and **Tailwind CSS v4**. Some components need extra peer dependencies — install only the ones you use:

| Component | Peer dependencies |
| --- | --- |
| `data-table` | `@tanstack/react-table` (v9), `@tanstack/react-virtual` |
| `autocomplete-virtualised`, `combobox-virtualised` | `@tanstack/react-virtual` |
| `date-picker`, `field-wrapper*` | `@daypicker/react`, `date-fns` |
| `carousel` | `embla-carousel-react` |
| `field-wrapper-rhf` | `react-hook-form` |
| `field-wrapper-tf` | `@tanstack/react-form` |

## Setup

Add the package's styles to your global CSS:

```css
@import "tailwindcss";
@import "tw-animate-css";

/* shadcn theme tokens — skip if your app already defines them */
@import "@glraj/ui/theme.css";

/* lets Tailwind see the package's class names — required */
@import "@glraj/ui/styles.css";
```

> Without `@glraj/ui/styles.css` Tailwind never scans the package and components render unstyled.

## Usage

Import each component from its own entry point:

```tsx
import { Button } from '@glraj/ui/button'
import { DialogWrapper } from '@glraj/ui/dialog'
import { DataTable, useDataTable } from '@glraj/ui/data-table'
import { DatePicker } from '@glraj/ui/date-picker'
import { cn } from '@glraj/ui/utils'
```

Shared types are importable — nothing is added to your global scope:

```ts
import type { itemsT, menuItemsT } from '@glraj/ui/types'
```

Every page on [ui.glrk.dev](https://ui.glrk.dev) shows the props and examples; replace `@/components/ui/<name>` with `@glraj/ui/<name>` in the snippets.

### Forms (React Hook Form)

```tsx
import { useForm } from 'react-hook-form'
import { InputWrapper, SelectWrapper } from '@glraj/ui/field-wrapper-rhf'

function ProfileForm() {
  const { control, handleSubmit } = useForm<{ name: string; country: string }>()

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <InputWrapper name="name" label="Name" control={control} />
      <SelectWrapper name="country" label="Country" control={control} items={['India', 'Japan']} />
    </form>
  )
}
```

## Customising

| What | How |
| --- | --- |
| Colours, radius, fonts, dark mode | shadcn CSS variables (`--primary`, `--radius`, …) |
| App-wide look of `button`, `badge`, `toggle`, `input`, `textarea` | `configureUI` from `@glraj/ui/config` |
| Text & translations | `UIProvider` from `@glraj/ui/ui-provider` |
| Router links in navigation menus | `linkAs` prop |
| One instance | `className` and the `*Cls` / `*Props` props on wrappers |

### App-wide component styles — `configureUI`

Extend or replace the classes of the base components once; everything that renders them (dialog footers, pagination, data-table menus, date picker, …) follows.

```ts
// src/lib/ui-config.ts
import { configureUI } from '@glraj/ui/config'
import { cn } from '@glraj/ui/utils'

configureUI({
  // extend: the library's own variants function arrives as `base`
  button: (props, base) => cn(base(props), props?.size === 'sm' && 'h-8'),
  // extend a class string
  input: base => cn(base, 'px-2.5 text-base md:text-sm'),
  // or replace completely with your own cva() / class string
  // badge: cva('…', { variants: { … } }),
})
```

- Import this file once in every runtime that renders components. **Next.js:** import it in the root `layout.tsx` (server) **and** in a `'use client'` provider.
- Per-instance `className` is merged last, so it always wins.
- Custom variant names (e.g. `variant="brand"`) work at runtime; type them by re-exporting a narrowed alias of the component in your app.

### Text & translations — `UIProvider`

```tsx
'use client'
import { UIProvider } from '@glraj/ui/ui-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider
      text={{
        enterPlaceholder: label => `Saisir ${label}`,
        selectPlaceholder: label => `Choisir ${label}`,
        noItems: 'Aucun résultat',
      }}
    >
      {children}
    </UIProvider>
  )
}
```

### Router links

```tsx
import Link from 'next/link' // or react-router, TanStack Router, …
import { NavigationMenuWrapper } from '@glraj/ui/navigation-menu-wrapper'

<NavigationMenuWrapper linkAs={Link} items={items} />
```

## Prefer copying the source?

Every component is also published to a [shadcn registry](https://ui.shadcn.com/docs/registry) — copy it into your project and edit freely:

```bash
npx shadcn@latest add https://ui.glrk.dev/registry/select.json
```

The registry version is plain shadcn source; `configureUI` is an npm-package feature.

## Upgrading from 0.1

- `data-table` targets TanStack Table v9: `useTable` → `useDataTable`, column types are `AppColumnDef`, read state from `table.state`.
- Option types are no longer global — import them from `@glraj/ui/types` (or keep your own global declarations).
- `CollapsibleTrigger` no longer adds a chevron by default (`CollapsibleWrapper` still does); pass `indicatorAt`.
- `navigation-menu-wrapper` no longer imports `next/link`; pass `linkAs`. The `next` peer dependency is gone.
- `Card` and `Switch` follow current shadcn styles; `Switch` gains a `size` prop.
- `field-wrapper-rhf` wrappers accept every prop of the underlying field and call your own `onChange` / `onBlur` / `onValueChange` after updating the form.
- New: `@glraj/ui/config` (`configureUI`) and `@glraj/ui/ui-provider` (`UIProvider`).

## Links

- Docs: https://ui.glrk.dev
- Source: https://github.com/glRajkumar/ui
- Issues: https://github.com/glRajkumar/ui/issues

## License

MIT
