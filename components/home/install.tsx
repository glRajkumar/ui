import { CodeBlock } from "../extended/code-block"

function Install() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-4">Install</h2>

      <CodeBlock className="sm:w-fit sm:mx-auto" allowCopy={false}>
        npx shadcn@latest add @glrk-ui/card
      </CodeBlock>
    </section>
  )
}

export default Install
