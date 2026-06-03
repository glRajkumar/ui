import { Apple } from 'lucide-react'

import { type accordionItemsT } from '@/components/ui/accordion'

export const accordionItems: accordionItemsT = [
  {
    value: 'item-1',
    trigger: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    trigger: 'Is it styled?',
    content: "Yes. It comes with default styles that matches the other components' aesthetic.",
    contentCls: 'bg-red-50 dark:bg-red-900',
  },
  {
    value: 'item-3',
    trigger: (
      <>
        <Apple className="size-4" /> Product Information
      </>
    ),
    content: (
      <div>
        <p>
          Our flagship product combines cutting-edge technology with sleek design. Built with
          premium materials, it offers unparalleled performance and reliability.
        </p>
        <p>
          Key features include advanced processing capabilities, and an intuitive user interface
          designed for both beginners and experts.
        </p>
      </div>
    ),
  },
]
