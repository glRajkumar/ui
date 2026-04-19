'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/query-client'

type props = {
  children: React.ReactNode
}

function ClientWrapper({ children }: props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ClientWrapper
