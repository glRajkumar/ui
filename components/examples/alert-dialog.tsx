"use client";

import { useState } from "react";

import { AlertDialogWrapper } from "@/components/ui-old/alert-dialog";
import { Button } from "@/components/ui-old/button";

export function AlertDialogExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AlertDialogWrapper
        trigger={<Button variant="outline" size="sm">Delete</Button>}
      />

      <AlertDialogWrapper
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="outline" size="sm">Controlled</Button>}
        title="Do you want to leave page"
        description=""
        action="Proceed"
        onAction={() => setOpen(p => !p)}
      />

      <AlertDialogWrapper
        trigger={<Button variant="outline" size="sm">No Action</Button>}
        action=""
      />
    </>
  )
}
