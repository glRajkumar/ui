import { options } from "./data";

import { SelectWrapper } from "@/components/ui/select";
import Wrapper from "./wrapper";

function SelectExample() {
  return (
    <Wrapper>
      <SelectWrapper
        options={options}
      />
    </Wrapper>
  )
}

export default SelectExample
