import { useState } from "react"
import { Link } from "react-router-dom"
import { Lock, Mail, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login")

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-3xl border bg-card p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
            名
          </div>
          <h1 className="mt-4 text-xl font-bold">名人堂百科</h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login" ? "登录你的账号" : "创建新账号"}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-xl bg-muted p-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={mode === "login" ? "rounded-lg bg-card py-2 shadow-sm" : "py-2 text-muted-foreground"}
          >
            登录
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={
              mode === "register" ? "rounded-lg bg-card py-2 shadow-sm" : "py-2 text-muted-foreground"
            }
          >
            注册
          </button>
        </div>

        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2.5">
            <Mail className="size-4 text-muted-foreground" />
            <input
              placeholder="邮箱"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2.5">
            <Lock className="size-4 text-muted-foreground" />
            <input
              type="password"
              placeholder="密码"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          {mode === "register" && (
            <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2.5">
              <UserPlus className="size-4 text-muted-foreground" />
              <input
                placeholder="昵称"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          )}
          <Button type="submit" className="w-full">
            {mode === "login" ? "登录" : "注册"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          继续即表示同意 <Link to="/" className="text-primary hover:underline">服务条款</Link>
        </p>
      </div>
    </div>
  )
}
