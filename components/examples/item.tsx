import { type itemsT, ItemGroupWrapper, ItemWrapper } from '@/components/ui/item'
import { Button } from '@/components/ui/button'

export function ItemExample() {
  const items: itemsT = [
    {
      header: 'Product',
      title: 'Wireless Headphones',
      description: 'Noise-cancelling over-ear headphones with long battery life.',
      content: 'Perfect for work, travel, and everyday listening. Supports fast charging.',
      actions: <Button size="sm">Buy Now</Button>,
      footer: 'Updated 2 days ago',
      itemProps: { variant: 'outline' },
    },
    {
      title: 'Smart Watch',
      description: 'Track your fitness, heart rate and notifications.',
      actions: (
        <Button variant="outline" size="sm">
          View Details
        </Button>
      ),
      footer: 'In Stock',
      itemProps: { variant: 'muted' },
    },
  ]

  return (
    <>
      <ItemGroupWrapper items={items} />

      <ItemWrapper
        header="Product"
        title="Wireless Headphones"
        description="Noise-cancelling over-ear headphones with long battery life."
        content="Perfect for work, travel, and everyday listening. Supports fast charging."
        actions={<Button size="sm">Buy Now</Button>}
        footer="Updated 2 days ago"
      />
    </>
  )
}
