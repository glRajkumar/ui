import path from 'path'
import fs from 'fs'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from './extended/code-block'

type WrapperProps = {
  children: React.ReactNode
  path: string | string[]
}

async function SingleCode({ filePath }: { filePath: string }) {
  const absolute = path.join(process.cwd(), filePath)
  const code = await fs.promises.readFile(absolute, 'utf8')
  return <CodeBlock>{code}</CodeBlock>
}

async function MultiCode({ paths }: { paths: string[] }) {
  const files = await Promise.all(
    paths.map(async filePath => {
      const absolute = path.join(process.cwd(), filePath)
      const code = await fs.promises.readFile(absolute, 'utf8')
      const name = filePath.split('/').pop() ?? filePath
      return { name, code }
    }),
  )

  return (
    <Tabs defaultValue={files[0]?.name}>
      <TabsList>
        {files.map(({ name }) => (
          <TabsTrigger key={name} value={name}>
            {name}
          </TabsTrigger>
        ))}
      </TabsList>
      {files.map(({ name, code }) => (
        <TabsContent key={name} value={name}>
          <CodeBlock>{code}</CodeBlock>
        </TabsContent>
      ))}
    </Tabs>
  )
}

function Wrapper({ children, path: filePath }: WrapperProps) {
  const paths = Array.isArray(filePath) ? filePath : [filePath]
  const isMulti = paths.length > 1

  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <div className="not-prose flex items-center justify-center content-center gap-4 flex-wrap min-h-96 p-4 border rounded-sm shadow">
          {children}
        </div>
      </TabsContent>

      <TabsContent value="code">
        {isMulti ? <MultiCode paths={paths} /> : <SingleCode filePath={paths[0]!} />}
      </TabsContent>
    </Tabs>
  )
}

export default Wrapper
