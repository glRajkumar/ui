'use client'

import { Button } from '@/components/ui/button'
import { Toaster, useToastManager } from '@/components/ui/toast'

function ToastTriggers() {
  const { add } = useToastManager()

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          add({
            title: 'Event created',
            description: 'Your event has been scheduled.',
          })
        }
      >
        Default
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          add({
            title: 'Saved',
            description: 'All changes saved successfully.',
          })
        }
      >
        With title + description
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          add({
            description: 'Link copied to clipboard.',
          })
        }
      >
        Description only
      </Button>
    </div>
  )
}

export function ToastExample() {
  return (
    <Toaster>
      <ToastTriggers />
    </Toaster>
  )
}
