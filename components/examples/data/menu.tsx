import { Apple, Banana } from 'lucide-react'

export const dropdownOptions: menuOptionsT = [
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
    options: [{ label: 'Appearance', value: 'appearance' }, 22, true],
  },
  {
    submenu: 'More',
    options: [
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
        options: [{ label: 'Formatter', value: 'formatter' }, false],
      },
    ],
  },
]
