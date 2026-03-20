import { Apple, Banana } from 'lucide-react';

import { ToggleGroupWrapper, type toggleItemsT } from "@/components/ui/toggle-group";

export function ToggleGroupExample() {
  const options: toggleItemsT = [
    "Lable", 10, true,
    {
      label: <><Apple /> Apple</>,
      value: "Apple",
    },
    {
      label: <><Banana /> Banana</>,
      value: "Banana",
    },
  ]

  return (
    <ToggleGroupWrapper
      options={options}
    />
  )
}
