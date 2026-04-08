# ER 关系说明（文字版）

## 核心关系

- `users` 1:N `profiles`
- `profiles` 1:N `profile_drafts`
- `profiles` 1:N `review_requests`
- `profiles` 1:N `achievements`
- `users` 1:N `media_assets`

## 审核流关系

1. 用户保存资料草稿，写入 `profile_drafts`。
2. 用户提交审核，生成 `review_requests`（状态 `pending`）。
3. 管理员审核后更新状态为 `approved` 或 `rejected`。
4. 审核通过后由服务层将变更写入 `profiles` 主表。

## 约束建议

- 外键在数据库层与业务层双重校验。
- 用户建议软删除，避免审核链断裂。
- 历史审核记录原则上不物理删除，满足审计追溯。
