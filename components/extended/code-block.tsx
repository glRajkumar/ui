import { getHighlighter, hastToJsx } from 'fumadocs-core/highlight';
import * as Base from 'fumadocs-ui/components/codeblock';

import type { BundledLanguage } from 'shiki';

import { cn } from '@/lib/utils';

type props = { children: string } & Base.CodeBlockProps

const highlighter = await getHighlighter('js', {
  langs: ['js', 'ts', 'jsx', 'tsx'],
  themes: ['github-dark', 'github-light'],
});

export async function CodeBlock({ children, title, className, ...rest }: props) {
  const lang = title?.split(".")?.pop() || "tsx"
  await highlighter.loadLanguage(lang as BundledLanguage)
  const hast = highlighter.codeToHast(children, {
    lang,
    defaultColor: false,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  });

  const rendered = hastToJsx(hast, {
    components: {
      pre: Base.Pre,
    },
  });

  return (
    <Base.CodeBlock {...rest} title={title} className={cn('my-0', className)}>
      {rendered}
    </Base.CodeBlock>
  );
}
