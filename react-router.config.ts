import { glob } from 'node:fs/promises'
import type { Config } from '@react-router/dev/config'
import { createGetUrl, getSlugs } from 'fumadocs-core/source'

import { i18n, locales } from './app/lib/i18n'

const getUrl = createGetUrl('/docs', i18n)

export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    const paths: string[] = []

    for (const path of getStaticPaths()) {
      paths.push(path)
    }

    for (const lang of locales) {
      for await (const entry of glob('**/*.mdx', { cwd: `content/docs/${lang}` })) {
        paths.push(getUrl(getSlugs(entry), lang))
      }
    }

    return paths
  }
} satisfies Config
