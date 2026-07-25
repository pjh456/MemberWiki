import { Link } from "react-router-dom"
import { Award, Edit3, Mail, MapPin, Plus } from "lucide-react"
import { currentUser } from "@/data/mock"
import { useSettings } from "@/contexts/SettingsContext"
import { Button } from "@/components/ui/button"

export default function Profile() {
  const { profile } = useSettings()
  const u = {
    ...currentUser,
    name: profile.name,
    title: profile.title,
    bio: profile.bio,
    location: profile.location,
    email: profile.email,
  }

  return (
    <div className="space-y-6">
      {/* 头部卡片 */}
      <div className="overflow-hidden rounded-3xl border bg-card">
        <div className="h-28 bg-gradient-to-r from-primary/30 to-primary/5" />
        <div className="px-6 pb-6">
          <div className="-mt-10 flex items-end gap-4">
            <div
              className="flex size-20 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-md"
              style={{ backgroundColor: u.color }}
            >
              {u.initials}
            </div>
            <div className="flex-1 pb-1">
              <h1 className="text-2xl font-bold">{u.name}</h1>
              <p className="text-muted-foreground">{u.title}</p>
            </div>
            <Button asChild>
              <Link to="/profile/edit">
                <Edit3 className="size-4" />
                编辑资料
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{u.bio}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" />
              {u.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="size-4" />
              {u.email}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 履历 */}
        <div className="lg:col-span-2 rounded-2xl border bg-card p-6">
          <h2 className="text-lg font-bold">履历亮点</h2>
          <ul className="mt-4 space-y-3">
            {u.resume.map((r, i) => (
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
            {u.awards.map((a) => (
              <div key={a} className="rounded-xl bg-secondary px-3 py-2 text-sm">
                {a}
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4 w-full" asChild>
            <Link to="/drafts">
              <Plus className="size-4" />
              新建条目
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
