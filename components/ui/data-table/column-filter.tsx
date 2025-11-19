import { Column } from "@tanstack/react-table";

import { MultiSelectCombobox, type multiSelectComboboxProps } from "../combobox";

interface ColumndFilterProps<TData, TValue>
  extends Omit<multiSelectComboboxProps, 'options' | 'value' | 'onValueChange' | 'label'> {
  column?: Column<TData, TValue>
  title: React.ReactNode
  options: optionsT
}

export function ColumnFilter<TData, TValue>({
  column,
  title,
  options,
  ...props
}: ColumndFilterProps<TData, TValue>) {
  function onSelect(selected: allowedPrimitiveT[]) {
    column?.setFilterValue(selected?.length ? selected : undefined)
  }

  return (
    <MultiSelectCombobox
      options={options}
      value={column?.getFilterValue() as string[]}
      onValueChange={onSelect}
      label={typeof title === "object" ? title : <span className="font-semibold">{title}</span>}
      contentCls="w-fit"
      matchTriggerWidth={false}
      {...props}
    />
  )
}