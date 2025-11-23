import { CircleHelpIcon } from "lucide-react"

import { NavigationMenuWrapper, NavLinkItem, NavList } from "@/components/ui/navigation-menu-wrapper"

export function NavigationMenuExample() {
  return (
    <NavigationMenuWrapper
      items={[
        {
          key: "home",
          trigger: "Home",
          content: (
            <div className="p-2 w-[250px]">
              <NavList
                items={[
                  { href: "/", children: "Dashboard" },
                  { href: "/about", children: "About Us" },
                ]}
              />
            </div>
          ),
        }, {
          key: "pricing",
          href: "/pricing",
          children: "Pricing",
        },
        {
          key: "features",
          trigger: "Features",
          content: (
            <div className="p-2 w-[300px]">
              <div className="text-lg font-semibold">Product Features</div>

              <NavList
                items={[
                  { href: "/fast", children: "Fast Performance" },
                  { href: "/secure", children: "Secure Infrastructure" },
                  {
                    href: "/todo",
                    children: <><CircleHelpIcon className="size-4" /> Backlog</>,
                  },
                ]}
              />

              <NavLinkItem href="/dashbard" >
                Dashboard
              </NavLinkItem>
            </div>
          ),
        }
      ]}
    />
  )
}
