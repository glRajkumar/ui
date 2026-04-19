'use client'

import { StarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Toaster, useToast } from '@/components/ui/toast'

function ToastTriggers() {
  const toast = useToast()

  function handlePromise() {
    toast.promise(
      new Promise<{ name: string }>(resolve =>
        setTimeout(() => resolve({ name: 'report.pdf' }), 2000),
      ),
      {
        loading: 'Uploading file...',
        success: data => `${data.name} uploaded successfully.`,
        error: 'Upload failed. Please try again.',
      },
    )
  }

  function handleAction() {
    let id: string
    id = toast.add({
      title: 'File deleted',
      description: 'document.pdf has been removed.',
      actionProps: {
        children: 'Undo',
        onClick: () => {
          toast.close(id)
          toast.success('document.pdf has been restored.')
        },
      },
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.add({ description: 'Notification sent.' })}>
        Default
      </Button>

      <Button variant="outline" onClick={() => toast.success('Changes saved successfully.')}>
        Success
      </Button>

      <Button
        variant="outline"
        onClick={() => toast.error('Something went wrong.', { title: 'Error' })}
      >
        Error
      </Button>

      <Button variant="outline" onClick={() => toast.warning('Your session expires in 5 minutes.')}>
        Warning
      </Button>

      <Button
        variant="outline"
        onClick={() => toast.info('A new version is available.', { title: 'Update' })}
      >
        Info
      </Button>

      <Button variant="outline" onClick={handlePromise}>
        Promise
      </Button>

      <Button variant="outline" onClick={handleAction}>
        With action
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast.success('Custom icon toast.', {
            icon: <StarIcon className="text-yellow-500" />,
            titleCls: 'text-yellow-700',
          })
        }
      >
        Custom icon
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast.error('No icon toast.', {
            icon: null,
            title: 'Silent error',
          })
        }
      >
        No icon
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
