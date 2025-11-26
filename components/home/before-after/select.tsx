"use client";

import { useForm } from "react-hook-form"
import { SelectWrapper } from "@/components/ui/select"

import { isGroup, isOption, isSeparator } from "@/lib/utils"
import { options as optionsStr } from "./data"
import { filterOpt, indent } from "@/components/home/before-after/before-after"
import { options } from "../../examples/data"

import Wrapper from "./wrapper";

const settings: settingObjT = {
  placeholder: {
    type: "input",
    default: "Select a item...",
    description: "The placeholder text to display when no option is selected.",
  },
  indicatorAt: {
    type: "select",
    default: "right",
    description: "The position of the indicator. Not available in the before version by default.",
    options: ["left", "right"],
  },
  components: {
    type: "checkbox",
    default: [],
    options: [
      "seperator",
      "icon / diff value than label",
      "group",
      "target style",
    ]
  },
  groupCls: {
    type: "switch",
    default: false,
    description: "The class name to apply to the group.",
  }
}

function trans(options: optionsT, level = 2): string {
  const lines: string[] = []

  options.forEach((o) => {
    if (isGroup(o)) {
      lines.push(
        `${indent(level)}<SelectGroup${o.className ? ` className="${o.className}"` : ""}>`,
        `${indent(level + 1)}<SelectLabel>${o.group}</SelectLabel>`,
        trans(o.options, level + 1),
        `${indent(level)}</SelectGroup>`
      )
      return
    }

    if (isOption(o)) {
      lines.push(
        `${indent(level)}<SelectItem value="${o.value}"${o.className ? ` className="${o.className}"` : ""}>${o.label}</SelectItem>`
      )
      return
    }

    if (isSeparator(o)) {
      lines.push("", `${indent(level)}<SelectSeparator />`, "")
      return
    }

    lines.push(
      `${indent(level)}<SelectItem value="${o}">${o}</SelectItem>`
    )
  })

  return lines.join("\n")
}

const newBase = ({
  options,
  placeholder,
}: Pick<afterParams, "options" | "placeholder">) => {
  return `<Select>
  <SelectTrigger>
    <SelectValue placeholder="${placeholder}" />
  </SelectTrigger>

  <SelectContent>
${trans(options, 2)}
  </SelectContent>
</Select>`
}

type afterParams = {
  options: optionsT
  placeholder: string
  indicatorAt: string
  groupCls: boolean
}
const after = ({ options, placeholder, indicatorAt, groupCls }: afterParams) => {
  let base = `const options: optionsT = ${JSON?.stringify?.(options, null, 2)}

<SelectWrapper
  options={options}
  placeholder="${placeholder}"
  indicatorAt="${indicatorAt}"
`

  if (groupCls) {
    base = base + '  groupCls="bg-pink-100"' + "\n"
  }

  base = base + "/>"

  return base
}

export function SelectDemo() {
  const form = useForm({
    defaultValues: {
      placeholder: "Select a item...",
      indicatorAt: "right",
      groupCls: false,
      components: [],
    },
    mode: "onChange",
  })

  const val = form.watch()

  const base = filterOpt(optionsStr, val.components)

  return (
    <Wrapper
      form={form}
      settings={settings}
      before={newBase({
        options: base,
        placeholder: val.placeholder
      })}
      after={after({
        options: base,
        placeholder: val.placeholder,
        indicatorAt: val.indicatorAt,
        groupCls: val.groupCls
      })}
    >
      <SelectWrapper
        options={filterOpt(options, val.components)}
        placeholder={val.placeholder}
        indicatorAt={val.indicatorAt as indicatorAtT}
        groupCls={val.groupCls ? "bg-pink-100" : ""}
        triggerCls="w-52"
      />
    </Wrapper>
  )
}
