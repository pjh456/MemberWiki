import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"

export function GlobalSearch() {
  const [q, setQ] = useState("")
  const navigate = useNavigate()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set("q", q.trim())
    navigate(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2">
      <Search className="size-4 shrink-0 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="搜索人物、奖项、履历..."
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </form>
  )
}
