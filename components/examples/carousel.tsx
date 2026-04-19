'use client'

import { CarouselWrapper, type carouselItemT } from '@/components/ui/carousel'

function Content({ val }: { val: number }) {
  return (
    <div className="flex items-center justify-center rounded-lg bg-muted p-6 text-2xl font-semibold">
      {val}
    </div>
  )
}
const slides: carouselItemT[] = [
  { content: <Content val={1} /> },
  { content: <Content val={2} /> },
  { content: <Content val={3} /> },
  { content: <Content val={4} /> },
  { content: <Content val={5} /> },
]

export function CarouselExample() {
  return (
    <div className="flex flex-col gap-8">
      <CarouselWrapper items={slides} className="w-full max-w-sm mx-auto" itemCls="basis-1/3" />

      <CarouselWrapper
        items={slides}
        orientation="vertical"
        contentCls="h-24"
        itemCls="h-full"
        className="my-20"
      />

      <CarouselWrapper
        items={slides}
        className="w-full max-w-sm mx-auto"
        showControls={false}
        opts={{ loop: true }}
      />
    </div>
  )
}
