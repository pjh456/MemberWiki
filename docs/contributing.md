# 协作流程与提交规范

## 分支策略

- 禁止直接提交到 `main`。
- 功能分支使用 `feat/*`，缺陷修复使用 `fix/*`。
- 所有变更通过 PR 合并，至少一名成员评审。

## 提交流程

1. 同步最新 `main` 并创建功能分支。
2. 完成功能、自测并更新文档。
3. 提交 PR，说明改动范围、风险点与测试结果。
4. 评审通过后再合并。

## 提交信息规范

推荐使用 Conventional Commits：

- `feat:` 新功能
- `fix:` 缺陷修复
- `docs:` 文档变更
- `refactor:` 重构
- `test:` 测试变更

## 文档联动约定

- 项目文档统一入口为 `docs/README.md`。
- 接口字段变更先改 `docs/api/openapi.yaml`。
- 表结构变更同步更新 `docs/database/schema.md` 与迁移文档。
