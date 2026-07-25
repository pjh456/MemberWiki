import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"

type Variant = "stack" | "segment"

export function ThemeToggle({
  variant = "segment",
  className,
}: {
  variant?: Variant
  className?: string
}) {
  const { theme, setTheme } = useTheme()

  // 设置页使用：太阳/月亮图标在上，日间/夜间文字在下
  if (variant === "stack") {
    const opts = [
      { t: "light" as const, Icon: Sun, label: "日间" },
      { t: "dark" as const, Icon: Moon, label: "夜间" },
    ]
    return (
      <div role="group" aria-label="日间 / 夜间模式" className={cn("inline-flex gap-3", className)}>
        {opts.map(({ t, Icon, label }) => {
          const sel = theme === t
          return (
            <button
              key={t}
              type="button"
              aria-pressed={sel}
              onClick={() => setTheme(t)}
              className={cn(
                "flex w-20 flex-col items-center justify-center gap-1.5 rounded-2xl border py-3 transition-colors",
                sel
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon className="size-6" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    )
  }

  // 通用分段控件（水平）
  const base =
    "flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-1.5 text-sm font-medium transition-colors"
  const active = "bg-primary text-primary-foreground"
  const idle = "text-muted-foreground hover:text-foreground"

  return (
    <div
      role="group"
      aria-label="日间 / 夜间模式"
      className={cn("inline-flex w-[128px] rounded-2xl bg-muted p-1", className)}
    >
      <button
        type="button"
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
        className={cn(base, theme === "light" ? active : idle)}
      >
        <Sun className="size-4" />
        日间
      </button>
      <button
        type="button"
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
        className={cn(base, theme === "dark" ? active : idle)}
      >
        <Moon className="size-4" />
        夜间
      </button>
    </div>
  )
}
