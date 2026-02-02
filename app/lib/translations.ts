export const translations = {
  en: {
    meta: {
      title: 'Cherry Studio Enterprise - Enterprise AI Management Platform',
      description: 'AI productivity and management platform built for modern teams and enterprises'
    },
    home: {
      title: 'Cherry Studio Enterprise',
      subtitle: 'Enterprise AI Management Platform',
      description: 'Professional enterprise-grade features to boost team productivity',
      getStarted: 'Get Started',
      deployGuide: 'Deploy Guide'
    },
    features: {
      modelManagement: {
        title: 'Unified Model Management',
        description:
          'Centralized access and management of various cloud LLMs, supporting local private deployment. Employees can use without configuration.'
      },
      knowledgeBase: {
        title: 'Enterprise Knowledge Base',
        description:
          'Build and manage team-shared knowledge bases. AI interactions based on unified knowledge improve response quality.'
      },
      accessControl: {
        title: 'Fine-grained Access Control',
        description: 'Unified admin console, role-based permission assignment, flexible resource access control.'
      },
      privateDeployment: {
        title: 'Fully Private Deployment',
        description:
          'Support enterprise internal server deployment, private cloud environment deployment, 100% data privacy control.'
      },
      backendService: {
        title: 'Reliable Backend Service',
        description:
          'Stable API services, enterprise-grade data backup and recovery mechanisms to ensure business continuity.'
      },
      security: {
        title: 'Security & Compliance',
        description:
          'Meet the strictest data security and compliance requirements, support audit logs, ensure data usage traceability.'
      }
    },
    nav: {
      docs: 'Documentation'
    },
    error: {
      oops: 'Oops!',
      unexpected: 'An unexpected error occurred.',
      notFound: '404',
      notFoundMessage: 'The requested page could not be found.',
      error: 'Error'
    }
  },
  zh: {
    meta: {
      title: 'Cherry Studio 企业版 - 企业级 AI 管理平台',
      description: '专为现代团队和企业打造的 AI 生产力与管理平台'
    },
    home: {
      title: 'Cherry Studio 企业版',
      subtitle: '企业级 AI 管理平台',
      description: '专业的企业级功能,助力团队提升生产力',
      getStarted: '快速开始',
      deployGuide: '部署指南'
    },
    features: {
      modelManagement: {
        title: '统一模型管理',
        description: '集中接入和管理各类云端大模型,支持本地私有化部署,员工无需配置即可使用'
      },
      knowledgeBase: {
        title: '企业级知识库',
        description: '构建和管理团队共享知识库,基于统一知识进行 AI 交互,提升回答质量'
      },
      accessControl: {
        title: '精细化权限控制',
        description: '统一的管理后台,基于角色的权限分配,灵活的资源访问控制'
      },
      privateDeployment: {
        title: '完全私有化部署',
        description: '支持企业内部服务器部署,私有云环境部署,数据 100% 私有可控'
      },
      backendService: {
        title: '可靠的后端服务',
        description: '提供稳定的 API 服务、企业级数据备份与恢复机制,保障业务连续性'
      },
      security: {
        title: '安全合规保障',
        description: '满足最严格的数据安全与合规要求,支持审计日志,确保数据使用可追溯'
      }
    },
    nav: {
      docs: '文档'
    },
    error: {
      oops: '出错了!',
      unexpected: '发生了意外错误。',
      notFound: '404',
      notFoundMessage: '请求的页面不存在。',
      error: '错误'
    }
  },
  ja: {
    meta: {
      title: 'Cherry Studio Enterprise - エンタープライズ AI 管理プラットフォーム',
      description: '現代のチームと企業のために構築された AI 生産性・管理プラットフォーム'
    },
    home: {
      title: 'Cherry Studio Enterprise',
      subtitle: 'エンタープライズ AI 管理プラットフォーム',
      description: 'チームの生産性を向上させるプロフェッショナルなエンタープライズ機能',
      getStarted: 'はじめる',
      deployGuide: 'デプロイガイド'
    },
    features: {
      modelManagement: {
        title: '統合モデル管理',
        description:
          '各種クラウド LLM の一元的なアクセスと管理、ローカルプライベートデプロイメントをサポート。従業員は設定不要で利用可能。'
      },
      knowledgeBase: {
        title: 'エンタープライズナレッジベース',
        description:
          'チーム共有ナレッジベースの構築と管理。統一された知識に基づく AI インタラクションで回答品質を向上。'
      },
      accessControl: {
        title: 'きめ細かなアクセス制御',
        description: '統合管理コンソール、ロールベースの権限割り当て、柔軟なリソースアクセス制御。'
      },
      privateDeployment: {
        title: '完全プライベートデプロイメント',
        description:
          '企業内部サーバーデプロイメント、プライベートクラウド環境デプロイメントをサポート、データ 100% プライベート管理。'
      },
      backendService: {
        title: '信頼性の高いバックエンドサービス',
        description:
          '安定した API サービス、エンタープライズグレードのデータバックアップとリカバリメカニズムでビジネス継続性を確保。'
      },
      security: {
        title: 'セキュリティとコンプライアンス',
        description:
          '最も厳格なデータセキュリティとコンプライアンス要件を満たし、監査ログをサポート、データ使用の追跡可能性を確保。'
      }
    },
    nav: {
      docs: 'ドキュメント'
    },
    error: {
      oops: 'エラー!',
      unexpected: '予期しないエラーが発生しました。',
      notFound: '404',
      notFoundMessage: 'リクエストされたページが見つかりません。',
      error: 'エラー'
    }
  }
} as const

export type Locale = keyof typeof translations
export type TranslationKeys = (typeof translations)['en']

export function getTranslations(locale: string): TranslationKeys {
  return translations[locale as Locale] || translations['en']
}
