# Glrk UI

Type-safe, developer-friendly wrappers around [shadcn/ui](https://ui.shadcn.com) components built on [Base UI](https://base-ui.com) and Tailwind CSS v4.

**Docs & live examples: https://ui.glrk.dev**

## Features

- **Consistent API** — one item format across Select, Combobox, Autocomplete, Radio, Checkbox, Toggle and all menus
- **Wrappers + primitives** — opinionated `*Wrapper` components plus the plain shadcn parts for full control
- **Form ready** — field wrappers for React Hook Form and TanStack Form
- **Framework-agnostic** — nothing depends on Next.js; router links are passed in
- **i18n ready** — every built-in string can be translated through `UIProvider`

## Use the components

Two ways — see [Getting Started](https://ui.glrk.dev/docs/shadcn-wrappers) for the comparison.

**shadcn registry** — copy the source into your project ([setup](https://ui.glrk.dev/docs/shadcn-wrappers/registry)):

```bash
npx shadcn@latest add @glrk-ui/select
```

**npm package** — install [`@glraj/ui`](https://www.npmjs.com/package/@glraj/ui) as a dependency ([setup](https://ui.glrk.dev/docs/shadcn-wrappers/npm)):

```bash
npm i @glraj/ui @base-ui/react lucide-react
```

## Develop locally

```bash
git clone https://github.com/glRajkumar/ui.git
cd ui
pnpm install
pnpm dev               # docs site at http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `pnpm dev` / `pnpm build` | run / build the docs site |
| `pnpm registry:build` | build the shadcn registry into `public/registry/` |
| `pnpm ui:build` | build the npm package (`packages/ui`) |
| `pnpm build:all` | package + registry + docs |
| `pnpm lint` / `pnpm format` | Biome |

Component source lives in `components/ui/`; docs in `content/docs/`; the npm package build in `packages/ui/`.
