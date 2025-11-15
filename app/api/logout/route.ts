import { NextRequest, NextResponse } from "next/server"
import { destroySession } from "@/lib/sessions"

export async function POST(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie") || ""
    const cookies = Object.fromEntries(cookieHeader.split(";").map((c) => {
      const [k, v] = c.split("=")
      return [k?.trim(), v]
    }))

    const sessionId = cookies["sessionId"]
    if (sessionId) {
      await destroySession(sessionId)
    }

    const res = NextResponse.json({ message: "Logged out" })
    res.cookies.set({ name: "sessionId", value: "", maxAge: 0, path: "/" })
    return res
  } catch (err) {
    console.error("Logout error", err)
    return NextResponse.json({ message: "Logout failed" }, { status: 500 })
  }
}
