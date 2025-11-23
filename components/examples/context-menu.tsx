"use client";

import { useState } from "react";

import { dropdownOptions } from "./data";

import { ContextCheckboxWrapper, ContextRadioWrapper, ContextWrapper } from "@/components/ui/context-menu-wrapper";
import { Button } from "@/components/ui/button";

export function ContextExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([])
  const [val, setVal] = useState<allowedPrimitiveT>(true)

  return (
    <>
      <ContextWrapper
        options={dropdownOptions}
      >
        <Button variant="outline">
          Options
        </Button>
      </ContextWrapper>

      <ContextCheckboxWrapper
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
      </ContextCheckboxWrapper>

      <ContextRadioWrapper
        value={val}
        options={dropdownOptions}
        onValueChange={setVal}
      >
        <Button variant="outline">
          Radio
        </Button>
      </ContextRadioWrapper>
    </>
  )
}
