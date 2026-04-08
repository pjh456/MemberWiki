# 核心表结构（建议首版）

以下为基于 SQLite + ORM 的建议首版结构，实际落地以代码迁移文件为准。

## 1. users（用户表）

| 字段名        | 类型     | 约束              | 说明                  |
| ------------- | -------- | ----------------- | --------------------- |
| id            | INTEGER  | PK, AUTOINCREMENT | 用户主键              |
| email         | TEXT     | UNIQUE, NOT NULL  | 登录邮箱              |
| phone         | TEXT     | UNIQUE, NULL      | 手机号                |
| password_hash | TEXT     | NOT NULL          | 密码哈希              |
| display_name  | TEXT     | NOT NULL          | 显示名称              |
| role          | TEXT     | NOT NULL          | `member` / `admin`    |
| status        | TEXT     | NOT NULL          | `active` / `disabled` |
| created_at    | DATETIME | NOT NULL          | 创建时间              |
| updated_at    | DATETIME | NOT NULL          | 更新时间              |

## 2. profiles（个人百科主表）

| 字段名     | 类型     | 约束                     | 说明                  |
| ---------- | -------- | ------------------------ | --------------------- |
| id         | INTEGER  | PK, AUTOINCREMENT        | 主键                  |
| user_id    | INTEGER  | FK -> users.id, NOT NULL | 用户外键              |
| headline   | TEXT     | NULL                     | 标题/一句话简介       |
| bio        | TEXT     | NULL                     | 详细简介              |
| major_tags | TEXT     | NULL                     | 标签（可序列化存储）  |
| visibility | TEXT     | NOT NULL                 | `public` / `internal` |
| created_at | DATETIME | NOT NULL                 | 创建时间              |
| updated_at | DATETIME | NOT NULL                 | 更新时间              |

## 3. profile_drafts（草稿表）

| 字段名         | 类型     | 约束                        | 说明         |
| -------------- | -------- | --------------------------- | ------------ |
| id             | INTEGER  | PK, AUTOINCREMENT           | 主键         |
| profile_id     | INTEGER  | FK -> profiles.id, NOT NULL | 关联百科     |
| editor_user_id | INTEGER  | FK -> users.id, NOT NULL    | 编辑者       |
| draft_content  | TEXT     | NOT NULL                    | 草稿内容     |
| version_no     | INTEGER  | NOT NULL                    | 草稿版本号   |
| is_latest      | BOOLEAN  | NOT NULL                    | 是否当前草稿 |
| created_at     | DATETIME | NOT NULL                    | 创建时间     |

## 4. review_requests（审核请求表）

| 字段名            | 类型     | 约束                        | 说明                                |
| ----------------- | -------- | --------------------------- | ----------------------------------- |
| id                | INTEGER  | PK, AUTOINCREMENT           | 主键                                |
| profile_id        | INTEGER  | FK -> profiles.id, NOT NULL | 关联百科                            |
| submitter_user_id | INTEGER  | FK -> users.id, NOT NULL    | 提交者                              |
| reviewer_user_id  | INTEGER  | FK -> users.id, NULL        | 审核者                              |
| status            | TEXT     | NOT NULL                    | `pending` / `approved` / `rejected` |
| change_payload    | TEXT     | NOT NULL                    | 待审核变更内容                      |
| review_comment    | TEXT     | NULL                        | 审核备注                            |
| submitted_at      | DATETIME | NOT NULL                    | 提交时间                            |
| reviewed_at       | DATETIME | NULL                        | 审核时间                            |

## 5. achievements（奖项与经历）

| 字段名      | 类型     | 约束                        | 说明                   |
| ----------- | -------- | --------------------------- | ---------------------- |
| id          | INTEGER  | PK, AUTOINCREMENT           | 主键                   |
| profile_id  | INTEGER  | FK -> profiles.id, NOT NULL | 关联百科               |
| category    | TEXT     | NOT NULL                    | `award` / `experience` |
| title       | TEXT     | NOT NULL                    | 标题                   |
| description | TEXT     | NULL                        | 描述                   |
| happened_at | DATE     | NULL                        | 发生日期               |
| created_at  | DATETIME | NOT NULL                    | 创建时间               |

## 6. media_assets（材料元数据）

| 字段名        | 类型     | 约束                     | 说明                 |
| ------------- | -------- | ------------------------ | -------------------- |
| id            | INTEGER  | PK, AUTOINCREMENT        | 主键                 |
| owner_user_id | INTEGER  | FK -> users.id, NOT NULL | 上传者               |
| ref_type      | TEXT     | NOT NULL                 | `profile` / `review` |
| ref_id        | INTEGER  | NOT NULL                 | 关联业务对象 ID      |
| file_path     | TEXT     | NOT NULL                 | 文件存储路径         |
| file_type     | TEXT     | NOT NULL                 | MIME 类型            |
| file_size     | INTEGER  | NOT NULL                 | 文件大小（字节）     |
| created_at    | DATETIME | NOT NULL                 | 上传时间             |

## 索引建议

- `users(email)` 唯一索引
- `profiles(user_id)` 普通索引
- `review_requests(status, submitted_at)` 组合索引
- `achievements(profile_id, happened_at)` 组合索引
