import type { Metadata } from 'next'
import { RootProvider } from 'fumadocs-ui/provider/next'
import './globals.css'

import ClientWrapper from '@/components/common/client-wrapper'

export const metadata: Metadata = {
  title: 'Glrk UI',
  description: 'Reusable UI components',
  authors: [{ name: 'Raj kumar', url: 'https://glrk.dev' }],
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased">
        <RootProvider>
          <ClientWrapper>
            <div className="isolate">{children}</div>
          </ClientWrapper>
        </RootProvider>
      </body>
    </html>
  )
}

export default RootLayout
