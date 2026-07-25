import { useState, type ReactNode } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Bell, Check, Lock, ShieldCheck, User } from "lucide-react"
import { useSettings } from "@/contexts/SettingsContext"
import { useReviews } from "@/contexts/ReviewsContext"
import { Toggle } from "@/components/Toggle"
import { Button } from "@/components/ui/button"

const sections = {
  account: { title: "账号资料", desc: "昵称、头像、简介", icon: User },
  notifications: { title: "通知设置", desc: "动态与审核提醒", icon: Bell },
  privacy: { title: "隐私与安全", desc: "密码、登录设备", icon: Lock },
  permissions: { title: "权限管理", desc: "角色与审核范围", icon: ShieldCheck },
} as const

type SectionKey = keyof typeof sections

const inputCls =
  "w-full rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm outline-none focus:border-primary placeholder:text-muted-foreground"

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  )
}

function Row({ label, desc, children }: { label: string; desc: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      {children}
    </div>
  )
}

export default function SettingsPanel() {
  const { section = "account" } = useParams()
  const key = (section as SectionKey) in sections ? (section as SectionKey) : "account"
  const meta = sections[key]
  const s = useSettings()
  const reviews = useReviews()
  const [saved, setSaved] = useState(false)
  const [account, setAccount] = useState({
    name: s.profile.name,
    title: s.profile.title,
    bio: s.profile.bio,
    location: s.profile.location,
    email: s.profile.email,
  })

  const flash = (msg = "已保存更改") => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
    return msg
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to="/settings" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        返回设置
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
          <meta.icon className="size-4" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{meta.title}</h1>
          <p className="text-sm text-muted-foreground">{meta.desc}</p>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm text-primary">
          <Check className="size-4" /> {saved}
        </div>
      )}

      {key === "account" && (
        <div className="space-y-4 rounded-2xl border bg-card p-6">
          <Field label="昵称">
            <input className={inputCls} value={account.name} onChange={(e) => setAccount((f) => ({ ...f, name: e.target.value }))} />
          </Field>
          <Field label="头衔">
            <input className={inputCls} value={account.title} onChange={(e) => setAccount((f) => ({ ...f, title: e.target.value }))} />
          </Field>
          <Field label="简介">
            <textarea rows={3} className={inputCls} value={account.bio} onChange={(e) => setAccount((f) => ({ ...f, bio: e.target.value }))} />
          </Field>
          <Field label="所在地">
            <input className={inputCls} value={account.location} onChange={(e) => setAccount((f) => ({ ...f, location: e.target.value }))} />
          </Field>
          <Field label="邮箱">
            <input className={inputCls} value={account.email} onChange={(e) => setAccount((f) => ({ ...f, email: e.target.value }))} />
          </Field>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              onClick={() => {
                reviews.submitProfileEdit(account)
                flash("已提交审核，通过后对全员生效")
              }}
            >
              提交审核
            </Button>
            <span className="text-xs text-muted-foreground">修改将进入审核队列，管理员通过后才会生效</span>
          </div>
        </div>
      )}

      {key === "notifications" && (
        <div className="space-y-2 rounded-2xl border bg-card p-6">
          <Row label="动态提醒" desc="关注成员有新的动态时通知我">
            <Toggle
              checked={s.notifications.dynamic}
              onChange={(v) => {
                s.setNotifications({ dynamic: v })
                flash()
              }}
            />
          </Row>
          <Row label="审核提醒" desc="有提交等待我审核时通知我">
            <Toggle
              checked={s.notifications.review}
              onChange={(v) => {
                s.setNotifications({ review: v })
                flash()
              }}
            />
          </Row>
        </div>
      )}

      {key === "privacy" && (
        <div className="space-y-4 rounded-2xl border bg-card p-6">
          <Row label="两步验证" desc="登录时需要额外的验证码">
            <Toggle
              checked={s.privacy.twoFactor}
              onChange={(v) => {
                s.setPrivacy({ twoFactor: v })
                flash()
              }}
            />
          </Row>
          <Field label="修改密码">
            <input type="password" className={inputCls} placeholder="输入新密码" />
          </Field>
          <Button onClick={() => flash()}>更新密码</Button>
        </div>
      )}

      {key === "permissions" && (
        <div className="space-y-4 rounded-2xl border bg-card p-6">
          <Field label="角色">
            <select
              className={inputCls}
              value={s.permissions.role}
              onChange={(e) => s.setPermissions({ role: e.target.value as "member" | "admin" })}
            >
              <option value="member">普通成员</option>
              <option value="admin">管理员</option>
            </select>
          </Field>
          <Field label="审核范围">
            <select
              className={inputCls}
              value={s.permissions.scope}
              onChange={(e) => s.setPermissions({ scope: e.target.value as "all" | "own" })}
            >
              <option value="all">全部成员</option>
              <option value="own">仅自己</option>
            </select>
          </Field>
          <Button onClick={() => flash()}>保存权限</Button>
        </div>
      )}
    </div>
  )
}
