import { type NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!pathname.endsWith('.md')) return NextResponse.next()

  const slug = pathname.slice('/docs/'.length, -'.md'.length)
  return NextResponse.rewrite(new URL(`/api/docs-md/${slug}`, req.url))
}

export const config = {
  matcher: '/docs/:path*',
}
