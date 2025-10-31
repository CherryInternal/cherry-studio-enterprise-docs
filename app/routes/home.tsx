import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { Link } from 'react-router'

import { baseOptions } from '@/lib/layout.shared'

export function meta() {
  return [
    { title: 'Cherry Studio 企业版 - 企业级 AI 管理平台' },
    {
      name: 'description',
      content: '专为现代团队和企业打造的 AI 生产力与管理平台'
    }
  ]
}

export default function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="p-8 flex flex-col items-center justify-center text-center flex-1">
        <h1 className="text-4xl font-bold mb-4">Cherry Studio 企业版</h1>
        <h2 className="text-2xl font-semibold mb-3">企业级 AI 管理平台</h2>
        <p className="text-fd-muted-foreground mb-6 text-lg">专业的企业级功能,助力团队提升生产力</p>
        <div className="flex gap-4 mb-8">
          <Link
            className="text-sm bg-fd-primary text-fd-primary-foreground rounded-lg font-medium px-6 py-3"
            to="/docs"
          >
            快速开始
          </Link>
          <Link
            className="text-sm border border-fd-border rounded-lg font-medium px-6 py-3 hover:bg-fd-accent"
            to="/docs/setup"
          >
            部署指南
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mt-8">
          <div className="p-6 border border-fd-border rounded-lg">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-semibold mb-2">统一模型管理</h3>
            <p className="text-sm text-fd-muted-foreground">
              集中接入和管理各类云端大模型,支持本地私有化部署,员工无需配置即可使用
            </p>
          </div>
          <div className="p-6 border border-fd-border rounded-lg">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold mb-2">企业级知识库</h3>
            <p className="text-sm text-fd-muted-foreground">
              构建和管理团队共享知识库,基于统一知识进行 AI 交互,提升回答质量
            </p>
          </div>
          <div className="p-6 border border-fd-border rounded-lg">
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="font-semibold mb-2">精细化权限控制</h3>
            <p className="text-sm text-fd-muted-foreground">统一的管理后台,基于角色的权限分配,灵活的资源访问控制</p>
          </div>
          <div className="p-6 border border-fd-border rounded-lg">
            <div className="text-3xl mb-3">🏢</div>
            <h3 className="font-semibold mb-2">完全私有化部署</h3>
            <p className="text-sm text-fd-muted-foreground">支持企业内部服务器部署,私有云环境部署,数据 100% 私有可控</p>
          </div>
          <div className="p-6 border border-fd-border rounded-lg">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2">可靠的后端服务</h3>
            <p className="text-sm text-fd-muted-foreground">
              提供稳定的 API 服务、企业级数据备份与恢复机制,保障业务连续性
            </p>
          </div>
          <div className="p-6 border border-fd-border rounded-lg">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="font-semibold mb-2">安全合规保障</h3>
            <p className="text-sm text-fd-muted-foreground">
              满足最严格的数据安全与合规要求,支持审计日志,确保数据使用可追溯
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}
