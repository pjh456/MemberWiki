# 协作与提交流程

## 分支策略

- 禁止直接提交到 `main`。
- 功能开发使用 `feat/*`，修复使用 `fix/*`。
- 通过 PR 合并，至少一人评审后方可合并。

## 提交流程

1. 同步最新 `main` 并创建分支。
2. 开发完成后自测并更新相关文档。
3. 提交 PR，说明变更范围、风险点、测试结果。
4. 评审通过后合并。

## 提交规范

- 推荐使用 Conventional Commits：
  - `feat:` 新功能
  - `fix:` 缺陷修复
  - `docs:` 文档变更
  - `refactor:` 重构
  - `test:` 测试变更

## 文档约定

- 项目文档统一入口：`docs/README.md`
- API 变更先改 `docs/api/openapi.yaml`
- 数据库变更同步更新 `docs/database/schema.md` 和迁移文档
