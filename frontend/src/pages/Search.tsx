import { useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Search as SearchIcon } from "lucide-react"
import { members, searchFilters as filters } from "@/data/mock"
import { cn } from "@/lib/utils"

type Filter = (typeof filters)[number]

export default function Search() {
  const [params, setParams] = useSearchParams()
  const [text, setText] = useState(params.get("q") ?? "")
  const [active, setActive] = useState<Filter>((params.get("f") as Filter) ?? "全部")

  // 关键词仅用于本地即时过滤；按回车或切换筛选项时才写回 URL，
  // 避免逐字改写 URL 导致中文输入法（IME）合成中断、输入框失灵。
  const commit = (q: string, f: Filter) => {
    const next = new URLSearchParams()
    if (q.trim()) next.set("q", q.trim())
    next.set("f", f)
    setParams(next, { replace: true })
  }

  const keyword = text.trim().toLowerCase()
  const results = members.filter(
    (m) =>
      !keyword ||
      m.name.toLowerCase().includes(keyword) ||
      m.title.toLowerCase().includes(keyword) ||
      m.tags.some((t) => t.toLowerCase().includes(keyword)),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3">
        <SearchIcon className="size-5 text-muted-foreground" />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit(text, active)
          }}
          onBlur={() => commit(text, active)}
          placeholder="搜索人物、奖项、履历..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setActive(f)
              commit(text, f)
            }}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              active === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/70",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        共 {results.length} 位人物
        {active !== "全部" && ` · 筛选维度：${active}`}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((m) => (
          <Link
            key={m.id}
            to={`/member/${m.id}`}
            className="group rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex size-12 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ backgroundColor: m.color }}
              >
                {m.initials}
              </div>
              <div>
                <div className="font-semibold">{m.name}</div>
                <div className="text-sm text-muted-foreground">{m.title}</div>
              </div>
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{m.bio}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {m.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
