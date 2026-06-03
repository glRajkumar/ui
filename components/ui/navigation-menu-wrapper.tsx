'use client'

import Link, { type LinkProps } from 'next/link'

import { cn } from '@/lib/utils'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

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
      triggerProps?: Omit<
        React.ComponentProps<typeof NavigationMenuTrigger>,
        'children' | 'className'
      >
      contentProps?: React.ComponentProps<typeof NavigationMenuContent>
    }
  | navLinkItemT
)

type navMenuItemsT = navMenuItemT[]

function NavLinkItem({ children, className, ...props }: navLinkItemT) {
  return (
    <Link {...props} className={cn('flex items-center gap-2 text-sm', className)}>
      {children}
    </Link>
  )
}

type listWrapperProps = {
  items: navLinkItemsT
  wrapperCls?: string
}

function NavList({ items, wrapperCls }: listWrapperProps) {
  return (
    <ul className={cn(wrapperCls)}>
      {items.map((item, i) => (
        <li key={`${String(item.href)}-${i}`}>
          <NavLinkItem {...item} className={cn(item.className)} />
        </li>
      ))}
    </ul>
  )
}

type wrapperProps = React.ComponentProps<typeof NavigationMenu> & {
  items: navMenuItemsT
  triggerCls?: string
  contentCls?: string
  triggerProps?: Omit<React.ComponentProps<typeof NavigationMenuTrigger>, 'children' | 'className'>
}

function NavigationMenuWrapper({
  items,
  className,
  triggerCls,
  contentCls,
  triggerProps: globalTriggerProps,
  ...props
}: wrapperProps) {
  return (
    <NavigationMenu className={className} {...props}>
      <NavigationMenuList>
        {items.map(itemWrap => {
          const { key, ...item } = itemWrap

          if ('trigger' in item) {
            return (
              <NavigationMenuItem key={key} {...item.itemProps}>
                <NavigationMenuTrigger
                  className={cn(triggerCls, item.triggerCls)}
                  {...globalTriggerProps}
                  {...item.triggerProps}
                >
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

          const {
            itemProps,
            children: linkChildren,
            className: linkCls,
            ...linkProps
          } = item as { itemProps?: React.ComponentProps<typeof NavigationMenuItem> } & navLinkItemT
          return (
            <NavigationMenuItem key={key} {...itemProps}>
              <NavigationMenuLink
                render={<Link {...linkProps} />}
                className={cn(navigationMenuTriggerStyle(), linkCls)}
              >
                {linkChildren}
              </NavigationMenuLink>
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
