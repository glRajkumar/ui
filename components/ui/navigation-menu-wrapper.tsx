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
      type: "trigger"
      trigger: React.ReactNode
      content: React.ReactNode
      contentProps?: React.ComponentProps<typeof NavigationMenuContent>
    }
    | {
      type: "link"
      item: navLinkItemT
    }
  )
type navMenuItemsT = navMenuItemT[]

function NavLinkItem({ children, className, ...props }: navLinkItemT) {
  return (
    <NavigationMenuLink asChild>
      <Link {...props} className={cn("flex flex-row items-center gap-2", className)}>
        {children}
      </Link>
    </NavigationMenuLink>
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

type NavigationMenuWrapperProps = React.ComponentProps<typeof NavigationMenu> & {
  items: navMenuItemsT
}

function NavigationMenuWrapper({
  items,
  className,
  ...props
}: NavigationMenuWrapperProps) {
  return (
    <NavigationMenu className={className} {...props}>
      <NavigationMenuList>
        {items.map((item) => {
          if (item.type === "link") {
            return (
              <NavigationMenuItem key={item.key} {...item.itemProps}>
                <NavLinkItem {...item.item} className={cn(navigationMenuTriggerStyle(), item?.item?.className)} />
              </NavigationMenuItem>
            )
          }

          return (
            <NavigationMenuItem key={item.key} {...item.itemProps}>
              <NavigationMenuTrigger asChild={typeof item.trigger !== "string"}>
                {item.trigger}
              </NavigationMenuTrigger>

              <NavigationMenuContent {...item.contentProps}>
                {item.content}
              </NavigationMenuContent>
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