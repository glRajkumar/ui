import { Apple, Banana } from "lucide-react";

import { type dropdownOptionsT } from "../ui/dropdown";
import { type accordionItemsT } from "../ui/accordion";

import { delay } from "@/utils";

export const options: optionsT = [
  "Data 1",
  false,
  12,
  "---",
  {
    label: "Obj 1",
    value: "obj-1",
  },
  {
    label: "Obj 2",
    value: "obj-2",
    className: "bg-red-50",
  },
  {
    value: "apple",
    label: <><Apple /> Apple</>
  },
  "---",
  {
    group: "Group 1",
    options: [
      "grp 1",
      21,
      true,
      { value: "banana", label: <><Banana /> Banana</> }
    ],
  },
  {
    group: "Group 2",
    options: [
      "grp 2",
      22
    ],
    className: "bg-amber-50",
  },
]

export const generateOptions = (n: number = 20) => new Array(n).fill(0).map((_, i) => `Data ${i + 1}`)

export async function asyncOptions({ n, delayBy = 5000 }: { n?: number, delayBy?: number } = {}) {
  await delay(delayBy)
  return generateOptions(n)
}

export const dropdownOptions: dropdownOptionsT = [
  { label: "New File", value: "new", shortcut: "Ctrl+N" },
  "Save",
  12,
  { label: <><Banana /> Banana</>, value: "banana" },
  "---",
  {
    group: "Settings",
    options: [
      { label: "Appearance", value: "appearance" },
      22,
      true
    ],
  },

  {
    submenu: "More",
    options: [
      { label: <><Apple /> Apple</>, value: "apple" },
      {
        group: "Tools",
        options: [
          { label: "Formatter", value: "formatter" },
          false,
        ],
      },
    ],
  },
]

export const accordionItems: accordionItemsT = [
  {
    value: "item-1",
    trigger: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern."
  },
  {
    value: "item-2",
    trigger: "Is it styled?",
    content: "Yes. It comes with default styles that matches the other components' aesthetic.",
    contentCls: "bg-red-50",
  },
  {
    value: "item 3",
    trigger: <><Apple className="size-4" /> Product Information</>,
    content: (
      <div>
        <p>Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.</p>
        <p>Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.</p>
      </div>
    )
  }
]

export type Employee = {
  id: string
  name: string
  email: string
  department: string
  role: string
  status: 'active' | 'inactive' | 'pending' | 'on-leave'
  salary: number
  joinDate: string
  location: string
}

const generateEmployeeData = (): Employee[] => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  const roles = ['Manager', 'Senior', 'Junior', 'Lead', 'Intern'];
  const statuses: Employee['status'][] = ['active', 'inactive', 'pending', 'on-leave'];
  const locations = ['New York', 'San Francisco', 'London', 'Tokyo', 'Berlin'];
  const names = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown',
    'Emily Davis', 'Michael Wilson', 'Jessica Moore', 'Christopher Taylor', 'Amanda Anderson',
    'James Thomas', 'Jennifer Jackson', 'Robert White', 'Lisa Harris', 'William Martin',
    'Mary Thompson', 'Richard Garcia', 'Patricia Martinez', 'Charles Robinson', 'Linda Clark',
    'Daniel Rodriguez', 'Barbara Lewis', 'Matthew Lee', 'Susan Walker', 'Joseph Hall',
    'Karen Allen', 'Thomas Young', 'Nancy Hernandez', 'Paul King', 'Betty Wright'
  ];

  return names.map((name, index) => ({
    id: `EMP-${1000 + index}`,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@company.com`,
    department: departments[index % departments.length],
    role: roles[index % roles.length],
    status: statuses[index % statuses.length],
    salary: Math.floor(Math.random() * 100000) + 50000,
    joinDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
    location: locations[index % locations.length]
  }))
}

export const employees: Employee[] = generateEmployeeData()
