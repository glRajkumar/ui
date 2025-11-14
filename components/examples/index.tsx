import { ComboboxExample } from "./combobox";
import { SelectExample } from "./select";
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