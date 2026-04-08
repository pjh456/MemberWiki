# 文档中心

本目录按“规划 / 团队 / 架构 / 数据库 / API / 测试 / 部署”进行分层，目标是让项目从需求到开发到联调再到上线有单一入口。

## 目录结构

```text
docs/
├── README.md                     # 文档总索引（本文件）
├── planning/
│   └── dev-roadmap.md            # 项目需求与开发路线图
├── team/
│   └── structure.md              # 团队角色与分工说明
├── architecture/
│   └── README.md                 # 系统架构说明
├── database/
│   ├── README.md                 # 数据库文档总览
│   ├── schema.md                 # 核心表结构与字段约束
│   ├── er-diagram.md             # 实体关系说明（文字版）
│   └── migration.md              # 迁移与回滚规范
├── api/
│   ├── README.md                 # API 开发约定与联调规范
│   ├── openapi.yaml              # OpenAPI 3.0 接口定义（可直接导入 Apifox/Swagger）
│   └── examples.http             # 常用接口调试样例（VS Code REST Client 可用）
├── testing/
│   └── README.md                 # 测试策略与发布前检查
├── deploy/
│   └── README.md                 # 部署与运维指南
├── contributing.md               # 协作流程与提交规范
├── dev-map.md                    # 兼容旧链接：已迁移提示
└── team-structure.md             # 兼容旧链接：已迁移提示
```

## 快速开始（开发必读）

1. 先读需求与路线图：`planning/dev-roadmap.md`
2. 再看团队职责：`team/structure.md`
3. 然后读架构说明：`architecture/README.md`
4. 后端优先阅读数据库文档：`database/README.md`、`database/schema.md`、`database/migration.md`
5. 前后端联调按 API 文档并行开发：`api/README.md` 与 `api/openapi.yaml`
6. 提交前按测试与协作规范自检：`testing/README.md` 与 `contributing.md`

## API 联调建议流程

1. 后端先以 `api/openapi.yaml` 建立路由与 Pydantic Schema 占位。
2. 前端基于 `api/examples.http` 验证登录、搜索、资料编辑、审核流。
3. 联调期间所有字段变更必须先改 OpenAPI，再改代码。
