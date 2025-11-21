import { Column } from "@tanstack/react-table";

import { MultiSelectCombobox, type multiSelectComboboxProps } from "../combobox";
import { getLabel, getValue } from "@/lib/utils";

interface ColumnFacetedFilterProps<TData, TValue>
  extends Omit<multiSelectComboboxProps, 'options' | 'value' | 'onValueChange' | 'label'> {
  column?: Column<TData, TValue>
  title: React.ReactNode
  options: optionsT
}

export function ColumnFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  ...props
}: ColumnFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()

  const newOptions = options.map(option => {
    const value = getValue(option)
    const label = getLabel(option)

    return {
      label: <>
        {label}
        {facets?.get(value) && (
          <span className="ml-auto flex h-4 w-4 items-center justify-center text-xs">
            {facets.get(value)}
          </span>
        )}</>,
      value,
    }
  })

  function onSelect(selected: allowedPrimitiveT[]) {
    column?.setFilterValue(selected?.length ? selected : undefined)
  }

  return (
    <MultiSelectCombobox
      options={newOptions}
      value={column?.getFilterValue() as string[]}
      onValueChange={onSelect}
      label={typeof title === "object" ? title : <span className="font-semibold">{title}</span>}
      indicatorAt="left"
      contentCls="w-fit"
      matchTriggerWidth={false}
      {...props}
    />
  )
}