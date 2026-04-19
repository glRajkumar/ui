import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc'
import * as Base from 'fumadocs-ui/components/codeblock'

import { cn } from '@/lib/utils'

type props = { children: string } & Base.CodeBlockProps

export function CodeBlock({ children, title, className, ...rest }: props) {
  const lang = title?.split('.')?.pop() || 'tsx'

  return (
    <ServerCodeBlock
      lang={lang}
      code={children}
      codeblock={{
        ...rest,
        title,
        className: cn('my-0', className),
      }}
      components={{
        pre: Base.Pre,
      }}
    />
  )
}
