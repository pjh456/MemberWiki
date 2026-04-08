# API 开发约定

本目录用于前后端联调的单一入口，所有接口变更以 `openapi.yaml` 为准。

## 文件说明

- `openapi.yaml`：OpenAPI 3.0 接口定义（单一事实源）
- `examples.http`：常见接口调试样例（VS Code REST Client）

## 联调流程

1. 后端先修改 `openapi.yaml` 并完成路由与 Schema 占位。
2. 前端按 `examples.http` 进行联调与页面对接。
3. 字段、状态码、鉴权方式变更，必须先改文档再改代码。

## 命名与约束

- 路由使用小写短横线风格，如 `/api/v1/user-profiles`。
- 请求体与响应体字段使用小写下划线风格。
- 时间字段统一使用 ISO 8601（UTC），示例：`2026-04-08T10:30:00Z`。
- 分页查询统一使用 `page` 和 `page_size`。
- 错误响应统一结构：

```json
{
  "code": "VALIDATION_ERROR",
  "message": "请求参数不合法",
  "request_id": "trace-xxx"
}
```
