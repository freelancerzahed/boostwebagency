import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface User {
  id: string
  username: string
  email: string
  role: string
  name: string
}

// Demo admin users
const DEMO_USERS: User[] = [
  {
    id: "1",
    username: "jahed",
    email: "jahed@admin.com",
    role: "Super Admin",
    name: "Jahed Rahman",
  },
  {
    id: "2",
    username: "admin",
    email: "admin@admin.com",
    role: "Admin",
    name: "Admin User",
  },
  {
    id: "3",
    username: "manager",
    email: "manager@admin.com",
    role: "Manager",
    name: "Manager User",
  },
  {
    id: "4",
    username: "editor",
    email: "editor@admin.com",
    role: "Editor",
    name: "Editor User",
  },
]

export async function validateCredentials(username: string, password: string): Promise<User | null> {
  // Demo password validation
  const passwordMap: Record<string, string> = {
    jahed: "1234",
    admin: "admin123",
    manager: "manager456",
    editor: "editor123",
  }

  if (passwordMap[username] === password) {
    return DEMO_USERS.find((user) => user.username === username) || null
  }

  return null
}

export async function createSession(user: User) {
  const cookieStore = await cookies()
  cookieStore.set("admin-session", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin-session")

    if (!sessionCookie?.value) {
      return null
    }

    return JSON.parse(sessionCookie.value)
  } catch {
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getSession()

  if (!user) {
    redirect("/admin/login")
  }

  return user
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete("admin-session")
}
