function Philosophy() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-4 text-center">Wrapper Philosophy</h2>

      <div className="text-center text-muted-foreground max-w-2xl mx-auto">
        Each wrapper follows these principles for consistency and long-term stability.
      </div>

      <ul className="grid gap-4 justify-center my-8 text-sm">
        <li className="p-4 bg-muted rounded-md">
          1. Minimal to zero CSS modifications — keep Base UI + shadcn styling intact.
        </li>
        <li className="p-4 bg-muted rounded-md">
          2. API improvements only - no breaking underlying behavior.
        </li>
        <li className="p-4 bg-muted rounded-md">
          3. Shared types & utilities - powered by general.d.ts + utils.
        </li>
        <li className="p-4 bg-muted rounded-md">
          4. Emotionless components - purely functional and predictable.
        </li>
        <li className="p-4 bg-muted rounded-md">
          5. Consistent handling of controlled/uncontrolled props.
        </li>
      </ul>
    </section>
  )
}

export default Philosophy
