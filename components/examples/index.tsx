import { FieldPrimitivesExample } from './field-primitives'
import { NavigationMenuExample } from './navigation-menu'
import { AutocompleteExample } from './autocomplete'
import { ToggleGroupExample } from './toggle-group'
import { AlertDialogExample } from './alert-dialog'
import { CollapsibleExample } from './collapsible'
import { NumberFieldExample } from './number-field'
import { BreadcrumbExample } from './breadcrumb'
import { ScrollAreaExample } from './scroll-area'
import { PaginationExample } from './pagination'
import { Field_RHF_Example } from './field-rhf'
import { Field_TF_Example } from './field-tf'
import { DataTableExample } from './data-table'
import { AccordionExample } from './accordion'
import { CarouselExample } from './carousel'
import { ComboboxExample } from './combobox'
import { FieldSetExample } from './fieldset'
import { CheckboxExample } from './checkbox'
import { ContextExample } from './context-menu'
import { TooltipExample } from './tooltip'
import { MenubarExample } from './menubar'
import { PopoverExample } from './popover'
import { SelectExample } from './select'
import { DialogExample } from './dialog'
import { DrawerExample } from './drawer'
import { RadioExample } from './radio'
import { SheetExample } from './sheet'
import { ToastExample } from './toast'
import { EmptyExample } from './empty'
import { FieldExample } from './field'
import { MenuExample } from './menu'
import { CardExample } from './card'
import { TabsExample } from './tabs'
import { ItemExample } from './item'
import { FormExample } from './form'
import Wrapper from '../wrapper'

export function SelectEx() {
  return (
    <Wrapper
      path={[
        '/components/examples/select/index.tsx',
        '/components/examples/select/basic.tsx',
        '/components/examples/select/state.tsx',
        '/components/examples/select/advanced.tsx',
        '/components/examples/data/options.tsx',
      ]}
    >
      <SelectExample />
    </Wrapper>
  )
}

export function ComboboxEx() {
  return (
    <Wrapper
      path={[
        '/components/examples/combobox/index.tsx',
        '/components/examples/combobox/basic.tsx',
        '/components/examples/combobox/state.tsx',
        '/components/examples/combobox/advanced.tsx',
        '/components/examples/data/options.tsx',
      ]}
    >
      <ComboboxExample />
    </Wrapper>
  )
}

export function MenuEx() {
  return (
    <Wrapper path="/components/examples/menu.tsx">
      <MenuExample />
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

export function CheckboxGroupEx() {
  return (
    <Wrapper path="/components/examples/checkbox.tsx">
      <CheckboxExample />
    </Wrapper>
  )
}

export function RadioGroupEx() {
  return (
    <Wrapper path="/components/examples/radio.tsx">
      <RadioExample />
    </Wrapper>
  )
}

export function AutocompleteEx() {
  return (
    <Wrapper path="/components/examples/autocomplete.tsx">
      <AutocompleteExample />
    </Wrapper>
  )
}

export function NumberFieldEx() {
  return (
    <Wrapper path="/components/examples/number-field.tsx">
      <NumberFieldExample />
    </Wrapper>
  )
}

export function ScrollAreaEx() {
  return (
    <Wrapper path="/components/examples/scroll-area.tsx">
      <ScrollAreaExample />
    </Wrapper>
  )
}

export function FormEx() {
  return (
    <Wrapper path="/components/examples/form.tsx">
      <FormExample />
    </Wrapper>
  )
}

export function FieldPrimitivesEx() {
  return (
    <Wrapper path="/components/examples/field-primitives.tsx">
      <FieldPrimitivesExample />
    </Wrapper>
  )
}

export function FieldSetEx() {
  return (
    <Wrapper path="/components/examples/fieldset.tsx">
      <FieldSetExample />
    </Wrapper>
  )
}
