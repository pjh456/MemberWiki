# 文档中心

本目录按“规划 / 团队 / API”进行分层，目标是让项目从需求到开发到联调有单一入口。

## 目录结构

```text
docs/
├── README.md                     # 文档总索引（本文件）
├── planning/
│   └── dev-roadmap.md            # 项目需求与开发路线图
├── team/
│   └── structure.md              # 团队角色与分工说明
├── api/
│   ├── README.md                 # API 开发约定与联调规范
│   ├── openapi.yaml              # OpenAPI 3.0 接口定义（可直接导入 Apifox/Swagger）
│   └── examples.http             # 常用接口调试样例（VS Code REST Client 可用）
├── dev-map.md                    # 兼容旧链接：已迁移提示
└── team-structure.md             # 兼容旧链接：已迁移提示
```

## 快速开始（开发必读）

1. 先读需求与路线图：`planning/dev-roadmap.md`
2. 再看团队职责：`team/structure.md`
3. 最后按 API 文档并行开发：`api/README.md` 与 `api/openapi.yaml`

## API 联调建议流程

1. 后端先以 `api/openapi.yaml` 建立路由与 Pydantic Schema 占位。
2. 前端基于 `api/examples.http` 验证登录、搜索、资料编辑、审核流。
3. 联调期间所有字段变更必须先改 OpenAPI，再改代码。
