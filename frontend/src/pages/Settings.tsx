import { Bell, Lock, ShieldCheck, User } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/ThemeToggle"

const rows = [
  { to: "/settings/account", icon: User, label: "账号资料", desc: "昵称、头像、简介" },
  { to: "/settings/notifications", icon: Bell, label: "通知设置", desc: "动态与审核提醒" },
  { to: "/settings/privacy", icon: Lock, label: "隐私与安全", desc: "密码、登录设备" },
  { to: "/settings/permissions", icon: ShieldCheck, label: "权限管理", desc: "角色与审核范围" },
]

export default function Settings() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">设置</h1>

      {/* 外观 / 主题 —— 两个按钮（太阳/月亮图标在上，日间/夜间文字在下） */}
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="font-semibold">外观</div>
        <ThemeToggle variant="stack" />
      </div>
      <div className="mt-1 text-sm text-muted-foreground">
      </div>
    </div>

      <div className="divide-y rounded-2xl border bg-card">
        {rows.map((r) => (
          <Link
            key={r.to}
            to={r.to}
            className="flex items-center gap-3 p-4 transition-colors hover:bg-muted"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <r.icon className="size-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{r.label}</div>
              <div className="text-xs text-muted-foreground">{r.desc}</div>
            </div>
            <span className="text-lg text-muted-foreground">›</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
