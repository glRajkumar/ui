import { CSSProperties } from 'react'
import path from 'path'
import fs from 'fs'
import { CodeBlock } from '../extended/code-block'

async function Install() {
  const folderPath = path.join(process.cwd(), 'content/docs/shadcn-wrappers')
  const files = await fs.promises.readdir(folderPath)
  const filtered = files
    .filter(f => f.endsWith('.mdx') && f !== 'index.mdx' && f !== 'meta.json')
    .map(f => f.replace('.mdx', ''))

  return (
    <section>
      <h2 className="mb-4 text-3xl font-bold text-center">Install</h2>

      <div className="w-fit mx-auto flex flex-col sm:flex-row px-6 py-3 rounded-xl shadow border text-center group">
        <div className="shrink-0">npx shadcn@latest add @glrk-ui/</div>

        <div className="h-7 overflow-y-hidden">
          <p
            className="words group-hover:paused"
            style={
              {
                '--steps': filtered.length,
                '--steps-duration': `${filtered.length}s`,
              } as CSSProperties
            }
          >
            {filtered.map(f => (
              <span key={f} className="block p-0 h-7 text-start">
                {f}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="pb-2 text-center">
          <strong className="font-medium">Note:</strong> Before proceeding, make sure you have the
          Shadcn base set up and apply the following updates.
        </p>
        <CodeBlock title="components.json" className="max-w-md mx-auto">
          {`{
  "registries": {
    "@glrk-ui": "https://ui.glrk.dev/registry/{name}.json"
  }
}`}
        </CodeBlock>
      </div>
    </section>
  )
}

export default Install
