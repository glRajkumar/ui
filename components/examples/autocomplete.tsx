'use client'

import * as React from 'react'

import { ExRow, ExItem } from '@/components/examples/common'
import { AutocompleteWrapper } from '@/components/ui/autocomplete'

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia',
  'Austria', 'Bangladesh', 'Belgium', 'Brazil', 'Canada',
  'Chile', 'China', 'Colombia', 'Croatia', 'Czech Republic',
  'Denmark', 'Egypt', 'Finland', 'France', 'Germany',
  'Greece', 'Hungary', 'India', 'Indonesia', 'Iran',
  'Ireland', 'Israel', 'Italy', 'Japan', 'Kenya',
  'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand',
  'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines',
  'Poland', 'Portugal', 'Romania', 'Russia', 'Saudi Arabia',
  'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland',
  'Thailand', 'Turkey', 'Ukraine', 'United Kingdom', 'United States', 'Vietnam',
]

const frameworks = [
  { value: 'next', label: 'Next.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'solid-start', label: 'SolidStart' },
]

const groupedTech = [
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

function BasicExample() {
  return (
    <AutocompleteWrapper
      items={countries}
      placeholder="Search country..."
      className="w-64"
    />
  )
}

function WithClearExample() {
  return (
    <AutocompleteWrapper
      items={countries}
      placeholder="Search country..."
      showClear
      className="w-64"
    />
  )
}

function WithTriggerExample() {
  return (
    <AutocompleteWrapper
      items={frameworks}
      placeholder="Select framework..."
      showTrigger
      showClear
      className="w-64"
    />
  )
}

function ControlledExample() {
  const [value, setValue] = React.useState('')

  return (
    <div className="flex flex-col gap-2 w-64">
      <AutocompleteWrapper
        items={countries}
        value={value}
        onValueChange={setValue}
        placeholder="Search country..."
        showClear
      />
      {value && (
        <p className="text-sm text-muted-foreground">
          Value: <span className="font-medium text-foreground">{value}</span>
        </p>
      )}
    </div>
  )
}

function GroupedExample() {
  return (
    <AutocompleteWrapper
      items={groupedTech}
      placeholder="Search tech..."
      showClear
      className="w-64"
    />
  )
}

function LimitExample() {
  return (
    <AutocompleteWrapper
      items={countries}
      placeholder="Max 5 suggestions..."
      limit={5}
      className="w-64"
    />
  )
}

function InlineModeExample() {
  return (
    <AutocompleteWrapper
      items={countries}
      placeholder="Start typing..."
      mode="inline"
      className="w-64"
    />
  )
}

function AsyncExample() {
  const [inputValue, setInputValue] = React.useState('')
  const [results, setResults] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleValueChange(val: string) {
    setInputValue(val)
    if (timerRef.current) clearTimeout(timerRef.current)

    if (!val.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    timerRef.current = setTimeout(() => {
      setResults(countries.filter(c => c.toLowerCase().includes(val.toLowerCase())))
      setLoading(false)
    }, 500)
  }

  return (
    <AutocompleteWrapper
      items={results}
      value={inputValue}
      onValueChange={handleValueChange}
      filter={null}
      isLoading={loading}
      placeholder="Search (500ms debounce)..."
      showClear
      className="w-64"
    />
  )
}

function DisabledExample() {
  return (
    <AutocompleteWrapper
      items={countries}
      placeholder="Search country..."
      disabled
      className="w-64"
    />
  )
}

export function AutocompleteExample() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExRow label="Basic">
        <ExItem label="Default — type to filter">
          <BasicExample />
        </ExItem>
        <ExItem label="With clear — dismiss input value">
          <WithClearExample />
        </ExItem>
        <ExItem label="With trigger — toggle popup">
          <WithTriggerExample />
        </ExItem>
      </ExRow>

      <ExRow label="State">
        <ExItem label="Controlled — value + onValueChange">
          <ControlledExample />
        </ExItem>
        <ExItem label="Disabled">
          <DisabledExample />
        </ExItem>
      </ExRow>

      <ExRow label="Options">
        <ExItem label="Grouped — options under labelled sections">
          <GroupedExample />
        </ExItem>
        <ExItem label="Limit — max 5 suggestions shown">
          <LimitExample />
        </ExItem>
        <ExItem label="Inline mode — completes input text inline">
          <InlineModeExample />
        </ExItem>
      </ExRow>

      <ExRow label="Async">
        <ExItem label="Debounced search — filter=null, items set externally after 500ms">
          <AsyncExample />
        </ExItem>
      </ExRow>
    </div>
  )
}
