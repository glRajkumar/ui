"use client";

import { useState } from "react";

import { dropdownOptions } from "./data";

import { DropdownCheckboxWrapper, DropdownRadioWrapper, DropdownWrapper } from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";

export function DropdownExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([])
  const [val, setVal] = useState<allowedPrimitiveT>(true)

  return (
    <>
      <DropdownWrapper
        options={dropdownOptions}
        contentProps={{ align: "end" }}
      >
        <Button variant="outline">
          Options
        </Button>
      </DropdownWrapper>

      <DropdownCheckboxWrapper
        options={dropdownOptions}
        label="Select Something"
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
      </DropdownCheckboxWrapper>

      <DropdownRadioWrapper
        value={val}
        options={dropdownOptions}
        onValueChange={setVal}
      >
        <Button variant="outline">
          Radio
        </Button>
      </DropdownRadioWrapper>
    </>
  )
}
