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
| `data-table`                                   | `@tanstack/react-table`, `@tanstack/react-virtual` |
| `autocomplete-virtualised`, `combobox-virtualised` | `@tanstack/react-virtual`                     |
| `date-picker`                                  | `@daypicker/react`, `date-fns`                    |
| `carousel`                                     | `embla-carousel-react`                            |
| `field-wrapper-rhf`                            | `react-hook-form`                                 |
| `field-wrapper-tf`                             | `@tanstack/react-form`                            |
| `navigation-menu-wrapper`                      | `next` (uses `next/link`)                         |

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

Shared option types (`itemT`, `groupT`, `itemsT`, `menuItemsT`, …) are global — available without importing once any `@glraj/ui` module is imported.

## Prefer copying the source?

Every component is also available through the shadcn registry:

```bash
npx shadcn@latest add https://ui.glrk.dev/registry/select.json
```
