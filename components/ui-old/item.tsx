import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui-old/separator"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type itemDivProps = React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }
function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: itemDivProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type itemMediaProps = React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>
function ItemMedia({
  className,
  variant = "default",
  ...props
}: itemMediaProps) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

type commonCls = {
  itemWrapperCls?: string
  headerCls?: string
  titleCls?: string
  mediaCls?: string
  descriptionCls?: string
  contentCls?: string
  actionsCls?: string
  footerCls?: string
  itemProps?: Omit<itemDivProps, "className">
  itemMediaProps?: Omit<itemMediaProps, "className">
}

type itemT = commonCls & {
  header?: React.ReactNode
  title?: React.ReactNode
  media?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
}

type itemsT = itemT[]

function ItemWrapper({
  title, description, actions, content, footer, media, header,
  itemWrapperCls, headerCls, titleCls, descriptionCls,
  contentCls, mediaCls, actionsCls, footerCls,
  itemProps, itemMediaProps,
}: itemT) {
  return (
    <Item {...itemProps} className={itemWrapperCls}>
      {media && <ItemMedia {...itemMediaProps} className={mediaCls}>{media}</ItemMedia>}

      {header && <ItemHeader className={headerCls}>{header}</ItemHeader>}

      {
        (title || description || content) &&
        <ItemContent className={contentCls}>
          {title && <ItemTitle className={titleCls}>{title}</ItemTitle>}
          {description && <ItemDescription className={descriptionCls}>{description}</ItemDescription>}
          {content}
        </ItemContent>
      }

      {actions && <ItemActions className={actionsCls}>{actions}</ItemActions>}

      {footer && <ItemFooter className={footerCls}>{footer}</ItemFooter>}
    </Item>
  )
}

type itemGroupProps = commonCls & {
  wrapperCls?: string
  items: itemsT
}

function ItemGroupWrapper({
  wrapperCls,
  items,
  itemWrapperCls,
  headerCls,
  titleCls,
  descriptionCls,
  contentCls,
  mediaCls,
  actionsCls,
  footerCls,
  itemProps,
  itemMediaProps,
}: itemGroupProps) {
  return (
    <ItemGroup className={wrapperCls}>
      {items.map((item, i) => (
        <ItemWrapper
          key={i}
          {...item}
          itemWrapperCls={cn(itemWrapperCls, item.itemWrapperCls)}
          headerCls={cn(headerCls, item.headerCls)}
          titleCls={cn(titleCls, item.titleCls)}
          descriptionCls={cn(descriptionCls, item.descriptionCls)}
          contentCls={cn(contentCls, item.contentCls)}
          mediaCls={cn(mediaCls, item.mediaCls)}
          actionsCls={cn(actionsCls, item.actionsCls)}
          footerCls={cn(footerCls, item.footerCls)}
          itemProps={{ ...itemProps, ...item.itemProps }}
          itemMediaProps={{ ...itemMediaProps, ...item.itemMediaProps }}
        />
      ))}
    </ItemGroup>
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
  ItemWrapper,
  ItemGroupWrapper,
  type itemT,
  type itemsT,
}
