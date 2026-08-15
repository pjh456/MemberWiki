import { Outlet, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"

export default function MainLayout() {
  const { user, login, logout } = useAuth()
  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin() {
    try {
      await login(account, password)
      setAccount("")
      setPassword("")
    } catch {
      alert("登录失败，请检查账号和密码")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">W</div>
            <h1 className="text-xl font-bold text-slate-800">名人堂百科</h1>
          </div>

          <nav className="space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/">首页检索</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/profile">我的履历</Link>
            </Button>
            {user ? (
              <div className="inline-flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{user.name}</span>
                <Button variant="outline" onClick={logout}>退出</Button>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2">
                <input
                  type="text"
                  placeholder="账号"
                  value={account}
                  onChange={e => setAccount(e.target.value)}
                  className="w-28 rounded border px-2 py-1 text-sm"
                />
                <input
                  type="password"
                  placeholder="密码"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-28 rounded border px-2 py-1 text-sm"
                />
                <Button onClick={handleLogin}>登录</Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
