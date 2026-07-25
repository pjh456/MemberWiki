import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface AppSettings {
  profile: { name: string; title: string; bio: string; location: string; email: string }
  notifications: { dynamic: boolean; review: boolean }
  privacy: { twoFactor: boolean }
  permissions: { role: "member" | "admin"; scope: "all" | "own" }
}

const STORAGE_KEY = "mw-settings"

const defaults: AppSettings = {
  profile: {
    name: "林清扬",
    title: "2023 届会长 · 前端工程师",
    bio: "主导社团技术中台建设，长期活跃于前端开源社区。",
    location: "深圳",
    email: "linqy@memberwiki.org",
  },
  notifications: { dynamic: true, review: true },
  privacy: { twoFactor: false },
  permissions: { role: "member", scope: "all" },
}

function load(): AppSettings {
  if (typeof window === "undefined") return defaults
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults
    return { ...defaults, ...JSON.parse(raw) }
  } catch {
    return defaults
  }
}

interface Ctx extends AppSettings {
  setProfile: (p: Partial<AppSettings["profile"]>) => void
  setNotifications: (n: Partial<AppSettings["notifications"]>) => void
  setPrivacy: (p: Partial<AppSettings["privacy"]>) => void
  setPermissions: (p: Partial<AppSettings["permissions"]>) => void
}

const SettingsContext = createContext<Ctx | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(load)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const value: Ctx = {
    ...settings,
    setProfile: (p) => setSettings((s) => ({ ...s, profile: { ...s.profile, ...p } })),
    setNotifications: (n) => setSettings((s) => ({ ...s, notifications: { ...s.notifications, ...n } })),
    setPrivacy: (p) => setSettings((s) => ({ ...s, privacy: { ...s.privacy, ...p } })),
    setPermissions: (p) => setSettings((s) => ({ ...s, permissions: { ...s.permissions, ...p } })),
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error("useSettings 必须在 SettingsProvider 内部使用")
  return ctx
}
