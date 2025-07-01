import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"  // Add this import

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ishimwe Tresor | Full-Stack Developer",
  description: "Portfolio of Ishimwe Tresor, a full-stack developer specializing in web and mobile applications.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Toaster />  {/* Add this component */}
        </ThemeProvider>
      </body>
    </html>
  )
}