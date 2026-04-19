import { type UseFormReturn } from 'react-hook-form'

import { DynamicCodeBlock } from '../../extended/dynamic-code-block'
import Settings from './settings'

type props = {
  form: UseFormReturn<any>
  after: string
  before: string
  settings: settingObjT
  children: React.ReactNode
}
function Wrapper({ before, after, form, settings, children }: props) {
  return (
    <section className="flex flex-col-reverse gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col h-80 lg:h-[70vh]">
        <div className="mb-0.5 pl-1.5 text-xs font-medium">Before</div>
        <DynamicCodeBlock
          code={before}
          codeblock={{
            allowCopy: false,
            className: 'flex-1 py-1 [&>div]:py-1 [&>div]:max-h-none [&>div]:h-full',
          }}
        />
      </div>

      <div className="flex flex-col h-80 lg:h-[70vh]">
        <div className="mb-0.5 pl-1.5 text-xs font-medium">After</div>
        <DynamicCodeBlock
          code={after}
          codeblock={{
            allowCopy: false,
            className: 'flex-1 py-1 [&>div]:py-1 [&>div]:max-h-none [&>div]:h-full',
          }}
        />
      </div>

      <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:col-span-2 lg:col-span-1 lg:block">
        <div>
          <div className="mb-0.5 pl-1.5 text-xs font-medium">Preview</div>
          <div className="min-h-60 mb-4 flex items-center justify-center p-4 border rounded-xl">
            {children}
          </div>
        </div>

        <div>
          <div className="mb-0.5 pl-1.5 text-xs font-medium">Component Properties</div>
          <Settings settings={settings} form={form} />
        </div>
      </div>
    </section>
  )
}

export default Wrapper
