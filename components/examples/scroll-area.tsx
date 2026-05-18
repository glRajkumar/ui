'use client'

import { ExRow, ExItem } from '@/components/examples/common'
import { ScrollAreaWrapper } from '@/components/ui/scroll-area'

const tags = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`)

const prose = `Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line spacing, letter spacing, and adjusting the space between pairs of letters. Typography has long been a vital part of promotional material, advertising, and graphic design, where there is less concern for readability and more concern for overall impact.`

const codeLines = [
  "import { ScrollArea } from '@/components/ui/scroll-area'",
  '',
  'function App() {',
  '  return (',
  '    <ScrollArea className="h-64 w-80 rounded-md border">',
  '      <div className="p-4">',
  '        {Array.from({ length: 50 }).map((_, i) => (',
  '          <div key={i} className="py-1 text-sm">',
  '            Item {i + 1}',
  '          </div>',
  '        ))}',
  '      </div>',
  '    </ScrollArea>',
  '  )',
  '}',
]

const tags2 = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Radix', 'Base UI', 'Zod', 'Prisma', 'tRPC', 'Drizzle', 'Hono', 'Bun', 'Vite', 'Vitest', 'Playwright']

function VerticalExample() {
  return (
    <ScrollAreaWrapper className="h-64 w-56 rounded-md border">
      <div className="p-4">
        {tags.map(tag => (
          <div key={tag} className="py-1 text-sm">
            {tag}
          </div>
        ))}
      </div>
    </ScrollAreaWrapper>
  )
}

function HorizontalExample() {
  return (
    <ScrollAreaWrapper orientation="horizontal" className="w-72 rounded-md border">
      <div className="flex gap-3 p-4">
        {tags2.map(tag => (
          <div
            key={tag}
            className="flex h-16 w-24 shrink-0 items-center justify-center rounded-md border bg-muted text-xs font-medium"
          >
            {tag}
          </div>
        ))}
      </div>
    </ScrollAreaWrapper>
  )
}

function BothExample() {
  return (
    <ScrollAreaWrapper orientation="both" className="h-48 w-72 rounded-md border">
      <div className="p-4" style={{ width: '600px' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="py-1 text-sm whitespace-nowrap">
            Row {i + 1} — {prose.slice(0, 80)}
          </div>
        ))}
      </div>
    </ScrollAreaWrapper>
  )
}

function KeepMountedExample() {
  return (
    <ScrollAreaWrapper keepMounted className="h-32 w-56 rounded-md border">
      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          Scrollbar stays in DOM even when content fits. Useful to prevent layout shift.
        </p>
      </div>
    </ScrollAreaWrapper>
  )
}

function ProseExample() {
  return (
    <ScrollAreaWrapper className="h-40 w-72 rounded-md border">
      <p className="p-4 text-sm leading-relaxed">{prose.repeat(3)}</p>
    </ScrollAreaWrapper>
  )
}

function CodeExample() {
  return (
    <ScrollAreaWrapper className="h-48 w-80 rounded-md border bg-muted">
      <pre className="p-4 text-xs">
        {codeLines.map((line, i) => (
          <div key={i} className="leading-5">
            {line || ' '}
          </div>
        ))}
      </pre>
    </ScrollAreaWrapper>
  )
}

function FadeExample() {
  return (
    <ScrollAreaWrapper
      className="h-48 w-56 rounded-md border"
      viewportCls="[mask-image:linear-gradient(to_bottom,transparent_0,black_2rem,black_calc(100%-2rem),transparent_100%)]"
    >
      <div className="p-4">
        {tags.map(tag => (
          <div key={tag} className="py-1 text-sm">
            {tag}
          </div>
        ))}
      </div>
    </ScrollAreaWrapper>
  )
}

function OverflowThresholdExample() {
  return (
    <ScrollAreaWrapper
      className="h-48 w-56 rounded-md border"
      overflowEdgeThreshold={20}
    >
      <div className="p-4">
        {tags.map(tag => (
          <div key={tag} className="py-1 text-sm">
            {tag}
          </div>
        ))}
      </div>
    </ScrollAreaWrapper>
  )
}

export function ScrollAreaExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Orientation">
        <ExItem label="Vertical — default, scrolls up/down">
          <VerticalExample />
        </ExItem>
        <ExItem label="Horizontal — scrolls left/right">
          <HorizontalExample />
        </ExItem>
        <ExItem label="Both — vertical + horizontal + corner">
          <BothExample />
        </ExItem>
      </ExRow>

      <ExRow label="Content">
        <ExItem label="Prose — long text paragraph">
          <ProseExample />
        </ExItem>
        <ExItem label="Code block — monospace pre content">
          <CodeExample />
        </ExItem>
      </ExRow>

      <ExRow label="Options">
        <ExItem label="keepMounted — scrollbar persists in DOM when not needed">
          <KeepMountedExample />
        </ExItem>
        <ExItem label="Fade — mask-image gradient via viewportCls">
          <FadeExample />
        </ExItem>
        <ExItem label="overflowEdgeThreshold — overflow data attrs fire 20px before edge">
          <OverflowThresholdExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
