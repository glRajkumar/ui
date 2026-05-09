import { CollapsibleExample } from './collapsible'
import { NavigationMenuExample } from './navigation-menu'
import { ToggleGroupExample } from './toggle-group'
import { AlertDialogExample } from './alert-dialog'
import { BreadcrumbExample } from './breadcrumb'
import { PaginationExample } from './pagination'
import { Field_RHF_Example } from './field-rhf'
import { Field_TF_Example } from './field-tf'
import { DataTableExample } from './data-table'
import { AccordionExample } from './accordion'
import { DropdownExample } from './dropdown-menu'
import { CarouselExample } from './carousel'
import { ComboboxExample } from './combobox'
import { ContextExample } from './context-menu'
import { TooltipExample } from './tooltip'
import { MenubarExample } from './menubar'
import { PopoverExample } from './popover'
import { SelectExample } from './select'
import { DialogExample } from './dialog'
import { DrawerExample } from './drawer'
import { SheetExample } from './sheet'
import { ToastExample } from './toast'
import { EmptyExample } from './empty'
import { FieldExample } from './field'
import { CardExample } from './card'
import { TabsExample } from './tabs'
import { ItemExample } from './item'
import Wrapper from '../wrapper'

export function SelectEx() {
  return (
    <Wrapper path="/components/examples/select.tsx">
      <SelectExample />
    </Wrapper>
  )
}

export function ComboboxEx() {
  return (
    <Wrapper path="/components/examples/combobox.tsx">
      <ComboboxExample />
    </Wrapper>
  )
}

export function DropdownEx() {
  return (
    <Wrapper path="/components/examples/dropdown-menu.tsx">
      <DropdownExample />
    </Wrapper>
  )
}

export function CollapsibleEx() {
  return (
    <Wrapper path="/components/examples/collapsible.tsx">
      <CollapsibleExample />
    </Wrapper>
  )
}

export function AccordionEx() {
  return (
    <Wrapper
      path={[
        '/components/examples/accordion.tsx',
        '/components/examples/data/accordion-items.tsx',
      ]}
    >
      <AccordionExample />
    </Wrapper>
  )
}

export function AlertDialogEx() {
  return (
    <Wrapper
      path={[
        '/components/examples/alert-dialog/index.tsx',
        '/components/examples/alert-dialog/basic.tsx',
        '/components/examples/alert-dialog/controlled.tsx',
        '/components/examples/alert-dialog/detached.tsx',
        '/components/examples/alert-dialog/async-action.tsx',
      ]}
    >
      <AlertDialogExample />
    </Wrapper>
  )
}

export function CardEx() {
  return (
    <Wrapper path="/components/examples/card.tsx">
      <CardExample />
    </Wrapper>
  )
}

export function DialogEx() {
  return (
    <Wrapper
      path={[
        '/components/examples/dialog/index.tsx',
        '/components/examples/dialog/basic.tsx',
        '/components/examples/dialog/triggers.tsx',
        '/components/examples/dialog/controlled.tsx',
        '/components/examples/dialog/advanced.tsx',
      ]}
    >
      <DialogExample />
    </Wrapper>
  )
}

export function DrawerEx() {
  return (
    <Wrapper
      path={[
        '/components/examples/drawer/index.tsx',
        '/components/examples/drawer/basic.tsx',
        '/components/examples/drawer/advanced.tsx',
        '/components/examples/drawer/controlled.tsx',
      ]}
    >
      <DrawerExample />
    </Wrapper>
  )
}

export function SheetEx() {
  return (
    <Wrapper
      path={[
        '/components/examples/sheet/index.tsx',
        '/components/examples/sheet/basic.tsx',
        '/components/examples/sheet/advanced.tsx',
        '/components/examples/sheet/controlled.tsx',
      ]}
    >
      <SheetExample />
    </Wrapper>
  )
}

export function TooltipEx() {
  return (
    <Wrapper path="/components/examples/tooltip.tsx">
      <TooltipExample />
    </Wrapper>
  )
}

export function TabsEx() {
  return (
    <Wrapper path="/components/examples/tabs.tsx">
      <TabsExample />
    </Wrapper>
  )
}

export function ToggleGroupEx() {
  return (
    <Wrapper path="/components/examples/toggle-group.tsx">
      <ToggleGroupExample />
    </Wrapper>
  )
}

export function DataTableEx() {
  return (
    <Wrapper path="/components/examples/data-table.tsx">
      <DataTableExample />
    </Wrapper>
  )
}

export function BreadcrumbEx() {
  return (
    <Wrapper path="/components/examples/breadcrumb.tsx">
      <BreadcrumbExample />
    </Wrapper>
  )
}

export function MenubarEx() {
  return (
    <Wrapper path="/components/examples/menubar.tsx">
      <MenubarExample />
    </Wrapper>
  )
}

export function ContextMenuEx() {
  return (
    <Wrapper path="/components/examples/context-menu.tsx">
      <ContextExample />
    </Wrapper>
  )
}

export function NavigationMenuEx() {
  return (
    <Wrapper path="/components/examples/navigation-menu.tsx">
      <NavigationMenuExample />
    </Wrapper>
  )
}

export function PopoverEx() {
  return (
    <Wrapper path="/components/examples/popover.tsx">
      <PopoverExample />
    </Wrapper>
  )
}

export function ItemEx() {
  return (
    <Wrapper path="/components/examples/item.tsx">
      <ItemExample />
    </Wrapper>
  )
}

export function EmptyEx() {
  return (
    <Wrapper path="/components/examples/empty.tsx">
      <EmptyExample />
    </Wrapper>
  )
}

export function PaginationEx() {
  return (
    <Wrapper path="/components/examples/pagination.tsx">
      <PaginationExample />
    </Wrapper>
  )
}

export function FieldEx() {
  return (
    <Wrapper path="/components/examples/field.tsx">
      <FieldExample />
    </Wrapper>
  )
}

export function Field_RHF_Ex() {
  return (
    <Wrapper path="/components/examples/field-rhf.tsx">
      <Field_RHF_Example />
    </Wrapper>
  )
}

export function Field_TF_Ex() {
  return (
    <Wrapper path="/components/examples/field-tf.tsx">
      <Field_TF_Example />
    </Wrapper>
  )
}

export function CarouselEx() {
  return (
    <Wrapper path="/components/examples/carousel.tsx">
      <CarouselExample />
    </Wrapper>
  )
}

export function ToastEx() {
  return (
    <Wrapper path="/components/examples/toast.tsx">
      <ToastExample />
    </Wrapper>
  )
}
