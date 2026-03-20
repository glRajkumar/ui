"use client";

import { useState } from "react";

import { DialogWrapper } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";

export function DialogExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DialogWrapper
        trigger="Delete"
        triggerCls={buttonVariants({ variant: "destructive" })}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      />

      <DialogWrapper
        open={open}
        onOpenChange={setOpen}
        trigger="Controlled"
        triggerCls={buttonVariants({ variant: "outline" })}
        title="Do you want to leave page"
        description=""
        action="Proceed"
        onAction={() => setOpen(p => !p)}
      />

      <DialogWrapper
        trigger="No Action"
        triggerCls={buttonVariants({ variant: "outline" })}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      />
    </>
  )
}
