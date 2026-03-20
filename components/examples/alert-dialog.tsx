"use client";

import { useState } from "react";

import { AlertDialogWrapper } from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";

export function AlertDialogExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AlertDialogWrapper
        trigger="Delete"
        triggerCls={buttonVariants({ variant: "outline", size: "sm" })}
      />

      <AlertDialogWrapper
        open={open}
        onOpenChange={setOpen}
        trigger="Controlled"
        triggerCls={buttonVariants({ variant: "outline", size: "sm" })}
        title="Do you want to leave page"
        description=""
        action="Proceed"
        onAction={() => setOpen(p => !p)}
      />

      <AlertDialogWrapper
        trigger="No Action"
        triggerCls={buttonVariants({ variant: "outline", size: "sm" })}
        action=""
      />
    </>
  )
}
