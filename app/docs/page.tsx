import type * as PageTree from 'fumadocs-core/page-tree'
import { toClientRenderer } from 'fumadocs-mdx/runtime/vite'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'

import { docs } from '@/.source'
import { Card, Cards } from '@/components/card'
import { ExperienceCard, ExperienceCards } from '@/components/experience-card'
import { sidebarComponents } from '@/components/sidebar-components'
import { i18n, locales } from '@/lib/i18n'
import { baseOptions } from '@/lib/layout.shared'
import { getSource } from '@/lib/source'

import type { Route } from './+types/page'
import {ImageSteps} from "@/components/image-steps";
import {ConditionalBreadcrumb} from "@/components/conditional-breadcrumb";

export async function loader({ params }: Route.LoaderArgs) {
  const source = await getSource()
  const lang = params.lang && locales.includes(params.lang) ? params.lang : i18n.defaultLanguage
  const slugs = params['*'].split('/').filter((v) => v.length > 0)
  const page = source.getPage(slugs, lang)
  if (!page) throw new Response('Not found', { status: 404 })

  return {
    path: page.path,
    tree: source.getPageTree(lang),
    lang
  }
}

const renderer = toClientRenderer(docs.doc, ({ toc, default: Mdx, frontmatter }) => {
  const fullToc = [
    { title: frontmatter.title, url: '#page-title', depth: 2 },
    ...toc.map((item: { title: string; url: string; depth: number }) => ({ ...item, depth: item.depth + 1 }))
  ]
  return (
    <DocsPage toc={fullToc} breadcrumb={{ component: <ConditionalBreadcrumb /> }}>
      <title>{frontmatter.title}</title>
      <meta name="description" content={frontmatter.description} />
      <DocsTitle id="page-title">{frontmatter.title}</DocsTitle>
      <DocsDescription>{frontmatter.description}</DocsDescription>
      <DocsBody>
        <Mdx components={{ ...defaultMdxComponents, Card, Cards, ExperienceCard, ExperienceCards, ImageSteps }} />
      </DocsBody>
    </DocsPage>
  )
})

export default function Page({ loaderData }: Route.ComponentProps) {
  const { tree, path, lang } = loaderData
  const Content = renderer[path]

  return (
    <DocsLayout
      {...baseOptions(lang)}
      tree={tree as PageTree.Root}
      sidebar={{ components: sidebarComponents }}
    >
      <Content />
    </DocsLayout>
  )
}
