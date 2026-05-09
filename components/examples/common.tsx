import { cn } from "@/lib/utils"

type exRowProps = {
  label: string
  children: React.ReactNode
  className?: string
}

export function ExRow({ label, children, className }: exRowProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <div className="row-container flex flex-wrap gap-4">{children}</div>
    </div>
  )
}

type exItemProps = {
  label: string
  children: React.ReactNode
  className?: string
}

export function ExItem({ label, children, className }: exItemProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}
