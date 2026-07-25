import { Link } from "react-router-dom"
import { Eye, FileEdit, Send, Trash2, Undo2 } from "lucide-react"
import { useReviews } from "@/contexts/ReviewsContext"
import { Button } from "@/components/ui/button"

export default function Drafts() {
  const { drafts, removeDraft, submitDraft, withdrawDraft } = useReviews()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">草稿箱</h1>
      <div className="space-y-3">
        {drafts.map((d) => (
          <div key={d.id} className="rounded-2xl border bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold">{d.title}</div>
                <div className="text-sm text-muted-foreground">最后编辑 · {d.updatedAt}</div>
              </div>
              <span
                className={
                  d.submitted
                    ? "rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                    : "rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                }
              >
                {d.submitted ? "审核中" : "草稿"}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {d.submitted ? (
                <>
                  <Button variant="outline">
                    <Eye className="size-4" />
                    查看
                  </Button>
                  <Button variant="ghost" onClick={() => withdrawDraft(d.id)}>
                    <Undo2 className="size-4" />
                    撤回
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/profile/edit">
                      <FileEdit className="size-4" />
                      继续编辑
                    </Link>
                  </Button>
                  <Button onClick={() => submitDraft(d.id)}>
                    <Send className="size-4" />
                    提交审核
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => removeDraft(d.id)}
                  >
                    <Trash2 className="size-4" />
                    删除
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
