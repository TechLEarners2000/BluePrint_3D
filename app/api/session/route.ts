import { NextRequest, NextResponse } from "next/server"
import { findSession } from "@/lib/sessions"

export async function GET(request: NextRequest) {
  try {
    // Use Next.js cookies() to properly parse cookies
    const cookieHeader = request.headers.get("cookie") || ""
    const cookieArray = cookieHeader.split(";")
    
    let sessionId = ""
    for (const cookie of cookieArray) {
      const [key, value] = cookie.split("=")
      if (key?.trim() === "sessionId") {
        sessionId = decodeURIComponent(value?.trim() || "")
        break
      }
    }

    if (!sessionId) {
      return NextResponse.json({ authenticated: false })
    }

    const session = await findSession(sessionId)
    if (!session) {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({ authenticated: true, username: session.username })
  } catch (err) {
    console.error("session error", err)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
