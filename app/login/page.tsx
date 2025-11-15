"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

type LoginForm = {
  username: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    setError("")
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        // Use full-page navigation to ensure session cookie is sent
        if (typeof window !== "undefined") {
          window.location.href = "/dashboard"
        }
      } else {
        const d = await res.json()
        setError(d.message || "Login failed")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md glass-card">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register("username")} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} required />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted">
              Don't have an account? <Link href="/register" className="text-primary hover:opacity-80">Register</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
