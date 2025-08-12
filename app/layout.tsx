import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider as NextThemeProvider } from "@/components/theme-provider"
import { ThemeProvider } from "@/lib/themes/theme-context"
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BevRate - Beverage Reviews & Ratings",
  description:
    "Discover, rate, and review your favorite beverages. Connect with fellow beverage enthusiasts and share your taste experiences.",
  keywords: "beverage, reviews, ratings, coffee, tea, drinks, taste, recommendations",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeProvider>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main>{children}</main>
              <Toaster />
            </div>
          </ThemeProvider>
        </NextThemeProvider>
      </body>
    </html>
  )
}
