import path from "path";
import fs from 'fs';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "./extended/code-block";

type props = {
  children: React.ReactNode
  path: string
}

async function Code({ path: filePath }: { path: string }) {
  const absolute = path.join(process.cwd(), filePath)
  const code = await fs.promises.readFile(absolute, "utf8")

  return <CodeBlock>{code}</CodeBlock>
}

function Wrapper({ children, path: filePath }: props) {
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
        <Code path={filePath} />
      </TabsContent>
    </Tabs>
  )
}

export default Wrapper
