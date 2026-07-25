import { useState } from "react"
import { Check, X } from "lucide-react"
import { useReviews } from "@/contexts/ReviewsContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function AdminReview() {
  const { reviews, approve, reject } = useReviews()
  const [msg, setMsg] = useState<{ kind: "ok" | "no"; text: string } | null>(null)

  const flash = (kind: "ok" | "no", text: string) => {
    setMsg({ kind, text })
    window.setTimeout(() => setMsg(null), 2500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">管理员审核</h1>
        <p className="text-sm text-muted-foreground">
          仅管理员角色可访问 · 待审核的履历、奖项与人物变更
        </p>
      </div>

      {msg && (
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-2 text-sm",
            msg.kind === "ok" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive",
          )}
        >
          {msg.kind === "ok" ? <Check className="size-4" /> : <X className="size-4" />}
          {msg.text}
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">
          暂无待审核内容。
        </p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-2xl border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-11 items-center justify-center rounded-full text-base font-bold text-white"
                    style={{ backgroundColor: r.color }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-sm text-muted-foreground">{r.summary}</div>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {r.type}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{r.detail}</p>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    reject(r.id)
                    flash("no", `已驳回：${r.name} 的提交`)
                  }}
                >
                  <X className="size-4" />
                  驳回
                </Button>
                <Button
                  onClick={() => {
                    approve(r.id)
                    flash("ok", `已通过：${r.name} 的提交`)
                  }}
                >
                  <Check className="size-4" />
                  通过
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
