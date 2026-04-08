# API 开发文档（可直接开发）

本目录提供可执行的接口规范，后端可按 OpenAPI 快速搭建 FastAPI 路由，前端可按约定直接联调。

## 文档清单

- `openapi.yaml`：权威接口定义（单一事实来源）
- `examples.http`：接口调试脚本（推荐 VS Code REST Client）

## 基础约定

- Base URL：`/api/v1`
- 数据格式：`application/json`（上传接口使用 `multipart/form-data`）
- 鉴权方式：`Authorization: Bearer <JWT>`
- 时间格式：ISO 8601（UTC），例如 `2026-04-08T12:00:00Z`
- 分页参数：`page`（从 1 开始），`page_size`（默认 20，最大 100）
- 排序参数：`sort_by` + `sort_order`（`asc` / `desc`）

## 角色与权限

- `member`：普通成员，可维护自己的草稿、提交审核、查看公开资料
- `admin`：管理员，具备审核、用户管理与全局检索能力

## 核心状态机

### 资料版本状态（`review_status`）

- `draft`：草稿，仅本人可见
- `pending`：已提交审核
- `approved`：审核通过并发布
- `rejected`：审核驳回，需修改后重新提交

状态流转：

1. `draft -> pending`（成员提交审核）
2. `pending -> approved`（管理员通过）
3. `pending -> rejected`（管理员驳回）
4. `rejected -> draft`（成员编辑后保存）

## 错误码约定

统一返回结构：

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "page_size must be <= 100",
    "details": {
      "field": "page_size"
    },
    "request_id": "req_01HXYZ..."
  }
}
```

常用错误码：

- `UNAUTHORIZED`：未登录或 token 无效
- `FORBIDDEN`：权限不足
- `NOT_FOUND`：资源不存在
- `VALIDATION_ERROR`：请求参数校验失败
- `CONFLICT`：状态冲突（如重复提交审核）
- `RATE_LIMITED`：触发频率限制
- `FILE_TOO_LARGE`：上传文件超限
- `UPLOAD_LIMIT_EXCEEDED`：上传次数超限
- `INTERNAL_ERROR`：服务内部异常

## 日志与追踪

- 所有请求应生成 `request_id` 并回传到响应头：`X-Request-ID`
- 安全相关日志（登录、鉴权失败、审核操作）至少记录 `operator_id`、`ip`、`user_agent`
- 敏感信息（手机号、邮箱）需要脱敏记录

## 开发落地建议

1. 后端先实现 `health`、`auth`、`profiles`、`reviews`、`search`、`uploads` 六类路由骨架。
2. 前端优先联调：登录、首页搜索、个人资料编辑、提交审核、管理员审核列表。
3. 每次字段变更先更新 `openapi.yaml`，再更新前后端实现。
4. 使用 `examples.http` 做 smoke test，确保核心流转可跑通。
