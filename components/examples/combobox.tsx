"use client";

import { useState } from "react";

import { options } from "./data";

import { Combobox, MultiSelectCombobox } from "@/components/ui/combobox";
import { useAsyncOptions } from "@/hooks/use-options";

function Asyncs() {
  const { data: list, isLoading } = useAsyncOptions()

  const [values, setValues] = useState<allowedPrimitiveT[]>([])
  const [value, setValue] = useState<allowedPrimitiveT>("")

  return (
    <>
      <Combobox
        value={value}
        options={list || []}
        isLoading={isLoading}
        onValueChange={setValue}
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

export function ComboboxExample() {
  const [values, setValues] = useState<allowedPrimitiveT[]>([])
  const [value, setValue] = useState<allowedPrimitiveT>(true)

  return (
    <>
      <Combobox
        value={value}
        options={options}
        onValueChange={setValue}
        triggerCls="w-40"
      />

      <MultiSelectCombobox
        value={values}
        options={options}
        onValueChange={setValues}
        placeholder="Select item"
        triggerCls="w-40"
      />

      <Asyncs />
    </>
  )
}
