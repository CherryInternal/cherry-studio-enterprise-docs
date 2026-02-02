import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(_lang?: string): BaseLayoutProps {
  return {
    nav: {
      title: 'Cherry Studio Enterprise',
      transparentMode: 'top'
    },
    githubUrl: 'https://github.com/CherryHQ/cherry-studio',
    i18n: true
  }
}
