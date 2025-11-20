import { Slash } from "lucide-react";
import { type breadcrumbItemsT, BreadcrumbWrapper } from "../ui/breadcrumb";

export function BreadcrumbExample() {
  const items: breadcrumbItemsT = [
    { label: "Home", href: "/docs/shadcn-wrappers/breadcrumb" },
    "Store",
    "Products",
    "Electronics",
    "Computers",
    "Laptops",
    "Apple",
    "MacBook",
    "MacBook Air",
    "M3 2025 Edition"
  ]

  return (
    <div>
      <BreadcrumbWrapper
        items={items}
        itemsAfterCollapse={2}
      />

      <BreadcrumbWrapper
        items={items}
        collapseType="dropdown"
        itemsAfterCollapse={2}
        separator={<Slash />}
      />
    </div>
  )
}
