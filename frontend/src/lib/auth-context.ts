import { createContext, useContext } from "react"

export interface User {
  id: number
  name: string
  email?: string | null
  phone?: string | null
  avatar_url?: string | null
  role?: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (account: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
