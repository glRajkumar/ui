'use client'

import { useState } from 'react'

import { dropdownOptions } from './data'

import {
  DropdownCheckboxWrapper,
  DropdownRadioWrapper,
  DropdownWrapper,
} from '@/components/ui/dropdown-menu-wrapper'
import { buttonVariants } from '@/components/ui/button'

export function DropdownExample() {
  const [checked, setChecked] = useState<allowedPrimitiveT[]>([])
  const [val, setVal] = useState<allowedPrimitiveT>(true)

  return (
    <>
      <DropdownWrapper
        options={dropdownOptions}
        contentProps={{ align: 'end' }}
        trigger="Options"
        triggerCls={buttonVariants({ variant: 'outline' })}
      />

      <DropdownCheckboxWrapper
        options={dropdownOptions}
        checked={checked}
        onCheckedChange={(value, isChecked) => {
          setChecked(prev => (isChecked ? [...prev, value] : prev.filter(x => x !== value)))
        }}
        trigger="Checkbox"
        triggerCls={buttonVariants({ variant: 'outline' })}
      />

      <DropdownRadioWrapper
        value={val}
        options={dropdownOptions}
        onValueChange={setVal}
        trigger="Radio"
        triggerCls={buttonVariants({ variant: 'outline' })}
      />
    </>
  )
}
