import type { ReactNode } from 'react'
import { Apple, ArrowDown, ArrowUp, Banana, Flame, Globe, Laptop, Minus, Moon, Sun } from 'lucide-react'

import { delay } from '@/utils'

export const options: optionsT = [
  'Data 1',
  false,
  12,
  '---',
  { label: 'Obj 1', value: 'obj-1' },
  { label: 'Obj 2', value: 'obj-2', className: 'bg-red-50 dark:bg-red-900' },
  { value: 'apple', label: <><Apple /> Apple</> },
  '---',
  {
    group: 'Group 1',
    options: [
      'grp 1',
      21,
      true,
      { value: 'banana', label: <><Banana /> Banana</>, className: 'bg-amber-50 dark:bg-amber-900' },
    ],
  },
  '---',
  { group: 'Group 2', options: ['grp 2', 22] },
]

export const generateOptions = (n: number = 20) =>
  new Array(n).fill(0).map((_, i) => `Data ${i + 1}`)

export async function asyncOptions({ n, delayBy = 5000 }: { n?: number; delayBy?: number } = {}) {
  await delay(delayBy)
  return generateOptions(n)
}

export const fruits: optionsT = [
  'Apple', 'Banana', 'Cherry', 'Grape', 'Mango',
  'Orange', 'Peach', 'Plum', 'Strawberry', 'Watermelon',
  'Apricot', 'Blueberry', 'Coconut', 'Date', 'Fig',
  'Guava', 'Kiwi', 'Lemon', 'Lime', 'Papaya',
  'Pomegranate', 'Persimmon', 'Nectarine', 'Mulberry', 'Passionfruit',
  'Dragonfruit', 'Jackfruit', 'Lychee', 'Rambutan', 'Starfruit',
  'Soursop', 'Quince', 'Cranberry', 'Currant', 'Elderberry',
  'Boysenberry', 'Honeydew', 'Cantaloupe', 'Kumquat', 'Longan',
]

export const grouped: optionsT = [
  { group: 'Citrus', options: ['Orange', 'Lemon', 'Lime', 'Grapefruit'] },
  { group: 'Tropical', options: ['Mango', 'Papaya', 'Pineapple'] },
  { group: 'Berries', options: ['Strawberry', 'Blueberry', 'Raspberry'] },
]

export const withSeparator: optionsT = ['Design', 'Engineering', 'Marketing', '---', 'Finance', 'Legal']

export const withDisabled: optionsT = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer (disabled)', value: 'viewer', disabled: true },
  { label: 'Guest', value: 'guest' },
]

export const themed: optionsT = [
  { label: <><Sun className="size-3.5" /> Light</>, value: 'light' },
  { label: <><Moon className="size-3.5" /> Dark</>, value: 'dark' },
  { label: <><Laptop className="size-3.5" /> System</>, value: 'system' },
]

export const regions: optionsT = [
  { label: <><Globe className="size-3.5" /> US East</>, value: 'us-east', className: 'text-blue-600 dark:text-blue-400' },
  { label: <><Globe className="size-3.5" /> EU West</>, value: 'eu-west', className: 'text-green-600 dark:text-green-400' },
  { label: <><Globe className="size-3.5" /> AP Southeast</>, value: 'ap-se', className: 'text-orange-600 dark:text-orange-400' },
]

