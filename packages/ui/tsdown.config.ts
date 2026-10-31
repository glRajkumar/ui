import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { defineConfig } from 'tsdown'

const root = path.resolve(import.meta.dirname, '../..')
const globalTypes = ['general.d.ts', 'menu.d.ts']

async function listDts(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(entry => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return listDts(full)
      return entry.name.endsWith('.d.ts') ? [full] : []
    }),
  )
  return nested.flat()
}

// Components use ambient types from root `types/*.d.ts` (kept global for the shadcn registry).
// The package ships them as one module instead and imports them into every emitted declaration,
// so consumers can import them and nothing leaks into their global scope.
async function linkSharedTypes(outDir: string) {
  const typesDir = path.join(outDir, 'types')
  await mkdir(typesDir, { recursive: true })

  const sources = await Promise.all(
    globalTypes.map(file => readFile(path.join(root, 'types', file), 'utf8')),
  )
  const body = sources.join('\n').replace(/^type /gm, 'export type ')
  const names = [...body.matchAll(/^export type (\w+)/gm)].map(match => match[1])

  await writeFile(
    path.join(typesDir, 'index.d.ts'),
    `import type * as React from 'react'\n\n${body}`,
  )
  await writeFile(path.join(typesDir, 'index.js'), 'export {}\n')

  const files = (await listDts(outDir)).filter(file => path.dirname(file) !== typesDir)
  await Promise.all(
    files.map(async file => {
      const content = await readFile(file, 'utf8')
      const used = names.filter(
        name =>
          new RegExp(`\\b${name}\\b`).test(content) &&
          !new RegExp(`^(?:declare )?(?:type|interface) ${name}\\b`, 'm').test(content),
      )
      if (!used.length) return

      let rel = path.relative(path.dirname(file), typesDir).replaceAll('\\', '/')
      if (!rel.startsWith('.')) rel = `./${rel}`
      await writeFile(file, `import type { ${used.join(', ')} } from '${rel}/index.js'\n${content}`)
    }),
  )
}

// npm-only theming: the source (shared with the shadcn registry) stays plain shadcn. At build time these
// files are patched to read app overrides from `configureUI` (src/config.ts). A missing anchor fails the
// build, so upstream edits to these files can't silently drop the override.
const configModule = path.join(import.meta.dirname, 'src/config.ts').replaceAll('\\', '/')

function replaceOnce(file: string, code: string, search: string | RegExp, replace: string) {
  const next = code.replace(search, replace)
  if (next === code) throw new Error(`[npm-patch] anchor not found in ${file}: ${search}`)
  return next
}

function addImport(code: string, name: string) {
  const line = `import { ${name} } from '${configModule}'\n`
  const directive = code.match(/^(['"])use client\1;?\r?\n/)
  return directive ? directive[0] + line + code.slice(directive[0].length) : line + code
}

function patchVariants(file: string, code: string, key: string, name: string) {
  const patched = replaceOnce(
    file,
    code,
    `const ${name} = cva(`,
    `const ${name} = resolveVariants('${key}', () => base_${name})\nconst base_${name} = cva(`,
  )
  return addImport(patched, 'resolveVariants')
}

function patchClass(file: string, code: string, key: string) {
  const anchor = new RegExp(`(data-slot="${key}"[\\s\\S]*?cn\\(\\s*)('[^']*')`)
  return addImport(replaceOnce(file, code, anchor, `$1resolveClass('${key}', $2)`), 'resolveClass')
}

const npmPatches: Record<string, (file: string, code: string) => string> = {
  'components/ui/button.tsx': (file, code) => patchVariants(file, code, 'button', 'buttonVariants'),
  'components/ui/badge.tsx': (file, code) => patchVariants(file, code, 'badge', 'badgeVariants'),
  'components/ui/toggle.tsx': (file, code) => patchVariants(file, code, 'toggle', 'toggleVariants'),
  'components/ui/input.tsx': (file, code) => patchClass(file, code, 'input'),
  'components/ui/textarea.tsx': (file, code) => patchClass(file, code, 'textarea'),
}

const npmPatchPlugin = {
  name: 'glraj-ui-npm-patch',
  async load(id: string) {
    const rel = path.relative(root, id).replaceAll('\\', '/')
    const patch = npmPatches[rel]
    if (!patch) return null
    return patch(rel, await readFile(id, 'utf8'))
  },
}

export const config = defineConfig({
  entry: [
    '../../components/ui/**/*.{ts,tsx}',
    '../../lib/utils.ts',
    '../../lib/menu.ts',
    '../../hooks/use-mobile.ts',
    'src/config.ts',
  ],
  plugins: [npmPatchPlugin],
  format: 'esm',
  platform: 'neutral',
  target: 'es2022',
  unbundle: true,
  root,
  outDir: 'dist',
  clean: true,
  dts: { tsconfig: 'tsconfig.json' },
  alias: { '@': root },
  checks: { moduleLevelDirective: false, pluginTimings: false },
  hooks: {
    'build:done': ctx => linkSharedTypes(ctx.options.outDir),
  },
})

export default config
