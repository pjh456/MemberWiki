# 数据库迁移与回滚规范

## 目标

确保数据结构变更可追溯、可回滚、可重复执行。

## 迁移规则

1. 使用迁移工具管理版本（建议 Alembic）。
2. 每次迁移聚焦一种变更：建表、加列、索引调整等。
3. 命名规范建议：`YYYYMMDDHHMM_<change_summary>`。
4. 涉及删字段、改类型等破坏性变更，必须提供 `downgrade`。

## 本地使用

仓库提交 `backend/alembic.ini.example` 作为共享模板。

首次使用可复制模板：

```powershell
cd backend
Copy-Item alembic.ini.example alembic.ini
.\.venv\Scripts\python.exe -m alembic upgrade head
```

也可以不复制配置，直接指定模板运行：

```powershell
cd backend
.\.venv\Scripts\python.exe -m alembic -c alembic.ini.example upgrade head
```

验证迁移可回滚时，至少执行：

```powershell
cd backend
.\.venv\Scripts\python.exe -m alembic -c alembic.ini.example downgrade base
.\.venv\Scripts\python.exe -m alembic -c alembic.ini.example upgrade head
```

生产、测试环境的真实数据库连接串不得写入 `alembic.ini`；需要通过 `DATABASE_URL` 环境变量覆盖。

## 发布流程

1. 提交迁移脚本与文档更新（`schema.md`）。
2. 在测试环境完成 upgrade + downgrade 验证。
3. 生产发布前执行数据库备份。
4. 发布后执行健康检查和关键路径冒烟。

## 回滚策略

- 小范围异常：执行最近一次 `downgrade`。
- 大范围异常：恢复发布前备份。
- 回滚后冻结后续迁移，先完成问题复盘。

## 备份建议

- 每日全量备份，至少保留 7 天。
- 发布窗口前额外执行一次手动备份。
- 定期演练恢复，验证备份可用性。
