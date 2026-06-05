import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(_req: Request, props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params

  const contentDir = path.join(process.cwd(), 'content', 'docs')
  const base = path.join(contentDir, ...slug)

  if (!base.startsWith(contentDir)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  let content: string
  try {
    content = await readFile(base + '.mdx', 'utf-8')
  } catch {
    try {
      content = await readFile(path.join(base, 'index.mdx'), 'utf-8')
    } catch {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
  }

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
