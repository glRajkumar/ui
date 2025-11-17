import { Column } from "@tanstack/react-table";

import { MultiSelectCombobox } from "../combobox";

interface ColumndFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: string[]
}

export function ColumnFilter<TData, TValue>({
  column,
  title,
  options,
}: ColumndFilterProps<TData, TValue>) {
  function onSelect(selected: allowedPrimitiveT[]) {
    column?.setFilterValue(selected?.length ? selected : undefined)
  }

  return (
    <MultiSelectCombobox
      options={options}
      value={column?.getFilterValue() as string[]}
      onValueChange={onSelect}
      label={<span className="font-semibold">{title}</span>}
    />
  )
}