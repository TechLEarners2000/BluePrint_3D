"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [username, setUsername] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    // Get username from cookie (client-side)
    // Fetch session info from the server-side session endpoint
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session")
        if (!res.ok) return
        const data = await res.json()
        if (data?.authenticated) setUsername(data.username)
      } catch (err) {
        // ignore
      }
    }

    fetchSession()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        router.push("/login")
      } else {
        console.error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header with user info and logout */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome{username ? `, ${username}` : ""}!</h1>
            <p className="text-muted">Transform your 2D blueprints into immersive 3D models</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card bg-card p-6 rounded-lg shadow-md border border-border">
            <div className="card-icon text-4xl mb-4">📐</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Automatic Conversion</h3>
            <p className="text-muted">Transform 2D blueprints into 3D models with minimal user supervision using our advanced algorithms.</p>
          </div>

          <div className="card bg-card p-6 rounded-lg shadow-md border border-border">
            <div className="card-icon text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Parameter Input Support</h3>
            <p className="text-muted">Specify dimensions, staircases, entry/exit points, and other custom details for precise modeling.</p>
          </div>

          <div className="card bg-card p-6 rounded-lg shadow-md border border-border">
            <div className="card-icon text-4xl mb-4">🚶</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">3D Walkthrough Simulations</h3>
            <p className="text-muted">Experience full navigation and immersive visualization of your architectural designs.</p>
          </div>

          <div className="card bg-card p-6 rounded-lg shadow-md border border-border">
            <div className="card-icon text-4xl mb-4">📡</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Offline Functionality</h3>
            <p className="text-muted">Works without internet once installed, ensuring uninterrupted workflow in any environment.</p>
          </div>

          <div className="card bg-card p-6 rounded-lg shadow-md border border-border">
            <div className="card-icon text-4xl mb-4">🛰️</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Satellite & Map Integration</h3>
            <p className="text-muted">Enhance realism with satellite imagery and offline Google Maps integration.</p>
          </div>

          <div className="card bg-card p-6 rounded-lg shadow-md border border-border">
            <div className="card-icon text-4xl mb-4">📤</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Export Options</h3>
            <p className="text-muted">Export models in standard formats (OBJ, FBX, etc.) for reuse in other applications.</p>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="text-center">
          <Link href="/converter">
            <Button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
              Get Started - Upload Blueprint
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
