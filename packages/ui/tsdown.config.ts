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

export const config = defineConfig({
  entry: [
    '../../components/ui/**/*.{ts,tsx}',
    '../../lib/utils.ts',
    '../../lib/menu.ts',
    '../../hooks/use-mobile.ts',
  ],
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
