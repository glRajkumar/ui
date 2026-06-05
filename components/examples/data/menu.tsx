import { Apple, Banana } from 'lucide-react'

export const dropdownOptions: menuItemsT = [
  { label: 'New File', value: 'new', shortcut: 'Ctrl+N' },
  'Save',
  12,
  {
    label: (
      <>
        <Banana /> Banana
      </>
    ),
    value: 'banana',
  },
  '---',
  {
    group: 'Settings',
    items: [{ label: 'Appearance', value: 'appearance' }, 22, true],
  },
  {
    submenu: 'More',
    items: [
      {
        label: (
          <>
            <Apple /> Apple
          </>
        ),
        value: 'apple',
      },
      {
        group: 'Tools',
        items: [{ label: 'Formatter', value: 'formatter' }, false],
      },
    ],
  },
]
