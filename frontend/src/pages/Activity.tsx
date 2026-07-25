import { Link } from "react-router-dom"
import { activities } from "@/data/mock"

export default function Activity() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">动态</h1>
      <div className="space-y-3">
        {activities.map((a) => (
          <Link
            key={a.id}
            to={`/activity/${a.id}`}
            className="flex gap-3 rounded-2xl border bg-card p-4 transition-colors hover:border-primary/40"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <a.icon className="size-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{a.user}</span> {a.action}{" "}
                <span className="font-medium text-primary">{a.target}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{a.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
