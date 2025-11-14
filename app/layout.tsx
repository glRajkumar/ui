import type { Metadata } from "next";
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from "next/font/google";
import "./globals.css";

import ClientWrapper from "@/components/common/client-wrapper";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Glrk UI",
  description: "Reusable UI components",
  authors: [{ name: "Raj kumar", url: "https://glrk.dev" }]
}

function RootLayout({ children }: readOnlyChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`flex flex-col min-h-screen ${interSans.variable} antialiased`}>
        <RootProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </RootProvider>
      </body>
    </html>
  )
}

export default RootLayout
