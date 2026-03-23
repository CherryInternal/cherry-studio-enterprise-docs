import { defineConfig, defineDocs } from 'fumadocs-mdx/config'

import { i18n } from './app/lib/i18n'

export const docs = defineDocs({
  dir: 'content/docs'
})

export default defineConfig({
  lastModifiedTime: 'git',
  i18n
})
