"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  // Show Sun when in light mode (indicates current mode), Moon when dark.
  const isLight = resolvedTheme === "light"

  return (
    <Button
      aria-label={isLight ? "Light mode" : "Dark mode"}
      variant={isLight ? "default" : "ghost"}
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`w-10 h-10 p-0 ${isLight ? "bg-primary text-primary-foreground hover:opacity-95" : ""}`}
    >
      {isLight ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
