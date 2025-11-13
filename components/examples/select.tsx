"use client";

import { useState } from "react";

import { parseAllowedPrimitive } from "@/lib/utils";
import { options } from "./data";

import { SelectWrapper } from "@/components/ui/select";

export function SelectExample() {
  const [val, setVal] = useState<allowedPrimitiveT>(true)

  return (
    <>
      <SelectWrapper
        options={options}
        triggerCls="w-40"
        placeholder="Uncontrolled"
      />

      <SelectWrapper
        options={options}
        triggerCls="w-40"
        indicatorAt="left"
        placeholder="Select Item"
        contentCls="max-h-80"
      />

      <SelectWrapper
        options={options}
        triggerCls="w-40"
        placeholder="Controlled"
        value={`${val}`}
        onValueChange={v => setVal(parseAllowedPrimitive(v))}
      />
    </>
  )
}
