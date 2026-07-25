import { Outlet, NavLink } from "react-router-dom"
import {
  Activity,
  FileEdit,
  Home,
  LogOut,
  Search,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { GlobalSearch } from "@/components/GlobalSearch"

const navItems = [
  { to: "/", label: "首页", icon: Home, end: true },
  { to: "/search", label: "搜索", icon: Search },
  { to: "/activity", label: "动态", icon: Activity },
  { to: "/profile", label: "我的履历", icon: User },
  { to: "/drafts", label: "草稿箱", icon: FileEdit },
  { to: "/settings", label: "设置", icon: Settings },
  { to: "/admin/review", label: "管理员审核", icon: ShieldCheck },
]

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* 左侧竖排侧边栏 */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-2 px-5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            名
          </div>
          <span className="text-lg font-bold">名人堂百科</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )
              }
            >
              <item.icon className="size-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t p-3">
          <NavLink
            to="/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="size-5" />
            退出登录
          </NavLink>
        </div>
      </aside>

      {/* 右侧：顶部搜索栏 + 内容区 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur md:px-8">
          <GlobalSearch />
        </header>

        <main className="flex-1 px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
