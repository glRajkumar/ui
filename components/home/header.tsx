import { Layers, Puzzle, Zap } from "lucide-react";
import Link from "next/link";

import { CardWrapper } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <section className="min-h-[90vh] flex justify-center flex-col">
      <div className="mb-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight">
          Build Faster with Opinionated <br /> Shadcn Wrappers
        </h1>

        <p className="my-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          A clean, reusable, type-safe wrapper built on top of shadcn/ui.
          Designed for real-world web development with consistent APIs, shared utilities, and
          improved DX.
        </p>

        <Button variant="outline" asChild>
          <Link href="/docs/shadcn-wrappers">
            View Components
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 w-full max-w-xl mx-auto lg:max-w-none">
        <CardWrapper
          title={<><span className="p-1.5 border rounded-sm shadow"><Puzzle className="size-4" /></span> Consistent API</>}
          titleCls="flex items-center gap-2"
          description="Every wrapper follows a unified prop pattern with utilities from general.d.ts."
        />

        <CardWrapper
          title={<><span className="p-1.5 border rounded-sm shadow"><Zap className="size-4" /></span> Better Developer Experience</>}
          titleCls="flex items-center gap-2"
          description="Cleaner props, automatic behaviors, controlled + uncontrolled support."
        />

        <CardWrapper
          title={<><span className="p-1.5 border rounded-sm shadow"><Layers className="size-4" /></span> Type-Safe by Default</>}
          titleCls="flex items-center gap-2"
          description="Powered by shared types, option utilities, and strict type inference."
        />
      </div>
    </section>
  )
}

export default Header
