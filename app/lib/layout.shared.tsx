import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Cherry Studio Enterprise',
      transparentMode: 'top'
    },
    githubUrl: 'https://github.com/CherryHQ/cherry-studio'
  }
}
