import * as React from 'react'

export function ExRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
