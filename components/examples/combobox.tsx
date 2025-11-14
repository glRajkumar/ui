"use client";

import { useState } from "react";

import { useAsyncOptions } from "@/hooks/use-options";
import { options } from "./data";

import { Combobox, MultiSelectCombobox } from "@/components/ui/combobox";

export function ComboboxExample() {
  const { data: list, isLoading } = useAsyncOptions()

  const [values, setValues] = useState<allowedPrimitiveT[]>([])
  const [value, setValue] = useState<allowedPrimitiveT>("")

  return (
    <>
      <Combobox
        options={options}
        placeholder="Select item"
        triggerCls="w-40"
      />

      <MultiSelectCombobox
        options={options}
        placeholder="Select item"
        triggerCls="w-40"
      />

      <Combobox
        value={value}
        options={list || []}
        isLoading={isLoading}
        onValueChange={setValue}
        placeholder="Select item"
        triggerCls="w-40"
      />

      <MultiSelectCombobox
        value={values}
        options={list || []}
        isLoading={isLoading}
        onValueChange={setValues}
        placeholder="Select item"
        triggerCls="w-40"
      />
    </>
  )
}
