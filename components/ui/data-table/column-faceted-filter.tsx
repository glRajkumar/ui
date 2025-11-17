import { Column } from "@tanstack/react-table";

import { MultiSelectCombobox } from "../combobox";

interface ColumnFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export function ColumnFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: ColumnFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()

  const newOptions = options.map(v => ({
    label: <>{v.label} {facets?.get(v.value) && (
      <span className="ml-auto flex h-4 w-4 items-center justify-center text-xs">
        {facets.get(v.value)}
      </span>
    )}</>,
    value: v.value
  }))

  function onSelect(selected: allowedPrimitiveT[]) {
    column?.setFilterValue(selected?.length ? selected : undefined)
  }

  return (
    <MultiSelectCombobox
      options={newOptions}
      value={column?.getFilterValue() as string[]}
      onValueChange={onSelect}
      label={<span className="font-semibold">{title}</span>}
      indicatorAt="left"
    />
  )
}