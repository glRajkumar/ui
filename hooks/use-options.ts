"use client";

import { asyncOptions } from "@/components/examples/data";
import { useQuery } from "@tanstack/react-query";

type optsT = { queryKey?: string, n?: number, delayBy?: number }
export function useAsyncOptions({ queryKey = "async-options", ...rest }: optsT = {}) {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => asyncOptions(rest),
  })
}
