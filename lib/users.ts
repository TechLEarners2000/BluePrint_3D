import { promises as fs } from 'fs'
import path from 'path'

export interface User {
  username: string
  password: string
}

const USERS_FILE = path.join(process.cwd(), 'users.json')

export async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, return empty array
    return []
  }
}

export async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
}

export async function addUser(user: User): Promise<boolean> {
  const users = await readUsers()

  // Check if user already exists
  if (users.some(u => u.username === user.username)) {
    return false // User already exists
  }

  users.push(user)
  await writeUsers(users)
  return true
}

export async function findUser(username: string, password: string): Promise<User | null> {
  const users = await readUsers()
  return users.find(u => u.username === username && u.password === password) || null
}
