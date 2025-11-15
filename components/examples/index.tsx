import { AlertDialogExample } from "./alert-dialog";
import { AccordionExample } from "./accordion";
import { DropdownExample } from "./dropdown";
import { ComboboxExample } from "./combobox";
import { SelectExample } from "./select";
import { CardExample } from "./card";
import Wrapper from "../wrapper";

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
    <Wrapper path="/components/examples/dropdown.tsx">
      <DropdownExample />
    </Wrapper>
  )
}

export function AccordionEx() {
  return (
    <Wrapper path="/components/examples/accordion.tsx">
      <AccordionExample />
    </Wrapper>
  )
}

export function AlertDialogEx() {
  return (
    <Wrapper path="/components/examples/alert-dialog.tsx">
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