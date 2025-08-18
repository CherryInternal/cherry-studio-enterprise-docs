import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Cherry Studio Enterprise',
  description: '专为现代团队和企业打造的 AI 生产力与管理平台',
  lang: 'zh-CN',
  themeConfig: {
    // 配置搜索框的占位符
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 页面底部的编辑链接文案
    editLink: {
      pattern: 'https://github.com/CherryHQ/cherry-studio-enterprise-docs/edit/main/src/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 侧边栏文案
    outline: {
      label: '页面导航'
    },

    // 最后更新时间文案
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    // 返回顶部文案
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/docs' },
      { text: '定价', link: '/pricing' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '欢迎使用', link: '/docs' },
          { text: '管理后台', link: '/admin' },
          { text: '客户端', link: '/client' },
          { text: '定价方案', link: '/pricing' }
        ]
      },
      {
        text: '安装与部署',
        collapsed: false,
        items: [
          { text: '部署概览', link: '/setup/' },
          { text: 'Docker 安装', link: '/setup/docker' },
          { text: 'Helm 安装', link: '/setup/helm' },
          { text: '数据库配置', link: '/setup/database' },
          { text: 'Casdoor 认证', link: '/setup/casdoor' }
        ]
      }
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/CherryHQ/cherry-studio'
      }
    ]
  }
})
