import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function VerifyCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""])

  const setChar = (i: number, v: string) => {
    const next = [...code]
    next[i] = v.replace(/\D/g, "").slice(-1)
    setCode(next)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-3xl border bg-card p-8 text-center shadow-sm">
        <h1 className="text-xl font-bold">输入验证码</h1>
        <p className="mt-1 text-sm text-muted-foreground">我们已向你的邮箱发送 6 位验证码</p>
        <div className="mt-6 flex justify-center gap-2">
          {code.map((c, i) => (
            <input
              key={i}
              value={c}
              onChange={(e) => setChar(i, e.target.value)}
              inputMode="numeric"
              maxLength={1}
              className="size-12 rounded-xl border bg-muted/40 text-center text-lg font-semibold outline-none focus:border-primary"
            />
          ))}
        </div>
        <Button className="mt-6 w-full">验证并继续</Button>
        <p className="mt-4 text-xs text-muted-foreground">
          没有收到？
          <button type="button" className="text-primary hover:underline">
            重新发送
          </button>
        </p>
      </div>
    </div>
  )
}
