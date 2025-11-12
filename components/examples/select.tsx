import { SelectWrapper } from "@/components/ui/select";
import Wrapper from "./wrapper";

function SelectExample() {
  const options: optionsT = [
    "Data 1",
    false,
    12,
    "---",
    {
      label: "Obj 1",
      value: "obj-1",
    },
    {
      label: "Obj 2",
      value: "obj-2",
      className: "bg-red-50",
    },
    "---",
    {
      group: "Group 1",
      options: ["grp 1", 21, true],
    },
    {
      group: "Group 2",
      options: ["grp 2", 22],
      className: "bg-amber-50",
    },
  ]

  return (
    <Wrapper>
      <SelectWrapper
        triggerCls="w-40"
        options={options}
      />
    </Wrapper>
  )
}

export default SelectExample
