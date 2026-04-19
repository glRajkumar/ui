'use client'

import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

import { cn, getKey, isSeparator } from '@/lib/utils'

import { Button } from '@/components/ui/button'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex items-center gap-0.5', className)}
      {...props}
    />
  )
}

function PaginationItem(props: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'> & {
    isActive?: boolean
  }

function PaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? 'outline' : 'ghost'}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? 'page' : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

function PaginationPrevious({
  className,
  text = 'Previous',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('pl-1.5!', className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = 'Next',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('pr-1.5!', className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  )
}

type PaginationWrapperProps = {
  total: number
  page?: number
  wrapperCls?: string
  contentCls?: string
  itemCls?: string
  linkCls?: string
  siblingCount?: number
  onPageChange?: (page: number) => void
}

function PaginationWrapper({
  total,
  page: o_page,
  onPageChange: o_onPageChange,
  siblingCount = 1,
  wrapperCls,
  contentCls,
  itemCls,
  linkCls,
}: PaginationWrapperProps) {
  const [i_page, setIPage] = React.useState(1)

  const page = o_page ?? i_page
  const onPageChange = o_onPageChange ?? setIPage

  const paginationRange = React.useMemo(() => {
    if (total <= 1) return [1]

    const pages: (number | '---')[] = []
    const start = Math.max(2, page - siblingCount)
    const end = Math.min(total - 1, page + siblingCount)

    pages.push(1)

    if (start > 2) pages.push('---')

    for (let i = start; i <= end; i++) pages.push(i)

    if (end < total - 1) pages.push('---')

    if (total > 1) pages.push(total)

    return pages
  }, [page, siblingCount, total])

  return (
    <Pagination className={cn(wrapperCls)}>
      <PaginationContent className={cn(contentCls)}>
        <PaginationItem className={cn(itemCls)}>
          <PaginationPrevious
            href=""
            onClick={() => page > 1 && onPageChange(page - 1)}
            className={cn(linkCls, page === 1 && 'pointer-events-none opacity-50')}
          />
        </PaginationItem>

        {paginationRange.map((p, i) => {
          const key = getKey(p, i)

          if (isSeparator(p)) {
            return (
              <PaginationItem key={key} className={cn(itemCls)}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={key} className={cn(itemCls)}>
              <PaginationLink
                href=""
                onClick={() => onPageChange(p as number)}
                isActive={p === page}
                className={linkCls}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem className={cn(itemCls)}>
          <PaginationNext
            href=""
            onClick={() => page < total && onPageChange(page + 1)}
            className={cn(linkCls, page === total && 'pointer-events-none opacity-50')}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationWrapper,
}
