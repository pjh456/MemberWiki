import {
  Award,
  Check,
  FileEdit,
  Sparkles,
  Trophy,
  Users,
  UserPlus,
  type LucideIcon,
} from "lucide-react"
import content from "./content.json"

export interface Member {
  id: string
  name: string
  title: string
  initials: string
  color: string
  tags: string[]
  bio: string
  resume: string[]
  awards: string[]
}

export const members: Member[] = content.members

export const currentUser: Member & {
  location: string
  email: string
  resume: string[]
  awards: string[]
} = content.currentUser

// JSON 无法序列化 lucide 组件，图标仅以字符串名存储，在此集中映射回组件。
const iconMap: Record<string, LucideIcon> = {
  Award,
  Check,
  FileEdit,
  Sparkles,
  Trophy,
  Users,
  UserPlus,
}

export interface ActivityItem {
  id: string
  user: string
  action: string
  target: string
  time: string
  icon: LucideIcon
}

export const activities: ActivityItem[] = content.activities.map((a) => ({
  ...a,
  icon: iconMap[a.iconName],
}))

export interface ReviewItem {
  id: string
  name: string
  initials: string
  color: string
  type: "人物" | "奖项" | "履历" | "资料"
  summary: string
  detail: string
  payload?: { name?: string; title?: string; bio?: string; location?: string; email?: string }
}

export const reviews = content.reviews as ReviewItem[]

export interface DraftItem {
  id: string
  title: string
  updatedAt: string
  submitted: boolean
}

export const drafts: DraftItem[] = content.drafts

export interface StatItem {
  label: string
  value: string
  icon: LucideIcon
}

export const stats: StatItem[] = content.stats.map((s) => ({
  ...s,
  icon: iconMap[s.iconName],
}))

export const searchFilters = content.searchFilters

// 资料编辑初值由当前用户派生，避免与 currentUser 重复写死。
export const defaultProfileEdit = {
  name: currentUser.name,
  title: currentUser.title,
  bio: currentUser.bio,
  resume: currentUser.resume.map((r) => "- " + r).join("\n"),
}
