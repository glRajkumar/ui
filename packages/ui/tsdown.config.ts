import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
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

// Components rely on ambient types from root `types/*.d.ts` (kept global for the shadcn registry).
// Ship them in dist and reference them from every emitted declaration so consumers resolve them.
async function linkGlobalTypes(outDir: string) {
  const typesDir = path.join(outDir, 'types')
  await mkdir(typesDir, { recursive: true })
  await Promise.all(
    globalTypes.map(file => copyFile(path.join(root, 'types', file), path.join(typesDir, file))),
  )

  const files = (await listDts(outDir)).filter(file => path.dirname(file) !== typesDir)
  await Promise.all(
    files.map(async file => {
      const rel = path.relative(path.dirname(file), typesDir).replaceAll('\\', '/')
      const refs = globalTypes.map(t => `/// <reference path="${rel}/${t}" />`).join('\n')
      const content = await readFile(file, 'utf8')
      await writeFile(file, `${refs}\n${content}`)
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
    'build:done': ctx => linkGlobalTypes(ctx.options.outDir),
  },
})

export default config
