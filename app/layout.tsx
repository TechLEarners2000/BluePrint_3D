import React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeToggle from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "3D Converter",
  description: "Convert 2D images to 3D models",
  generator: "v0.dev",
  icons: {
    icon: "/logo.png",
  },
}

// ThemeToggle is a client component in components/theme-toggle.tsx

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <header className="backdrop-blur-sm bg-white/70 dark:bg-black/60 border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center gap-3">
                  <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-md" />
                  <span className="text-lg font-semibold">3D Converter</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-2">
                  <Link href="/converter" className="px-3 py-2 rounded-md hover:bg-card text-foreground">Converter</Link>
                  <Link href="/creations" className="px-3 py-2 rounded-md hover:bg-card text-foreground">Creations</Link>
                  <Link href="/dashboard" className="px-3 py-2 rounded-md hover:bg-card text-foreground">Dashboard</Link>
                </nav>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
