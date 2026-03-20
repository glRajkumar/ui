"use client";

import { useState } from "react";

import { dropdownOptions } from "./data";

import { type menubarOptionsT, MenubarCheckboxWrapper, MenubarRadioWrapper, MenubarWrapper } from "@/components/ui/menubar-wrapper";

export function MenubarExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([true])
  const [val, setVal] = useState<allowedPrimitiveT>(true)

  const opts: menubarOptionsT = [
    {
      key: "1",
      trigger: "Option 1",
      options: dropdownOptions
    },
    {
      key: "2",
      trigger: "Option 2",
      options: dropdownOptions,
    }
  ]

  return (
    <>
      <MenubarWrapper
        options={opts}
        contentProps={{ align: "end" }}
      />

      <MenubarCheckboxWrapper
        options={opts}
        checked={checked}
        onCheckedChange={(value, isChecked) => {
          setChecked((prev) =>
            isChecked
              ? [...prev, value]
              : prev.filter((x) => x !== value)
          )
        }}
      />

      <MenubarRadioWrapper
        value={val}
        options={opts}
        onValueChange={setVal}
      />
    </>
  )
}
