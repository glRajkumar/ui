import { PopoverWrapper } from '@/components/ui/popover'

export function PopoverExample() {
  return (
    <PopoverWrapper
      trigger="Hover"
      triggerCls="px-4 py-1.5 border rounded"
      content="Some tooltip description"
    />
  )
}
