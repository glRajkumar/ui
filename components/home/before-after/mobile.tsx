import { CodeBlock } from "@/components/extended/code-block";

type props = {
  after: string
  before: string
}
function Mobile({ after, before }: props) {
  return (
    <>
      <div>
        <div className="mb-0.5 pl-1.5 text-xs font-medium">Before</div>
        <CodeBlock allowCopy={false} className="py-2">
          {before}
        </CodeBlock>
      </div>

      <div className="mb-0.5 pl-1.5 text-xs font-medium">
        <div>After</div>
        <CodeBlock allowCopy={false} className="py-2">
          {after}
        </CodeBlock>
      </div>
    </>
  )
}

export default Mobile
