import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { DropdownCheckboxWrapper } from "../dropdown";
import { ColumnFilter } from "./column-filter";
import { Button } from "../button";

interface FilterGroupProps<TData> {
  table: Table<TData>
  options: {
    key: string
    lable: string
    options: string[]
  }[]
}

export function FilterGroup<TData>({ table, options }: FilterGroupProps<TData>) {
  const [selected, setSelected] = useState<allowedPrimitiveT[]>([])

  return (
    <>
      {
        options
          .filter(f => selected.includes(f.key))
          .map(opt => (
            <ColumnFilter
              key={opt.key}
              column={table.getColumn(opt.key)}
              title={opt.lable}
              options={opt.options}
              remove={() => setSelected(p => p.filter(v => v !== opt.key))}
            />
          ))
      }

      <DropdownCheckboxWrapper
        checked={selected}
        onCheckedChange={(val, checked) => setSelected(prev => !checked ? prev.filter(p => !p) : [...prev, val])}
        options={options.map(m => ({ label: m.lable, value: m.key }))}
      >
        <Button variant="outline">
          <CirclePlus className="size-4" />
          <span>Filter</span>
        </Button>
      </DropdownCheckboxWrapper>
    </>
  )
}
