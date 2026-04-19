import { Inbox } from 'lucide-react'

import { EmptyWrapper } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'

export function EmptyExample() {
  return (
    <EmptyWrapper
      title="No Messages"
      description="You haven't received any messages yet. When someone contacts you, they'll show up here."
      media={<Inbox className="size-10 text-muted-foreground" />}
      content={<Button>Compose Message</Button>}
    />
  )
}
