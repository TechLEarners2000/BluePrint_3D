import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { findUser } from "@/lib/users"
import { createSession } from "@/lib/sessions"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      )
    }

    // Check credentials
    const user = await findUser(username, password)

    if (!user) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      )
    }

    // Create a server-side session and assign HTTP-only session cookie
    const sessionId = await createSession(username)

    const res = NextResponse.json({ message: "Login successful", sessionId })
    const isProduction = process.env.NODE_ENV === "production"
    res.cookies.set({
      name: "sessionId",
      value: sessionId,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return res
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
