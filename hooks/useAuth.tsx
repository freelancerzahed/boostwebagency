"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

const USERS_STORAGE_KEY = "app_users"
const CURRENT_USER_KEY = "current_user"

function getStoredUsers(): Array<User & { password: string }> {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(USERS_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

function saveUsers(users: Array<User & { password: string }>) {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(CURRENT_USER_KEY)
  return stored ? JSON.parse(stored) : null
}

function setCurrentUser(user: User | null) {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true)

      const users = getStoredUsers()
      const foundUser = users.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        setCurrentUser(userWithoutPassword)
        return { success: true }
      }

      return { success: false, message: "Invalid email or password" }
    } catch (error) {
      console.error("Login failed:", error)
      return { success: false, message: "Login failed" }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterData): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true)

      const { name, email, password, phone } = data

      if (!name || !email || !password) {
        return { success: false, message: "Name, email, and password are required" }
      }

      if (password.length < 8) {
        return { success: false, message: "Password must be at least 8 characters long" }
      }

      const users = getStoredUsers()

      // Check if user already exists
      if (users.some((u) => u.email === email)) {
        return { success: false, message: "User with this email already exists" }
      }

      // Create new user
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        name,
        email,
        password, // In production, this should be hashed
        phone,
        avatar: "",
      }

      users.push(newUser)
      saveUsers(users)

      // Log the user in
      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      setCurrentUser(userWithoutPassword)

      return { success: true }
    } catch (error) {
      console.error("Registration failed:", error)
      return { success: false, message: "Registration failed" }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setUser(null)
      setCurrentUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true)

      if (!user) return false

      const users = getStoredUsers()
      const userIndex = users.findIndex((u) => u.id === user.id)

      if (userIndex === -1) return false

      const updatedUser = { ...users[userIndex], ...data }
      users[userIndex] = updatedUser
      saveUsers(users)

      const { password: _, ...userWithoutPassword } = updatedUser
      setUser(userWithoutPassword)
      setCurrentUser(userWithoutPassword)

      return true
    } catch (error) {
      console.error("Profile update failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
