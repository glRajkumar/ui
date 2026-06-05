export const options: itemsT = [
  'Data 1',
  false,
  12,
  '---',
  {
    label: 'Obj 1',
    value: 'obj-1',
  },
  {
    label: 'Obj 2',
    value: 'obj-2',
    className: 'bg-red-50',
  },
  {
    value: 'apple',
    label: '<><Apple /> Apple</>',
  },
  '---',
  {
    group: 'Group 1',
    className: 'bg-pink-100',
    items: [
      'grp 1',
      21,
      true,
      {
        value: 'banana',
        label: '<><Banana /> Banana</>',
        className: 'bg-amber-50',
      },
    ],
  },
  '---',
  {
    group: 'Group 2',
    className: 'bg-pink-100',
    items: ['grp 2', 22],
  },
]
