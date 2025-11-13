import { Apple, Banana } from "lucide-react";

export const options: optionsT = [
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
  {
    value: "apple",
    label: <><Apple /> Apple</>
  },
  "---",
  {
    group: "Group 1",
    options: [
      "grp 1",
      21,
      true,
      { value: "banana", label: <><Banana /> Banana</> }
    ],
  },
  {
    group: "Group 2",
    options: [
      "grp 2",
      22
    ],
    className: "bg-amber-50",
  },
]
