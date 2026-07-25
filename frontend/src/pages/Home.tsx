import { Link } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"
import { members, stats } from "@/data/mock"

export default function Home() {
  const featured = members.slice(0, 6)

  return (
    <div className="space-y-6">
      {/* 欢迎横幅 (bento) */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/15 via-card to-card p-8">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            去中心化的记忆中枢
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">名人堂百科</h1>
          <p className="mt-2 text-muted-foreground">
            为当届与往届成员提供一个展示履历、促进交流、跨届合作的平台。检索人物、奖项与履历亮点，构建属于社团的中心化记忆。
          </p>
          <Link
            to="/search"
            className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            开始检索
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-primary/10 blur-2xl" />
      </section>

      {/* 统计卡片 */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-4">
            <s.icon className="size-5 text-primary" />
            <div className="mt-3 text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      {/* 精选成员 */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">精选成员</h2>
          <Link to="/search" className="text-sm font-medium text-primary hover:underline">
            查看全部
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((m) => (
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
      </section>
    </div>
  )
}
