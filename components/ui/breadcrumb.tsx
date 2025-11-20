import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

type breadcrumbItemT = string | {
  label: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

type breadcrumbItemsT = breadcrumbItemT[]

type base = {
  itemCls?: string
  linkCls?: string
  pageCls?: string
}

type listBase = base & {
  separator?: React.ReactNode
  separatorCls?: string
}

type itemProps = base & {
  item: breadcrumbItemT
  isLast: boolean
}
function Item({
  item: itemObj,
  isLast,
  itemCls,
  linkCls,
  pageCls,
}: itemProps) {
  const item = typeof itemObj === "string" ? { label: itemObj } : itemObj

  return (
    <BreadcrumbItem className={cn(itemCls, item?.className)}>
      {isLast
        ? <BreadcrumbPage className={pageCls}>{item?.label}</BreadcrumbPage>
        : Object?.keys(item)?.length > 2
          ? <BreadcrumbLink
            {...item}
            className={cn("cursor-pointer", linkCls)}
          >
            {item?.label}
          </BreadcrumbLink>
          : <span className={linkCls}>{item?.label}</span>
      }
    </BreadcrumbItem>
  )
}

type fullItemsProps = listBase & {
  items: breadcrumbItemsT
}
function BreadcrumbFullItems({
  items,
  separator,
  separatorCls,
  ...rest
}: fullItemsProps) {
  return items.map((item, index) => {
    const isLast = index === items.length - 1

    return (
      <React.Fragment key={index}>
        <Item
          item={item}
          isLast={isLast}
          {...rest}
        />
        {!isLast && (
          <BreadcrumbSeparator className={separatorCls}>
            {separator}
          </BreadcrumbSeparator>
        )}
      </React.Fragment>
    )
  })
}

type dropdownProps = listBase & {
  hiddenItems: breadcrumbItemsT
  dropdownCls?: string
}
function BreadcrumbDropdown({
  hiddenItems,
  dropdownCls,
}: dropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BreadcrumbEllipsis />
      </DropdownMenuTrigger>

      <DropdownMenuContent className={dropdownCls}>
        {hiddenItems.map((itemObj, index) => {
          const item = typeof itemObj === "string" ? { label: itemObj } : itemObj
          return (
            <DropdownMenuItem asChild key={`hidden-${index}`}>
              {item?.href ? (
                <a href={item?.href} className="w-full">{item?.label}</a>
              ) : item?.onClick ? (
                <button onClick={item?.onClick} className="w-full text-left">
                  {item?.label}
                </button>
              ) : (
                <span>{item?.label}</span>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type wrapperProps = listBase & {
  items: breadcrumbItemsT
  maxItems?: number
  itemsBeforeCollapse?: number
  itemsAfterCollapse?: number
  collapseType?: "ellipsis" | "dropdown"
  containerCls?: string
  dropdownCls?: string
  listCls?: string
}
function BreadcrumbWrapper({
  items,
  maxItems = 4,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  collapseType = "ellipsis",
  containerCls,
  listCls,
  dropdownCls,
  separator,
  separatorCls,
  ...rest
}: wrapperProps) {
  const shouldCollapse = maxItems && items.length > maxItems

  if (!shouldCollapse) {
    return (
      <Breadcrumb className={containerCls}>
        <BreadcrumbList className={listCls}>
          <BreadcrumbFullItems
            items={items}
            separator={separator}
            separatorCls={separatorCls}
            {...rest}
          />
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  const startItems = items.slice(0, itemsBeforeCollapse)
  const endItems = items.slice(-itemsAfterCollapse)
  const hiddenItems = items.slice(itemsBeforeCollapse, -itemsAfterCollapse)

  return (
    <Breadcrumb className={containerCls}>
      <BreadcrumbList className={listCls}>
        {startItems.map((item, index) => (
          <React.Fragment key={`start-${index}`}>
            <Item
              item={item}
              isLast={false}
              {...rest}
            />
            <BreadcrumbSeparator className={separatorCls}>
              {separator}
            </BreadcrumbSeparator>
          </React.Fragment>
        ))}

        <BreadcrumbItem>
          {
            collapseType === "ellipsis"
              ? <BreadcrumbEllipsis />
              : <BreadcrumbDropdown
                hiddenItems={hiddenItems}
                dropdownCls={dropdownCls}
              />
          }
        </BreadcrumbItem>

        {endItems.map((item, index) => {
          const isLast = index === endItems.length - 1

          return (
            <React.Fragment key={`end-${index}`}>
              <BreadcrumbSeparator className={separatorCls}>
                {separator}
              </BreadcrumbSeparator>
              <Item
                item={item}
                isLast={isLast}
                {...rest}
              />
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbWrapper,
  type breadcrumbItemT,
  type breadcrumbItemsT,
}
