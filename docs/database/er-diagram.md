# ER 关系说明（文字版）

## 核心关系

- `users` 1:N `profiles`
- `profiles` 1:N `profile_drafts`
- `profiles` 1:N `review_requests`
- `profiles` 1:N `achievements`
- `users` 1:N `media_assets`

## 审核流关系

1. 用户编辑百科形成草稿（`profile_drafts`）。
2. 提交后生成审核请求（`review_requests`，状态为 `pending`）。
3. 管理员审核通过后写回 `profiles` 主表；驳回则保留草稿并记录备注。

## 约束建议

- 所有外键在业务层和数据库层同时校验。
- 删除用户建议使用软删除（`status = disabled`），避免历史审核链断裂。
- 删除 profile 时保留审核记录或做归档迁移，防止审计信息丢失。
