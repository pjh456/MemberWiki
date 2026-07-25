import { Link, useParams } from "react-router-dom"
import { ArrowLeft, User } from "lucide-react"
import { activities, members } from "@/data/mock"

export default function ActivityDetail() {
  const { id } = useParams()
  const a = activities.find((x) => x.id === id)

  if (!a) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Link to="/activity" className="text-sm text-muted-foreground hover:text-foreground">
          ← 返回动态
        </Link>
        <p className="rounded-2xl border bg-card p-6 text-muted-foreground">该动态不存在或已被删除。</p>
      </div>
    )
  }

  const related = members.slice(0, 3)

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to="/activity" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        返回动态
      </Link>

      <div className="flex gap-3 rounded-2xl border bg-card p-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <a.icon className="size-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm">
            <span className="font-semibold">{a.user}</span> {a.action}{" "}
            <span className="font-medium text-primary">{a.target}</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{a.time}</p>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border bg-card p-6">
        <h2 className="text-lg font-bold">动态详情</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {a.user} 在「{a.target}」中{a.action}。该动态会同步展示在相关成员的履历时间线中，并通知其关注者。
        </p>
        <div className="rounded-xl bg-secondary px-4 py-3 text-sm">
          审核状态：<span className="font-medium text-primary">已生效</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">相关成员</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {related.map((m) => (
            <Link
              key={m.id}
              to={`/member/${m.id}`}
              className="flex items-center gap-2 rounded-xl border bg-card p-3 transition-colors hover:border-primary/40"
            >
              <div
                className="flex size-9 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: m.color }}
              >
                {m.initials}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{m.name}</div>
                <div className="truncate text-xs text-muted-foreground">{m.title}</div>
              </div>
            </Link>
          ))}
        </div>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <User className="size-3.5" />
          更多成员可在「搜索」中检索。
        </p>
      </div>
    </div>
  )
}
