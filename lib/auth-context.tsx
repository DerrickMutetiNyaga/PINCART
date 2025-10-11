"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  name: string
  phone: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (phone: string, name?: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("pinkcart_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (phone: string, name?: string) => {
    // Mock authentication - in real app, this would call an API
    const userData: User = {
      name: name || "User",
      phone,
    }
    localStorage.setItem("pinkcart_user", JSON.stringify(userData))
    setUser(userData)
  }

  const signOut = () => {
    localStorage.removeItem("pinkcart_user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
