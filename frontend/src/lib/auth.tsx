import { useState, useEffect, type ReactNode, useCallback } from "react"
import api from "./api"
import { AuthContext, type User } from "./auth-context"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem("user_id")))

  useEffect(() => {
    const userId = localStorage.getItem("user_id")
    if (!userId) {
      return
    }
    api.get("/users/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("user_id")
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (account: string, password: string) => {
    const { data } = await api.post("/auth/login", { account, password })
    localStorage.setItem("access_token", data.access_token)
    localStorage.setItem("user_id", String(data.user.id))
    setUser(data.user)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user_id")
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
