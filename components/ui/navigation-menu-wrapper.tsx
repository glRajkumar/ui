"use client"

import Link, { type LinkProps } from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

type navLinkItemT = LinkProps & {
  children: React.ReactNode
  className?: string
}
type navLinkItemsT = navLinkItemT[]

type navMenuItemT = {
  key: string
  itemProps?: React.ComponentProps<typeof NavigationMenuItem>
} & (
    | {
      trigger: React.ReactNode
      content: React.ReactNode
      triggerCls?: string
      contentCls?: string
      contentProps?: React.ComponentProps<typeof NavigationMenuContent>
    }
    | navLinkItemT
  )

type navMenuItemsT = navMenuItemT[]

function NavLinkItem({ children, className, ...props }: navLinkItemT) {
  return (
    <NavigationMenuLink
      render={
        <Link {...props} className={cn("flex flex-row items-center gap-2", className)}>
          {children}
        </Link>
      }
    />
  )
}

type listWrapperProps = {
  items: navLinkItemsT
  wrapperCls?: string
}

function NavList({ items, wrapperCls }: listWrapperProps) {
  return (
    <ul className={wrapperCls}>
      {items.map((item, i) => (
        <li key={i}>
          <NavLinkItem
            {...item}
            className={item.className}
          />
        </li>
      ))}
    </ul>
  )
}

type wrapperProps = React.ComponentProps<typeof NavigationMenu> & {
  items: navMenuItemsT
  triggerCls?: string
  contentCls?: string
}

function NavigationMenuWrapper({
  items,
  className,
  triggerCls,
  contentCls,
  ...props
}: wrapperProps) {
  return (
    <NavigationMenu className={className} {...props}>
      <NavigationMenuList>
        {items.map(itemWrap => {
          const { key, ...item } = itemWrap
          if ("trigger" in item) {
            return (
              <NavigationMenuItem key={key} {...item.itemProps}>
                <NavigationMenuTrigger className={cn(triggerCls, item.triggerCls)}>
                  {item.trigger}
                </NavigationMenuTrigger>

                <NavigationMenuContent
                  {...item.contentProps}
                  className={cn(contentCls, item.contentCls)}
                >
                  {item.content}
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          return (
            <NavigationMenuItem key={key} {...item.itemProps}>
              <NavLinkItem
                {...item}
                className={cn(navigationMenuTriggerStyle(), item?.className)}
              />
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export {
  NavList,
  NavLinkItem,
  NavigationMenuWrapper,
  type navMenuItemT,
  type navMenuItemsT,
  type navLinkItemT,
  type navLinkItemsT,
}