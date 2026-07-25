import { createContext, useContext, useState, type ReactNode } from "react"
import {
  currentUser,
  reviews as seedReviews,
  drafts as seedDrafts,
  type DraftItem,
  type ReviewItem,
} from "@/data/mock"
import { useSettings } from "@/contexts/SettingsContext"

export interface ProfileSubmit {
  name: string
  title: string
  bio: string
  location?: string
  email?: string
}

interface ReviewsCtx {
  reviews: ReviewItem[]
  drafts: DraftItem[]
  /** 提交个人资料修改：进入审核队列，不即时生效 */
  submitProfileEdit: (input: ProfileSubmit) => void
  /** 管理员通过：若有资料变更则应用到用户资料，并从队列移除 */
  approve: (id: string) => void
  /** 管理员驳回：从队列移除 */
  reject: (id: string) => void
  removeDraft: (id: string) => void
  /** 草稿箱“提交审核”：标记为审核中并进入审核队列 */
  submitDraft: (id: string) => void
  /** 草稿箱“撤回”：回到草稿态 */
  withdrawDraft: (id: string) => void
}

const ReviewsContext = createContext<ReviewsCtx | null>(null)

let seq = 0
const uid = (p: string) => `${p}-${Date.now().toString(36)}-${seq++}`

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const { setProfile } = useSettings()
  const [reviews, setReviews] = useState<ReviewItem[]>(seedReviews)
  const [drafts, setDrafts] = useState<DraftItem[]>(seedDrafts)

  const submitProfileEdit = (input: ProfileSubmit) => {
    const payload = {
      name: input.name,
      title: input.title,
      bio: input.bio,
      location: input.location,
      email: input.email,
    }
    const item: ReviewItem = {
      id: uid("r"),
      name: currentUser.name,
      initials: currentUser.initials,
      color: currentUser.color,
      type: "资料",
      summary: `申请修改个人资料：${input.name}`,
      detail: `昵称「${input.name}」、头衔「${input.title}」、简介与联系方式已更新，等待管理员审核通过后对全员生效。`,
      payload,
    }
    setReviews((rs) => [item, ...rs])
    setDrafts((ds) => [
      { id: uid("d"), title: `个人资料修改（待审核）· ${input.name}`, updatedAt: "刚刚", submitted: true },
      ...ds,
    ])
  }

  const approve = (id: string) => {
    const r = reviews.find((x) => x.id === id)
    if (!r) return
    if (r.payload) {
      setProfile({
        name: r.payload.name ?? "",
        title: r.payload.title ?? "",
        bio: r.payload.bio ?? "",
        location: r.payload.location ?? "",
        email: r.payload.email ?? "",
      })
    }
    setReviews((rs) => rs.filter((x) => x.id !== id))
  }

  const reject = (id: string) => {
    setReviews((rs) => rs.filter((x) => x.id !== id))
  }

  const removeDraft = (id: string) => setDrafts((ds) => ds.filter((x) => x.id !== id))

  const submitDraft = (id: string) => {
    const d = drafts.find((x) => x.id === id)
    if (!d) return
    setDrafts((ds) => ds.map((x) => (x.id === id ? { ...x, submitted: true } : x)))
    setReviews((rs) => [
      {
        id: uid("r"),
        name: currentUser.name,
        initials: currentUser.initials,
        color: currentUser.color,
        type: "资料",
        summary: `提交草稿审核：${d.title}`,
        detail: `草稿「${d.title}」已提交，等待管理员审核。`,
      },
      ...rs,
    ])
  }

  const withdrawDraft = (id: string) =>
    setDrafts((ds) => ds.map((x) => (x.id === id ? { ...x, submitted: false } : x)))

  const value: ReviewsCtx = {
    reviews,
    drafts,
    submitProfileEdit,
    approve,
    reject,
    removeDraft,
    submitDraft,
    withdrawDraft,
  }

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
}

export function useReviews() {
  const ctx = useContext(ReviewsContext)
  if (!ctx) throw new Error("useReviews 必须在 ReviewsProvider 内部使用")
  return ctx
}
