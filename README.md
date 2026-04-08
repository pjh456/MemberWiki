# 🏛️ 名人堂百科

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-Preferred-000000?logo=bun)](https://bun.sh/)
[![Deno](https://img.shields.io/badge/Deno-Optional-000000?logo=deno)](https://deno.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)](https://www.sqlite.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)

> **“以去中心化的更新，构建中心化的记忆。”**
>
> 本项目是一个面向社团与组织的“名人堂”百科系统，旨在为当届与往届成员提供一个展示履历、促进交流、跨届合作的平台。本项目同时作为社团内部全栈开发的 **核心练手项目**。

## ✨ 核心特性

- **👤 自主维护百科**：成员注册后可自由更新个人履历、奖项，支持富文本草稿箱与证明材料（图片/PDF）上传。
- **🛡️ 严格审核流**：引入多层级用户权限，普通成员的履历变更请求需经管理员审核流转后方可生效。
- **🔍 智能多维搜索**：支持根据人名、活跃度、奖项关键字、履历亮点等进行联合检索。
- **🌓 现代化 UI**：全站响应式设计，完美支持日间/夜间模式无缝切换。
- **📦 极简轻量部署**：抛弃沉重的架构，后端采用 FastAPI + SQLite 组合，支持 Docker Compose 一键上线。

## 🛠️ 技术栈

本项目采取前后端分离架构：

### 前端 (Frontend)

- **核心框架**：React + Vite + TypeScript
- **运行时与包管理**：Bun 或 Deno（默认优先 Bun；若项目对子进程权限、沙箱和标准库有明确要求可选 Deno）
- **样式方案**：TailwindCSS / (按需引入的 React UI 组件库)

### 后端 (Backend)

- **核心框架**：Python + FastAPI
- **数据持久化**：SQLite + ORM (如 SQLAlchemy / SQLModel)
- **缓存引擎**：Redis (可选，视并发压力接入)
- **测试框架**：Pytest

### 运维与部署 (DevOps)

- Nginx (反向代理与静态资源分发)
- Docker & Docker Compose

## 📂 项目结构

```text
MemberWiki/
├── frontend/             # 前端 React 项目目录
├── backend/              # 后端 FastAPI 项目目录
├── docs/                 # 项目文档目录
│   ├── README.md         # 文档总索引（统一入口）
│   ├── planning/         # 需求与开发路线
│   ├── team/             # 团队分工与协作规范
│   ├── architecture/     # 系统架构说明
│   ├── database/         # 数据库设计与迁移规范
│   ├── api/              # 可直接开发的 API 文档
│   ├── testing/          # 测试策略与发布检查
│   ├── deploy/           # 部署与运维文档
│   └── contributing.md   # 协作流程与提交规范
├── deploy/               # 部署相关配置 (Nginx配置, Dockerfile等)
├── .gitignore
└── README.md
```

## 🚀 快速开始

### 1. 阅读开发指南 (必读)

在编写任何代码之前，请 **务必** 阅读项目总体开发指南与路线图：
👉 [文档总索引 (docs/README.md)](./docs/README.md)

其中 API 开发请优先阅读：

- [API 开发约定 (docs/api/README.md)](./docs/api/README.md)
- [OpenAPI 规范 (docs/api/openapi.yaml)](./docs/api/openapi.yaml)

后端与协作开发建议同时阅读：

- [数据库文档总览 (docs/database/README.md)](./docs/database/README.md)
- [核心表结构 (docs/database/schema.md)](./docs/database/schema.md)
- [系统架构说明 (docs/architecture/README.md)](./docs/architecture/README.md)
- [测试策略 (docs/testing/README.md)](./docs/testing/README.md)
- [部署与运维 (docs/deploy/README.md)](./docs/deploy/README.md)
- [协作流程 (docs/contributing.md)](./docs/contributing.md)

### 2. 环境准备

- Bun (推荐) 或 Deno（二选一）
- Python (v3.10+)
- Git

### 3. 本地运行

**克隆仓库：**

```bash
git clone https://github.com/pjh456/MemberWiki.git
cd MemberWiki
```

**启动前端：**

```bash
cd frontend
# Bun 方案（默认）
bun install
bun run dev

# Deno 方案（按项目要求启用）
# deno task install
# deno task dev
```

**启动后端：**

```bash
cd backend
# 建议使用虚拟环境，如 venv 或 conda
python -m venv venv
source venv/bin/activate  # Windows 下使用 venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## 🤝 协作与贡献规范

为了保证项目的工程质量，请所有参与开发的社团成员遵守以下规范：

1. **分支管理**：严禁直接推送到 `main` 分支。请基于 `main` 切出新分支（如 `feat/user-login`, `bugfix/search-typo`），开发完成后提交 Pull Request (PR)。
2. **提交规范**：Commit Message 请尽量清晰，标明修改内容（如 `feat: 新增首页搜索框组件`）。
3. **代码规范**：
   - 后端 Python 代码需包含标准化的 Docstring（推荐 Google 风格），变量名遵循 PEP8 规范。
   - 前端仅使用 TypeScript，不提交新的 JavaScript 业务文件；注意组件拆分并合理定义类型。
4. **质量门禁（前端）**：
   - 所有 PR 在合并前必须通过 TypeScript 类型检查。
   - 上线部署前必须先执行构建产物生成（build），并确保构建成功。
   - 推荐命令：`bun run typecheck && bun run build`（或等价 `deno task typecheck && deno task build`）。
5. **版本控制清单**：
   - 🚫 **禁止** 提交 `node_modules/`, `__pycache__/` 等缓存文件。
   - 🚫 **禁止** 提交包含敏感信息的 `.env` 密钥文件，请提交含注释的 `.env.example`。
   - ✅ **务必** 提交前端依赖锁文件（如 `bun.lockb` 或 `deno.lock`）以锁定版本。

## 📄 许可证

[MIT License](./LICENSE)
