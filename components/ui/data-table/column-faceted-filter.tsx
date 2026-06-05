import { useEffect, useState } from 'react'
import { Column } from '@tanstack/react-table'

import { getLabel, getValue, isGroup } from '@/lib/utils'

import { ComboboxWrapper, type ComboboxWrapperProps } from '@/components/ui/combobox'

interface ColumnFacetedFilterProps<TData, TValue>
  extends Omit<ComboboxWrapperProps, 'options' | 'value' | 'onValueChange' | 'label'> {
  column?: Column<TData, TValue>
  title: React.ReactNode
  options: optionsT
}

function change(option: allowedPrimitiveT | optionT, facets?: Map<any, number>) {
  const value = getValue(option)
  const label = getLabel(option)

  return {
    label: (
      <>
        {label}
        {facets?.get(value) && (
          <span className="ml-auto flex h-4 w-4 items-center justify-center text-xs">
            {facets.get(value)}
          </span>
        )}
      </>
    ),
    value,
  }
}

export function ColumnFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  ...props
}: ColumnFacetedFilterProps<TData, TValue>) {
  const [facets, setFacets] = useState<Map<unknown, number> | undefined>()

  useEffect(() => {
    setFacets(column?.getFacetedUniqueValues())
  }, [column])

  const newOptions = options.map(option => {
    if (isGroup(option)) {
      return {
        ...option,
        options: option.options.map(o => change(o, facets)),
      }
    }

    return change(option, facets)
  })

  function onSelect(selected: allowedPrimitiveT[]) {
    column?.setFilterValue(selected?.length ? selected : undefined)
  }

  return (
    <ComboboxWrapper
      multiple
      items={newOptions}
      value={(column?.getFilterValue() as string[]) ?? []}
      onValueChange={v => onSelect(v as any)}
      // label={typeof title === "object" ? title : <span className="font-semibold">{title}</span>}
      indicatorAt="left"
      {...props}
    />
  )
}
