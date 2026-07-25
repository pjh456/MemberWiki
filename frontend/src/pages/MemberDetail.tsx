import { Link, useParams } from "react-router-dom"
import { Award, CalendarClock, Star, User } from "lucide-react"
import { members, activities, currentUser } from "@/data/mock"
import { Button } from "@/components/ui/button"

export default function MemberDetail() {
  const { id } = useParams()
  const m = members.find((x) => x.id === id)
  const isMe = m?.id === currentUser.id

  if (!m) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Link to="/search" className="text-sm text-muted-foreground hover:text-foreground">
          ← 返回检索
        </Link>
        <p className="rounded-2xl border bg-card p-6 text-muted-foreground">未找到该成员，或资料尚未公开。</p>
      </div>
    )
  }

  const related = activities.filter((a) => a.user === m.name)

  return (
    <div className="space-y-6">
      {/* 头部卡片 */}
      <div className="overflow-hidden rounded-3xl border bg-card">
        <div className="h-28 bg-gradient-to-r from-primary/30 to-primary/5" />
        <div className="px-6 pb-6">
          <div className="-mt-10 flex items-end gap-4">
            <div
              className="flex size-20 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-md"
              style={{ backgroundColor: m.color }}
            >
              {m.initials}
            </div>
            <div className="flex-1 pb-1">
              <h1 className="flex items-center gap-2 text-2xl font-bold">
                {m.name}
                {isMe && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    我
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground">{m.title}</p>
            </div>
            {isMe ? (
              <Button asChild>
                <Link to="/profile/edit">
                  <User className="size-4" />
                  编辑我的资料
                </Link>
              </Button>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                <Star className="size-3.5 text-primary" />
                名人堂成员
              </span>
            )}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{m.bio}</p>
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
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 履历 */}
        <div className="lg:col-span-2 rounded-2xl border bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <CalendarClock className="size-5 text-primary" />
            履历亮点
          </h2>
          <ul className="mt-4 space-y-3">
            {m.resume.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                <span className="text-sm">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 奖项 */}
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Award className="size-5 text-primary" />
            获得奖项
          </h2>
          <div className="mt-4 space-y-2">
            {m.awards.map((a) => (
              <div key={a} className="rounded-xl bg-secondary px-3 py-2 text-sm">
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 相关动态 */}
      {related.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">相关动态</h3>
          <div className="space-y-2">
            {related.map((a) => (
              <Link
                key={a.id}
                to={`/activity/${a.id}`}
                className="flex items-center gap-3 rounded-2xl border bg-card p-4 transition-colors hover:border-primary/40"
              >
                <a.icon className="size-5 text-primary" />
                <p className="text-sm">
                  <span className="font-semibold">{a.user}</span> {a.action}{" "}
                  <span className="font-medium text-primary">{a.target}</span>
                </p>
                <span className="ml-auto text-xs text-muted-foreground">{a.time}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
