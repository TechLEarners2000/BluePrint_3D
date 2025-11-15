import { NextRequest, NextResponse } from "next/server"
import { addUser } from "@/lib/users"
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

    // Validate username length
    if (username.length < 3) {
      return NextResponse.json(
        { message: "Username must be at least 3 characters" },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    // Add user to database
    const success = await addUser({ username, password })

    if (!success) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 }
      )
    }

    // Also create session on successful registration
    const sessionId = await createSession(username)
    const res = NextResponse.json({ message: "Registration successful", sessionId })
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
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
