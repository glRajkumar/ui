"use client";

import { useState } from "react";

import { dropdownOptions } from "./data";

import { MenubarCheckboxWrapper, MenubarRadioWrapper, MenubarWrapper } from "@/components/ui/menubar-wrapper";
import { Button } from "@/components/ui/button";

export function MenubarExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([])
  const [val, setVal] = useState<allowedPrimitiveT>(true)

  const opts = [
    {
      value: "1",
      trigger: "Option 1",
      options: dropdownOptions
    },
    {
      value: "2",
      trigger: "Option 2",
      options: dropdownOptions
    }
  ]

  return (
    <>
      <MenubarWrapper
        options={opts}
        contentProps={{ align: "end" }}
      >
        <Button variant="outline">
          Options
        </Button>
      </MenubarWrapper>

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
      >
        <Button variant="outline">
          Checkbox
        </Button>
      </MenubarCheckboxWrapper>

      <MenubarRadioWrapper
        value={`${val}`}
        options={opts}
        onValueChange={setVal}
      >
        <Button variant="outline">
          Radio
        </Button>
      </MenubarRadioWrapper>
    </>
  )
}
