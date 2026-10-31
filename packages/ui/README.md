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
- **Styles** — `className` / `*Cls` props per instance; target `[data-slot="…"]` in unlayered global CSS to restyle a component app-wide; theme via CSS variables.

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
