import { CodeBlock } from "@/components/extended/code-block";

function Philosophy() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-4 text-center">Wrapper Philosophy</h2>

      <div className="text-center text-muted-foreground max-w-2xl mx-auto">
        Each wrapper follows these principles for consistency and long-term stability.
      </div>

      <ul className="grid gap-4 justify-center my-8 text-sm">
        <li className="p-4 bg-muted rounded-md">1. Minimal to Zero CSS modifications - keep shadcn styling intact.</li>
        <li className="p-4 bg-muted rounded-md">2. API improvements only - no breaking underlying behavior.</li>
        <li className="p-4 bg-muted rounded-md">3. Shared types & utilities - powered by general.d.ts + utils.</li>
        <li className="p-4 bg-muted rounded-md">4. Emotionless components - purely functional and predictable.</li>
        <li className="p-4 bg-muted rounded-md">5. Consistent handling of controlled/uncontrolled props.</li>
      </ul>

      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <div>
          <div>Before</div>
          <CodeBlock allowCopy={false} className="py-2">
            {`<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a item..." />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="Data 1">Data 1</SelectItem>
    <SelectItem value="false">false</SelectItem>
    <SelectItem value="12">12</SelectItem>

    <SelectSeparator />

    <SelectItem value="obj-1">Obj 1</SelectItem>
    <SelectItem value="obj-2" className="bg-red-500">Obj 2</SelectItem>
    <SelectItem value="apple"><Apple /> Apple</SelectItem>

    <SelectSeparator />

    <SelectGroup>
      <SelectLabel>Group 1</SelectLabel>
      <SelectItem value="grp 1">grp 1</SelectItem>
      <SelectItem value="21">21</SelectItem>
      <SelectItem value="true">true</SelectItem>
      <SelectItem value="banana"><Banana /> Banana</SelectItem>
    </SelectGroup>

    <SelectSeparator />

    <SelectGroup className="bg-amber-50">
      <SelectLabel>Group 2</SelectLabel>
      <SelectItem value="grp 2">grp 2</SelectItem>
      <SelectItem value="22">22</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
          </CodeBlock>
        </div>

        <div>
          <div>After</div>
          <CodeBlock allowCopy={false} className="py-2">
            {`const options: optionsT = [
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

<SelectWrapper
  options={options}
  placeholder="Select a item..."
/>`}
          </CodeBlock>
        </div>
      </div>
    </section>
  )
}

export default Philosophy
