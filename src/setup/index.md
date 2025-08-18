# 安装与部署

Cherry Studio Enterprise 提供多种灵活的部署方案，满足不同规模企业的需求。本指南将帮助您选择合适的部署方式并完成系统安装。

## 🚀 开始之前

### 系统要求

#### 硬件要求

- **CPU**: 2核心或以上
- **内存**: 4GB RAM（推荐 8GB）
- **存储**: 20GB 可用空间（根据数据量调整）
- **网络**: 稳定的网络连接

#### 软件要求

- **操作系统**: Linux (Ubuntu 20.04+, CentOS 7+)、macOS、Windows
- **容器环境**: Docker 20.10+ （Docker 部署）
- **Kubernetes**: 1.19+ （Helm 部署）
- **数据库**: PostgreSQL 12+

### 准备工作清单

在开始部署前，请确保您已准备好以下内容：

#### 1. 基础环境

- 选择部署方式（Docker / Kubernetes）
- 准备服务器或云主机
- 安装必要的运行环境

#### 2. 数据库配置

- 选择使用 PostgreSQL
- 准备数据库连接信息
- 创建数据库和用户

#### 3. 认证配置（可选）

- 决定是否使用 SSO 单点登录
- 准备 Casdoor 配置信息（如需要）
- 配置企业认证系统对接

#### 4. 网络配置

- 确定服务访问域名
- 配置 SSL 证书（生产环境）
- 开放必要的端口（3670 API, 3680 Admin）

## 📦 部署方案选择

根据您的需求选择合适的部署方案：

### [🐳 Docker 部署](/setup/docker)

**适用场景**：

- 快速体验和测试
- 中小型团队使用
- 单机部署需求

**优势**：

- 部署简单，一键启动
- 环境隔离，易于维护
- 支持 Docker Compose 编排

[查看完整 Docker 部署指南 →](/setup/docker)

### [☸️ Kubernetes Helm 部署](/setup/helm)

**适用场景**：

- 大型企业生产环境
- 需要高可用和自动扩缩容
- 已有 Kubernetes 集群

**优势**：

- 自动化运维管理
- 支持水平扩展
- 完善的健康检查和故障恢复

[查看完整 Helm 部署指南 →](/setup/helm)

## 📋 部署步骤概览

### 第一步：选择部署方案

根据上述指南选择适合您的部署方式。

### 第二步：配置数据库

1. 安装 PostgreSQL
2. 创建数据库和用户
3. 配置连接参数

[查看数据库配置指南 →](/setup/database)

### 第三步：部署应用

根据选择的部署方式执行相应步骤：

- Docker: 使用 docker-compose 启动
- Kubernetes: 使用 Helm 安装

### 第四步：配置认证（可选）

如需企业 SSO 单点登录：

1. 部署 Casdoor 服务
2. 配置应用和组织
3. 集成到 Cherry Studio

[查看 Casdoor 配置指南 →](/setup/casdoor)

### 第五步：验证部署

1. 访问 API 健康检查：`http://your-domain:3670/health`
2. 访问管理后台：`http://your-domain:3680`
3. 使用默认管理员账号登录
4. 完成初始配置

## 下一步

选择您的部署方式，开始安装：

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 2rem;">
  <a href="/setup/docker" style="text-decoration: none;">
    <div style="padding: 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; transition: all 0.3s;">
      <h3>🐳 Docker 部署</h3>
      <p>使用 Docker 快速部署</p>
    </div>
  </a>
  <a href="/setup/helm" style="text-decoration: none;">
    <div style="padding: 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; transition: all 0.3s;">
      <h3>☸️ Helm 部署</h3>
      <p>在 Kubernetes 上部署</p>
    </div>
  </a>
  <a href="/setup/database" style="text-decoration: none;">
    <div style="padding: 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; transition: all 0.3s;">
      <h3>🗄️ 数据库配置</h3>
      <p>配置 PostgreSQL 数据库</p>
    </div>
  </a>
  <a href="/setup/casdoor" style="text-decoration: none;">
    <div style="padding: 1.5rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; transition: all 0.3s;">
      <h3>🔐 SSO 认证</h3>
      <p>配置 Casdoor 单点登录</p>
    </div>
  </a>
</div>
