import { AccordionWrapper } from "@/components/ui/accordion";
import { accordionItems } from "./data";

export function AccordionExample() {
  return (
    <>
      <AccordionWrapper
        items={accordionItems}
        className="w-96 p-4 border rounded-sm"
      />

      <AccordionWrapper
        items={accordionItems}
        type="multiple"
        className="w-96 p-4 border rounded-sm"
      />
    </>
  )
}
