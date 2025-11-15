"use client";

import { useState } from "react";

import { DialogWrapper } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DialogExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DialogWrapper
        trigger={<Button variant="outline" size="sm">Delete</Button>}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      />

      <DialogWrapper
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="outline" size="sm">Controlled</Button>}
        title="Do you want to leave page"
        description=""
        action="Proceed"
        onAction={() => setOpen(p => !p)}
      />

      <DialogWrapper
        trigger={<Button variant="outline" size="sm">No Action</Button>}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      />
    </>
  )
}