export const statusOptions: optionsT = [
  { label: 'Active', value: 'active' },
  { label: 'Pending review', value: 'pending' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Archived', value: 'archived' },
]

export const statusStyle: Record<string, { dot: string; text: string; label: string }> = {
  active: { dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400', label: 'Active' },
  pending: { dot: 'bg-yellow-400', text: 'text-yellow-700 dark:text-yellow-400', label: 'Pending review' },
  inactive: { dot: 'bg-slate-400', text: 'text-slate-500 dark:text-slate-400', label: 'Inactive' },
  archived: { dot: 'bg-red-500', text: 'text-red-700 dark:text-red-400', label: 'Archived' },
}

export const memberMeta: Record<string, { initials: string; name: string; dept: string; bg: string }> = {
  alice: { initials: 'AC', name: 'Alice Chen', dept: 'Engineering', bg: 'bg-violet-500' },
  bob: { initials: 'BK', name: 'Bob Kim', dept: 'Design', bg: 'bg-sky-500' },
  carol: { initials: 'CW', name: 'Carol Wang', dept: 'Marketing', bg: 'bg-pink-500' },
  dan: { initials: 'DP', name: 'Dan Park', dept: 'Finance', bg: 'bg-amber-500' },
}

export const memberOptions: optionsT = [
  {
    label: (
      <span className="flex items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white">AC</span>
        <span>
          <span className="block font-medium leading-none mb-0.5">Alice Chen</span>
          <span className="block text-xs text-muted-foreground">Engineering</span>
        </span>
      </span>
    ),
    value: 'alice',
  },
  {
    label: (
      <span className="flex items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white">BK</span>
        <span>
          <span className="block font-medium leading-none mb-0.5">Bob Kim</span>
          <span className="block text-xs text-muted-foreground">Design</span>
        </span>
      </span>
    ),
    value: 'bob',
  },
  {
    label: (
      <span className="flex items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white">CW</span>
        <span>
          <span className="block font-medium leading-none mb-0.5">Carol Wang</span>
          <span className="block text-xs text-muted-foreground">Marketing</span>
        </span>
      </span>
    ),
    value: 'carol',
  },
  {
    label: (
      <span className="flex items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">DP</span>
        <span>
          <span className="block font-medium leading-none mb-0.5">Dan Park</span>
          <span className="block text-xs text-muted-foreground">Finance</span>
        </span>
      </span>
    ),
    value: 'dan',
  },
]

export const priorityOptions: optionsT = [
  { label: <><Flame className="size-3.5 text-red-500" /> Critical</>, value: 'critical' },
  { label: <><ArrowUp className="size-3.5 text-orange-500" /> High</>, value: 'high' },
  { label: <><Minus className="size-3.5 text-yellow-500" /> Medium</>, value: 'medium' },
  { label: <><ArrowDown className="size-3.5 text-blue-500" /> Low</>, value: 'low' },
]

export const priorityMeta: Record<string, { icon: ReactNode; cls: string }> = {
  critical: { icon: <Flame className="size-3 text-red-500" />, cls: 'text-red-600 dark:text-red-400' },
  high: { icon: <ArrowUp className="size-3 text-orange-500" />, cls: 'text-orange-600 dark:text-orange-400' },
  medium: { icon: <Minus className="size-3 text-yellow-500" />, cls: 'text-yellow-600 dark:text-yellow-400' },
  low: { icon: <ArrowDown className="size-3 text-blue-500" />, cls: 'text-blue-600 dark:text-blue-400' },
}

export const teamOptions: optionsT = [
  { label: 'Alice Chen', value: 'alice' },
  { label: 'Bob Kim', value: 'bob' },
  { label: 'Carol Wang', value: 'carol' },
  { label: 'Dan Park', value: 'dan' },
  { label: 'Eve Liu', value: 'eve' },
]

export const teamMeta: Record<string, { initials: string; bg: string; name: string }> = {
  alice: { initials: 'AC', bg: 'bg-violet-500', name: 'Alice' },
  bob: { initials: 'BK', bg: 'bg-sky-500', name: 'Bob' },
  carol: { initials: 'CW', bg: 'bg-pink-500', name: 'Carol' },
  dan: { initials: 'DP', bg: 'bg-amber-500', name: 'Dan' },
  eve: { initials: 'EL', bg: 'bg-teal-500', name: 'Eve' },
}

export const frameworks: optionsT = [
  { value: 'next', label: 'Next.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'solid-start', label: 'SolidStart' },
]

export const groupedTech: optionsT = [
  {
    group: 'Frontend',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'solid', label: 'Solid' },
    ],
  },
  {
    group: 'Backend',
    options: [
      { value: 'node', label: 'Node.js' },
      { value: 'deno', label: 'Deno' },
      { value: 'bun', label: 'Bun' },
      { value: 'go', label: 'Go' },
    ],
  },
  {
    group: 'Database',
    options: [
      { value: 'postgres', label: 'PostgreSQL' },
      { value: 'mysql', label: 'MySQL' },
      { value: 'mongo', label: 'MongoDB' },
    ],
  },
]
