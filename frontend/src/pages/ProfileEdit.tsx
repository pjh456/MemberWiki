import { useState, type ReactNode } from "react"
import { Check, Save, Send, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/contexts/SettingsContext"
import { useReviews } from "@/contexts/ReviewsContext"
import { defaultProfileEdit } from "@/data/mock"

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

export default function ProfileEdit() {
  const { profile } = useSettings()
  const reviews = useReviews()
  const [form, setForm] = useState(defaultProfileEdit)
  const [saved, setSaved] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const dirty =
    form.name !== defaultProfileEdit.name ||
    form.title !== defaultProfileEdit.title ||
    form.bio !== defaultProfileEdit.bio ||
    form.resume !== defaultProfileEdit.resume

  const set = (k: keyof typeof defaultProfileEdit, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    setSaved(false)
    setSubmitted(false)
  }

  const onSave = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  const onSubmit = () => {
    reviews.submitProfileEdit({
      name: form.name,
      title: form.title,
      bio: form.bio,
      location: profile.location,
      email: profile.email,
    })
    setSubmitted(true)
    window.setTimeout(() => setSubmitted(false), 2500)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">编辑资料</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onSave} disabled={!dirty}>
            {saved ? <Check className="size-4" /> : <Save className="size-4" />}
            {saved ? "已保存" : "保存草稿"}
          </Button>
          <Button onClick={onSubmit} disabled={!dirty}>
            <Send className="size-4" />
            提交审核
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm text-primary">
          <Check className="size-4" /> 已提交审核，等待管理员处理。
        </div>
      )}

      <div className="space-y-4 rounded-2xl border bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="姓名">
            <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="你的姓名" />
          </Field>
          <Field label="头衔">
            <input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="如：前端工程师" />
          </Field>
        </div>
        <Field label="简介">
          <textarea rows={3} className={inputCls} value={form.bio} onChange={(e) => set("bio", e.target.value)} placeholder="支持 Markdown 的个人简介..." />
        </Field>
        <Field label="履历亮点（每行一条）">
          <textarea
            rows={4}
            className={inputCls}
            value={form.resume}
            onChange={(e) => set("resume", e.target.value)}
            placeholder={`- 2023 担任技术部部长\n- 主导 XX 项目`}
          />
        </Field>
        <div>
          <div className="mb-1.5 text-sm font-medium">证明材料</div>
          <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed py-8 text-sm text-muted-foreground hover:bg-muted">
            <Upload className="mr-2 size-4" />
            点击或拖拽上传图片 / PDF
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

      {!dirty && <p className="text-sm text-muted-foreground">修改任意信息后即可提交审核。</p>}
    </div>
  )
}
