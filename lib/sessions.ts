import crypto from "crypto"

type Session = {
  id: string
  username: string
  createdAt: number
}

// In-memory session store (dev/test only; use Redis or DB in production)
const sessions = new Map<string, Session>()

export async function createSession(username: string): Promise<string> {
  const id = crypto.randomBytes(16).toString("hex")
  sessions.set(id, { id, username, createdAt: Date.now() })
  return id
}

export async function findSession(id: string): Promise<Session | null> {
  return sessions.get(id) || null
}

export async function destroySession(id: string): Promise<void> {
  sessions.delete(id)
}
