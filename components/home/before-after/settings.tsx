import { FormProvider, UseFormReturn } from "react-hook-form";

import { CheckboxWrapper, InputWrapper, SelectWrapper, SwitchWrapper } from "@/components/ui/field-wrapper-rhf";

type props = {
  settings: settingObjT
  form: UseFormReturn<any>
}

function Settings({ settings, form }: props) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((d) => console.log(d))}
        className="p-4 space-y-4 border rounded-xl [&_label]:font-normal [&_label]:capitalize"
      >
        {Object.entries(settings).map(([key, value]) => {
          if (value.type === "switch") {
            return (
              <SwitchWrapper
                key={key}
                name={key}
                label={key}
                control={form.control}
              />
            )
          }

          if (value.type === "checkbox") {
            return (
              <CheckboxWrapper
                key={key}
                name={key}
                label={key}
                control={form.control}
                options={value.options}
              />
            )
          }

          if (value.type === "select") {
            return (
              <SelectWrapper
                key={key}
                name={key}
                label={key}
                control={form.control}
                options={value.options}
              />
            )
          }

          return (
            <InputWrapper
              key={key}
              name={key}
              label={key}
              control={form.control}
            />
          )
        })}
      </form>
    </FormProvider>
  )
}

export default Settings
