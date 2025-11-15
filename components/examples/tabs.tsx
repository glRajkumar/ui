import { User } from "lucide-react";

import { TabsWrapper } from "../ui/tabs";

export function TabsExample() {
  return (
    <TabsWrapper
      defaultValue="overview"
      className="w-80"
      tabs={[
        {
          value: "overview",
          label: "Overview",
          content: (
            <div>
              <h3 className="text-lg font-semibold mb-2">Welcome</h3>
              <p>This is the overview tab content.</p>
            </div>
          ),
        },
        {
          value: "details",
          label: <><User /> Details</>,
          content: (
            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <p>More detailed information here.</p>
            </div>
          ),
        },
      ]}
    />
  )
}
