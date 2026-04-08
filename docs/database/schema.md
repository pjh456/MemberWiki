# 核心表结构（建议 V1）

以下结构基于 SQLite + ORM（SQLAlchemy/SQLModel）设计，最终以迁移脚本为准。

## users

| 字段名        | 类型     | 约束              | 说明                  |
| ------------- | -------- | ----------------- | --------------------- |
| id            | INTEGER  | PK, AUTOINCREMENT | 用户 ID               |
| email         | TEXT     | UNIQUE, NOT NULL  | 登录邮箱              |
| phone         | TEXT     | UNIQUE, NULL      | 手机号                |
| password_hash | TEXT     | NOT NULL          | 密码哈希              |
| display_name  | TEXT     | NOT NULL          | 展示名                |
| role          | TEXT     | NOT NULL          | `member` / `admin`    |
| status        | TEXT     | NOT NULL          | `active` / `disabled` |
| created_at    | DATETIME | NOT NULL          | 创建时间              |
| updated_at    | DATETIME | NOT NULL          | 更新时间              |

## profiles

| 字段名     | 类型     | 约束                     | 说明                  |
| ---------- | -------- | ------------------------ | --------------------- |
| id         | INTEGER  | PK, AUTOINCREMENT        | 资料 ID               |
| user_id    | INTEGER  | FK -> users.id, NOT NULL | 用户外键              |
| headline   | TEXT     | NULL                     | 一句话简介            |
| bio        | TEXT     | NULL                     | 个人简介              |
| major_tags | TEXT     | NULL                     | 标签（JSON 字符串）   |
| visibility | TEXT     | NOT NULL                 | `public` / `internal` |
| created_at | DATETIME | NOT NULL                 | 创建时间              |
| updated_at | DATETIME | NOT NULL                 | 更新时间              |

## profile_drafts

| 字段名         | 类型     | 约束                        | 说明         |
| -------------- | -------- | --------------------------- | ------------ |
| id             | INTEGER  | PK, AUTOINCREMENT           | 草稿 ID      |
| profile_id     | INTEGER  | FK -> profiles.id, NOT NULL | 关联资料     |
| editor_user_id | INTEGER  | FK -> users.id, NOT NULL    | 编辑者       |
| draft_content  | TEXT     | NOT NULL                    | 草稿内容     |
| version_no     | INTEGER  | NOT NULL                    | 草稿版本     |
| is_latest      | BOOLEAN  | NOT NULL                    | 是否最新草稿 |
| created_at     | DATETIME | NOT NULL                    | 创建时间     |

## review_requests

| 字段名            | 类型     | 约束                        | 说明                                |
| ----------------- | -------- | --------------------------- | ----------------------------------- |
| id                | INTEGER  | PK, AUTOINCREMENT           | 审核请求 ID                         |
| profile_id        | INTEGER  | FK -> profiles.id, NOT NULL | 关联资料                            |
| submitter_user_id | INTEGER  | FK -> users.id, NOT NULL    | 提交者                              |
| reviewer_user_id  | INTEGER  | FK -> users.id, NULL        | 审核者                              |
| status            | TEXT     | NOT NULL                    | `pending` / `approved` / `rejected` |
| change_payload    | TEXT     | NOT NULL                    | 变更内容                            |
| review_comment    | TEXT     | NULL                        | 审核备注                            |
| submitted_at      | DATETIME | NOT NULL                    | 提交时间                            |
| reviewed_at       | DATETIME | NULL                        | 审核时间                            |

## achievements

| 字段名      | 类型     | 约束                        | 说明                   |
| ----------- | -------- | --------------------------- | ---------------------- |
| id          | INTEGER  | PK, AUTOINCREMENT           | 条目 ID                |
| profile_id  | INTEGER  | FK -> profiles.id, NOT NULL | 关联资料               |
| category    | TEXT     | NOT NULL                    | `award` / `experience` |
| title       | TEXT     | NOT NULL                    | 标题                   |
| description | TEXT     | NULL                        | 描述                   |
| happened_at | DATE     | NULL                        | 发生日期               |
| created_at  | DATETIME | NOT NULL                    | 创建时间               |

## media_assets

| 字段名        | 类型     | 约束                     | 说明                 |
| ------------- | -------- | ------------------------ | -------------------- |
| id            | INTEGER  | PK, AUTOINCREMENT        | 文件记录 ID          |
| owner_user_id | INTEGER  | FK -> users.id, NOT NULL | 上传者               |
| ref_type      | TEXT     | NOT NULL                 | `profile` / `review` |
| ref_id        | INTEGER  | NOT NULL                 | 业务对象 ID          |
| file_path     | TEXT     | NOT NULL                 | 存储路径             |
| file_type     | TEXT     | NOT NULL                 | MIME                 |
| file_size     | INTEGER  | NOT NULL                 | 文件大小（字节）     |
| created_at    | DATETIME | NOT NULL                 | 上传时间             |

## 索引建议

- `users(email)` 唯一索引
- `profiles(user_id)` 普通索引
- `review_requests(status, submitted_at)` 组合索引
- `achievements(profile_id, happened_at)` 组合索引
