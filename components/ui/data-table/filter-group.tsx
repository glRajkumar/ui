import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { DropdownCheckboxWrapper } from "../dropdown-menu-wrapper";
import { buttonVariants } from "../button";
import { ColumnFilter } from "./column-filter";

interface FilterGroupProps<TData> {
  table: Table<TData>
  options: {
    value: string
    lable: React.ReactNode
    options: optionsT
  }[]
  indicatorAt?: indicatorAtT
}

export function FilterGroup<TData>({ table, options, indicatorAt }: FilterGroupProps<TData>) {
  const [selected, setSelected] = useState<allowedPrimitiveT[]>([])

  return (
    <>
      {
        options
          .filter(f => selected.includes(f.value))
          .map(opt => (
            <ColumnFilter
              key={opt.value}
              title={opt.lable}
              column={table.getColumn(opt.value)}
              options={opt.options}
            />
          ))
      }

      <DropdownCheckboxWrapper
        checked={selected}
        onCheckedChange={(val, checked) => setSelected(prev => !checked ? prev.filter(p => !p) : [...prev, val])}
        options={options.map(m => ({ label: m.lable, value: m.value }))}
        indicatorAt={indicatorAt}
        trigger={<><CirclePlus className="size-4" /> Filter</>}
        triggerCls={buttonVariants({ variant: "outline" })}
      />
    </>
  )
}
