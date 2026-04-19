'use client'

import {
  DynamicCodeBlock as DynamicCodeBlockCore,
  DynamicCodeblockProps,
} from 'fumadocs-ui/components/dynamic-codeblock'

type Props = Omit<DynamicCodeblockProps, 'lang' | 'options'>

export function DynamicCodeBlock({ code, ...rest }: Props) {
  return (
    <DynamicCodeBlockCore
      {...rest}
      code={code}
      lang="tsx"
      options={{
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
      }}
    />
  )
}
