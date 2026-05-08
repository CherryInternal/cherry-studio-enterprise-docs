import { glob } from 'node:fs/promises'
import type { Config } from '@react-router/dev/config'
import { createGetUrl, getSlugs } from 'fumadocs-core/source'

import { i18n, locales } from './app/lib/i18n'

const getUrl = createGetUrl('/docs', i18n)

export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    const paths = new Set<string>()
    const addPath = (path: string) => {
      paths.add(path)
      // 同时生成带尾部斜线的路径
      if (!path.endsWith('/')) {
        paths.add(`${path}/`)
      }
    }

    for (const path of getStaticPaths()) {
      addPath(path)
    }

    for (const lang of locales) {
      if (lang !== i18n.defaultLanguage) {
        addPath(`/${lang}`)
      }
    }

    for (const lang of locales) {
      for await (const entry of glob('**/*.mdx', { cwd: `content/docs/${lang}` })) {
        const url = getUrl(getSlugs(entry), lang)
        addPath(url)
      }
    }

    return Array.from(paths)
  }
} satisfies Config
